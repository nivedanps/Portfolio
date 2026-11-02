export interface GithubLanguageMetric {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GithubRecentRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  pushedAt: string;
}

export interface GithubProfileMetrics {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
}

export interface GithubStatusResponse {
  username: string;
  name: string;
  handle: string;
  profileUrl: string;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  metrics: GithubProfileMetrics;
  languages: GithubLanguageMetric[];
  recentRepositories: GithubRecentRepo[];
  contributions: {
    available: boolean;
    message: string;
  };
  cached: boolean;
  isStale?: boolean;
  lastUpdated: string;
  rateLimit?: {
    remaining: number;
    limit: number;
    reset: number;
  };
}

