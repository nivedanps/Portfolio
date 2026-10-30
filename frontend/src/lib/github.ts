import type {
  GithubStatusResponse,
  GithubLanguageMetric,
  GithubRecentRepo,
} from "@shared/types/github.types";

const GITHUB_USERNAME = "nivedanps";

/**
 * Fetch GitHub status from our server endpoint, falling back to public GitHub API
 * if running in a standalone client-only environment.
 */
export async function fetchGithubStatus(force = false): Promise<GithubStatusResponse> {
  const url = `/api/github/status${force ? "?force=true" : ""}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json();
      if (data && data.username) {
        return data as GithubStatusResponse;
      }
    }
  } catch {
    // Backend API route not reached, proceed to client fallback
  }

  // Client-side fallback directly to GitHub's public REST API
  return fetchDirectFromGithub();
}

/**
 * Direct client-side fetch from GitHub's public API as a fallback.
 */
async function fetchDirectFromGithub(): Promise<GithubStatusResponse> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      { headers }
    ),
  ]);

  if (!userRes.ok) {
    if (userRes.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Please try again in a few minutes.");
    }
    throw new Error(`Failed to load GitHub profile: ${userRes.statusText}`);
  }

  const userData = await userRes.json();
  const reposData: any[] = reposRes.ok ? await reposRes.json() : [];

  const nonForkRepos = Array.isArray(reposData) ? reposData.filter((r) => !r.fork) : [];
  const totalStars = Array.isArray(reposData)
    ? reposData.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    : 0;
  const totalForks = Array.isArray(reposData)
    ? reposData.reduce((sum, r) => sum + (r.forks_count || 0), 0)
    : 0;

  // Recent 4 non-fork public repositories
  const sortedRecent = [...nonForkRepos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );

  const recentRepositories: GithubRecentRepo[] = sortedRecent.slice(0, 4).map((r) => ({
    name: r.name,
    description: r.description || null,
    language: r.language || null,
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    url: r.html_url,
    pushedAt: r.pushed_at,
  }));

  // Fetch languages for top recent repos
  const langBytesMap: Record<string, number> = {};
  const reposToInspect = sortedRecent.slice(0, 6);

  await Promise.all(
    reposToInspect.map(async (repo) => {
      if (!repo.languages_url) return;
      try {
        const lRes = await fetch(repo.languages_url, { headers });
        if (lRes.ok) {
          const lData: Record<string, number> = await lRes.json();
          for (const [lang, bytes] of Object.entries(lData)) {
            langBytesMap[lang] = (langBytesMap[lang] || 0) + bytes;
          }
        }
      } catch {
        // Continue aggregating available languages
      }
    })
  );

  const totalBytes = Object.values(langBytesMap).reduce((a, b) => a + b, 0);
  let languages: GithubLanguageMetric[] = [];

  if (totalBytes > 0) {
    languages = Object.entries(langBytesMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 7)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
      }));
  } else {
    const langCounts: Record<string, number> = {};
    for (const repo of nonForkRepos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }
    const totalCount = Object.values(langCounts).reduce((a, b) => a + b, 0);
    languages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({
        name,
        bytes: count,
        percentage: totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(1)) : 0,
      }));
  }

  return {
    username: userData.login,
    name: userData.name || "Nivedan P S",
    handle: `@${userData.login}`,
    profileUrl: userData.html_url,
    avatarUrl: userData.avatar_url,
    bio: userData.bio || null,
    location: userData.location || null,
    company: userData.company || null,
    metrics: {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
    },
    languages,
    recentRepositories,
    contributions: {
      available: false,
      message:
        "GitHub's public REST API does not expose full contribution calendars. Complete activity history requires authenticated GraphQL access.",
    },
    cached: false,
    lastUpdated: new Date().toISOString(),
  };
}
