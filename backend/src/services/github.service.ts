import type {
  GithubStatusResponse,
  GithubLanguageMetric,
  GithubRecentRepo,
} from "@shared/types/github.types";
import { config } from "../config";

interface CacheEntry {
  data: GithubStatusResponse;
  timestamp: number;
}

let githubCache: CacheEntry | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

export async function getGithubStatus(force = false): Promise<GithubStatusResponse> {
  const now = Date.now();

  // Return fresh cached data if valid and not forcing a refresh
  if (!force && githubCache && now - githubCache.timestamp < CACHE_TTL_MS) {
    return {
      ...githubCache.data,
      cached: true,
    };
  }

  const username = config.githubUsername;
  const headers: Record<string, string> = {
    "User-Agent": "Antigravity-Portfolio",
    Accept: "application/vnd.github.v3+json",
  };

  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      signal: controller.signal,
    });

    const remainingHeader = userRes.headers.get("x-ratelimit-remaining");
    const limitHeader = userRes.headers.get("x-ratelimit-limit");
    const resetHeader = userRes.headers.get("x-ratelimit-reset");

    const rateLimitInfo = {
      remaining: remainingHeader ? parseInt(remainingHeader, 10) : 60,
      limit: limitHeader ? parseInt(limitHeader, 10) : 60,
      reset: resetHeader ? parseInt(resetHeader, 10) : 0,
    };

    if (!userRes.ok) {
      if (githubCache) {
        clearTimeout(timeoutId);
        return {
          ...githubCache.data,
          cached: true,
          isStale: true,
          rateLimit: rateLimitInfo,
        };
      }

      clearTimeout(timeoutId);
      const error: any = new Error(`GitHub API error: ${userRes.statusText}`);
      error.status = userRes.status;
      error.rateLimit = rateLimitInfo;
      throw error;
    }

    const userData: any = await userRes.json();

    // 2. Fetch repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      {
        headers,
        signal: controller.signal,
      }
    );

    if (!reposRes.ok) {
      if (githubCache) {
        clearTimeout(timeoutId);
        return {
          ...githubCache.data,
          cached: true,
          isStale: true,
          rateLimit: rateLimitInfo,
        };
      }

      clearTimeout(timeoutId);
      const error: any = new Error(
        `GitHub API error fetching repositories: ${reposRes.statusText}`
      );
      error.status = reposRes.status;
      error.rateLimit = rateLimitInfo;
      throw error;
    }

    const reposData: any[] = await reposRes.json();
    clearTimeout(timeoutId);

    // Metrics calculation
    const nonForkRepos = reposData.filter((r) => !r.fork);
    const totalStars = reposData.reduce(
      (sum, r) => sum + (r.stargazers_count || 0),
      0
    );
    const totalForks = reposData.reduce(
      (sum, r) => sum + (r.forks_count || 0),
      0
    );

    // Recent 4 non-fork public repositories (sorted by pushed_at descending)
    const sortedRecent = [...nonForkRepos].sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

    const recentRepositories: GithubRecentRepo[] = sortedRecent
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description || null,
        language: r.language || null,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        url: r.html_url,
        pushedAt: r.pushed_at,
      }));

    // Language byte counts aggregation across top recent repositories
    const langBytesMap: Record<string, number> = {};
    const reposToInspect = sortedRecent.slice(
      0,
      rateLimitInfo.remaining > 20 ? 10 : 4
    );

    await Promise.all(
      reposToInspect.map(async (repo) => {
        if (!repo.languages_url) return;
        try {
          const langRes = await fetch(repo.languages_url, {
            headers,
            signal: AbortSignal.timeout(4000),
          });
          if (langRes.ok) {
            const langData: Record<string, number> = await langRes.json();
            for (const [lang, bytes] of Object.entries(langData)) {
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

    const responseData: GithubStatusResponse = {
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
          "GitHub's public REST API does not expose full contribution calendars. Complete historical activity graphs require authenticated GraphQL access.",
      },
      cached: false,
      lastUpdated: new Date().toISOString(),
      rateLimit: rateLimitInfo,
    };

    githubCache = {
      data: responseData,
      timestamp: Date.now(),
    };

    return responseData;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (githubCache) {
      return {
        ...githubCache.data,
        cached: true,
        isStale: true,
      };
    }
    throw err;
  }
}

