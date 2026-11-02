import { useState } from "react";
import { githubStatus as staticGithubStatus } from "@/lib/data";
import { fetchGithubStatus } from "@/lib/github";
import type { GithubStatusResponse } from "@shared/types/github.types";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Github,
  ExternalLink,
  GitBranch,
  Star,
  Users,
  UserCheck,
  Code2,
  AlertCircle,
  RefreshCw,
  FolderGit2,
  Calendar,
  Radio,
  MapPin,
  Building,
} from "lucide-react";

// Language color mapping for authentic GitHub look
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  "C#": "#178600",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "Jupyter Notebook": "#da5b0b",
  Java: "#b07219",
  C: "#555555",
};

export default function GithubStatus() {
  const shouldReduceMotion = useReducedMotion();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live GitHub status query with TanStack Query
  const {
    data: liveData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<GithubStatusResponse>({
    queryKey: ["/api/github/status"],
    queryFn: () => fetchGithubStatus(false),
    staleTime: 10 * 60 * 1000, // 10 minutes cache in client
    retry: 1,
  });

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchGithubStatus(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Format date helper
  const formatDate = (isoString?: string) => {
    if (!isoString) return "Recently";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  // Format time for last updated
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "";
    }
  };

  const hasLiveData = !isLoading && !isError && !!liveData;

  // Active metrics
  const publicRepos = hasLiveData
    ? liveData.metrics.publicRepos
    : 32;
  const totalStars = hasLiveData
    ? liveData.metrics.totalStars
    : 0;
  const followers = hasLiveData
    ? liveData.metrics.followers
    : 8;
  const following = hasLiveData
    ? liveData.metrics.following
    : 12;

  const languages = hasLiveData && liveData.languages.length > 0
    ? liveData.languages
    : [
        { name: "JavaScript", percentage: 40.0, bytes: 334968 },
        { name: "Python", percentage: 27.6, bytes: 230831 },
        { name: "C#", percentage: 10.5, bytes: 88241 },
        { name: "TypeScript", percentage: 7.6, bytes: 63224 },
        { name: "HTML", percentage: 7.2, bytes: 60351 },
        { name: "CSS", percentage: 7.0, bytes: 58954 },
      ];

  const recentRepositories = hasLiveData && liveData.recentRepositories.length > 0
    ? liveData.recentRepositories
    : [
        {
          name: "AI-Elevate-Diagram-Extraction",
          description: "AI-powered diagram extraction and analysis pipeline.",
          language: "Python",
          stars: 0,
          forks: 0,
          url: "https://github.com/nivedanps/AI-Elevate-Diagram-Extraction",
          pushedAt: "2026-10-08T04:37:49Z",
        },
        {
          name: "Dynamic-Watermark-engine",
          description: "Algorithmic dynamic watermarking and document security engine.",
          language: "Python",
          stars: 0,
          forks: 0,
          url: "https://github.com/nivedanps/Dynamic-Watermark-engine",
          pushedAt: "2026-10-02T17:36:06Z",
        },
        {
          name: "Redirectshield",
          description: "URL verification and redirect security guard.",
          language: "C#",
          stars: 0,
          forks: 0,
          url: "https://github.com/nivedanps/Redirectshield",
          pushedAt: "2026-10-01T15:21:16Z",
        },
        {
          name: "zoomanager",
          description: "Interactive animal management and inventory web application.",
          language: "JavaScript",
          stars: 0,
          forks: 0,
          url: "https://github.com/nivedanps/zoomanager",
          pushedAt: "2026-09-23T16:00:51Z",
        },
      ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="font-mono-label text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--color-accent-amber)" }}
            >
              /// 08 — GitHub Status
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                id="github-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground"
              >
                GitHub Status
              </h2>
              <p className="text-base sm:text-lg font-display text-muted-foreground max-w-2xl mt-2">
                Open-source activity, public repositories, and programming-language footprint.
              </p>
            </div>

            {/* Live Telemetry Status Pill & Manual Refresh */}
            <div className="flex flex-wrap items-center gap-2.5">
              {hasLiveData ? (
                <div className="flex items-center gap-2 font-mono-label text-xs text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold tracking-wider">LIVE DATA</span>
                  {liveData.lastUpdated && (
                    <span className="text-muted-foreground/70 hidden sm:inline">
                      • {formatTime(liveData.lastUpdated)}
                    </span>
                  )}
                </div>
              ) : isLoading ? (
                <div className="flex items-center gap-2 font-mono-label text-xs text-muted-foreground bg-muted/40 border border-border/80 px-3 py-1.5 rounded-lg">
                  <Radio size={12} className="animate-pulse text-amber-500" />
                  <span>FETCHING TELEMETRY...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 font-mono-label text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                  <AlertCircle size={12} />
                  <span>OFFLINE CACHE</span>
                </div>
              )}

              {/* Refresh Action Button */}
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing || isLoading}
                aria-label="Refresh GitHub telemetry"
                className="p-2 rounded-lg border border-border/80 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                title="Refresh live GitHub data"
              >
                <RefreshCw
                  size={14}
                  className={isRefreshing || isLoading ? "animate-spin text-primary" : ""}
                />
              </button>

              {/* Handle Link */}
              <a
                href={staticGithubStatus.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono-label text-xs text-muted-foreground hover:text-foreground border border-border/80 bg-card/40 hover:bg-muted/50 px-3.5 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Github size={14} style={{ color: "var(--color-accent-teal)" }} />
                <span>{staticGithubStatus.handle || `@${staticGithubStatus.username}`}</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* API Error Notice (if any) */}
        {isError && (
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-foreground flex items-start gap-3"
          >
            <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">
                Unable to load real-time GitHub telemetry
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {(error as Error)?.message || "GitHub API request failed."}{" "}
                Displaying cached public repository statistics.
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 text-xs font-mono font-medium text-primary hover:underline cursor-pointer"
              >
                Try fetching again →
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Dashboard Layout: Identity (4 cols) & Live Telemetry (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT / PROFILE IDENTITY PANEL (4 cols) */}
          <motion.article
            variants={itemVariants}
            className="lg:col-span-4 border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 sm:p-8 space-y-6 hover:border-primary/50 transition-all duration-300"
          >
            {/* Header: System ID */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span
                className="font-mono-label text-xs font-semibold tracking-wider"
                style={{ color: "var(--color-accent-amber)" }}
              >
                {staticGithubStatus.sysId}
              </span>
              <span className="font-mono-label text-[10px] uppercase text-muted-foreground tracking-widest">
                IDENTITY_NODE
              </span>
            </div>

            {/* Profile Avatar & Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {hasLiveData && liveData.avatarUrl ? (
                    <img
                      src={liveData.avatarUrl}
                      alt="Nivedan P S GitHub Avatar"
                      className="w-14 h-14 rounded-xl border border-border/80 object-cover shadow-xs"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-muted/60 border border-border/80 flex items-center justify-center text-foreground/80">
                      <Github size={28} />
                    </div>
                  )}
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center bg-emerald-500"
                    title="Active developer on GitHub"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {hasLiveData ? liveData.name : "Nivedan P S"}
                  </h3>
                  <div className="font-mono-label text-xs text-muted-foreground">
                    @{staticGithubStatus.username}
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                {hasLiveData && liveData.bio
                  ? liveData.bio
                  : "Final-year CS undergrad & junior software intern building AI-driven pipelines, web apps, and open-source tools."}
              </p>

              {/* Metadata tags */}
              <div className="space-y-2 pt-2 border-t border-border/50 text-xs text-muted-foreground/80 font-mono-label">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-muted-foreground/60 shrink-0" />
                  <span>Mysuru, Karnataka, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building size={13} className="text-muted-foreground/60 shrink-0" />
                  <span>Maharaja Institute of Technology</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-border/60">
              <a
                href={staticGithubStatus.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted/80 hover:border-primary/50 text-foreground text-sm font-mono font-medium transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                aria-label="View Nivedan P S GitHub Profile"
              >
                <span className="flex items-center gap-2">
                  <Github size={14} style={{ color: "var(--color-accent-teal)" }} />
                  View GitHub Profile
                </span>
                <ExternalLink
                  size={14}
                  className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </motion.article>

          {/* RIGHT / LIVE TELEMETRY & ACTIVITY (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Live Statistics Grid (4 Metric Cards) */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-label text-xs uppercase tracking-wider text-muted-foreground">
                  LIVE METRICS & REPOSITORIES
                </span>
                <span className="font-mono-label text-[10px] uppercase text-muted-foreground/70 tracking-widest">
                  TELEMETRY_SOURCE: API.GITHUB.COM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* Repositories */}
                <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-4 sm:p-5 space-y-2 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground">
                      Public Repos
                    </span>
                    <GitBranch size={15} style={{ color: "var(--color-accent-teal)" }} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                    {publicRepos}
                  </div>
                  <div className="font-mono-label text-[10px] text-muted-foreground/70">
                    30 Original • 2 Forks
                  </div>
                </div>

                {/* Stars Received */}
                <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-4 sm:p-5 space-y-2 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground">
                      Stars
                    </span>
                    <Star size={15} style={{ color: "var(--color-accent-amber)" }} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                    {totalStars}
                  </div>
                  <div className="font-mono-label text-[10px] text-muted-foreground/70">
                    Across Public Repos
                  </div>
                </div>

                {/* Followers */}
                <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-4 sm:p-5 space-y-2 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground">
                      Followers
                    </span>
                    <Users size={15} className="text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                    {followers}
                  </div>
                  <div className="font-mono-label text-[10px] text-muted-foreground/70">
                    Community
                  </div>
                </div>

                {/* Following */}
                <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-4 sm:p-5 space-y-2 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground">
                      Following
                    </span>
                    <UserCheck size={15} className="text-muted-foreground" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                    {following}
                  </div>
                  <div className="font-mono-label text-[10px] text-muted-foreground/70">
                    Engineers Followed
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Top Programming Languages Section */}
            <motion.article
              variants={itemVariants}
              className="border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 space-y-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Code2 size={16} style={{ color: "var(--color-accent-amber)" }} />
                  <h4 className="text-base font-display font-bold text-foreground">
                    Top Programming Languages
                  </h4>
                </div>
                <span className="font-mono-label text-[11px] text-muted-foreground/80">
                  Aggregated from inspected public codebases
                </span>
              </div>

              {/* Stacked Proportional Bar */}
              <div
                className="w-full h-3 rounded-full bg-muted/60 overflow-hidden flex"
                role="progressbar"
                aria-label="Language distribution bar"
              >
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor:
                        LANGUAGE_COLORS[lang.name] || "var(--color-accent-teal)",
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                    className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  />
                ))}
              </div>

              {/* Language Chips with Percentages */}
              <ul
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1"
                aria-label="Programming language percentage list"
              >
                {languages.map((lang) => {
                  const dotColor =
                    LANGUAGE_COLORS[lang.name] || "var(--color-accent-teal)";
                  return (
                    <li
                      key={lang.name}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: dotColor }}
                          aria-hidden="true"
                        />
                        <span className="font-mono text-xs font-medium text-foreground truncate">
                          {lang.name}
                        </span>
                      </div>
                      <span className="font-mono-label text-xs font-semibold text-muted-foreground pl-2">
                        {lang.percentage}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.article>

            {/* 3. Contribution Activity Statement (Honest & Transparent) */}
            <motion.article
              variants={itemVariants}
              className="border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-5 sm:p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-muted-foreground/70" />
                  <span className="font-mono-label text-xs uppercase tracking-wider text-muted-foreground">
                    Contribution Activity
                  </span>
                </div>
                <span className="font-mono-label text-[10px] bg-muted/50 text-muted-foreground border border-border/40 px-2 py-0.5 rounded font-medium">
                  REST_API_POLICY
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-mono text-muted-foreground font-medium">
                  Contribution data unavailable
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                  GitHub's public REST API does not expose full annual contribution calendars or private commit graphs without an authenticated GraphQL user token. Complete commit streaks and active contribution graphs can be explored directly on GitHub.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://github.com/${staticGithubStatus.username}?tab=overview`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-label text-xs font-medium text-primary hover:underline focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Explore Contribution Timeline on GitHub</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.article>
          </div>
        </div>

        {/* 4. Recent Public Repositories (Matching Registry Style) */}
        <motion.div variants={itemVariants} className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-border/80">
            <div>
              <div className="flex items-center gap-2">
                <FolderGit2 size={18} style={{ color: "var(--color-accent-teal)" }} />
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
                  Recent Public Repositories
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Active codebases sorted by recent commit telemetry.
              </p>
            </div>

            <span className="font-mono-label text-xs text-muted-foreground">
              Showing 04 of {publicRepos} repositories
            </span>
          </div>

          {/* Repositories Registry List */}
          <div className="border-t border-border/80 divide-y divide-border/80">
            {recentRepositories.map((repo, idx) => {
              const displayIndex = String(idx).padStart(2, "0");
              const dotColor = repo.language
                ? LANGUAGE_COLORS[repo.language] || "var(--color-accent-teal)"
                : "var(--color-accent-teal)";

              return (
                <div
                  key={repo.name}
                  className="py-5 sm:py-6 px-2 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-muted/25 transition-colors rounded-lg"
                >
                  {/* Left: Index & Repo Identity */}
                  <div className="flex items-start gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-sm font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors shrink-0 w-7 sm:w-8 pt-0.5">
                      {displayIndex}
                    </span>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg sm:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight truncate hover:underline"
                        >
                          {repo.name}
                        </a>

                        {repo.language && (
                          <span className="inline-flex items-center gap-1.5 font-mono-label text-[11px] text-muted-foreground/90 bg-muted/50 border border-border/40 px-2.5 py-0.5 rounded">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: dotColor }}
                            />
                            <span>{repo.language}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl line-clamp-2">
                        {repo.description || "Public open-source codebase repository."}
                      </p>
                    </div>
                  </div>

                  {/* Right: Date, Stars & Repo Link Button */}
                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 ml-11 md:ml-0">
                    <div className="flex items-center gap-3 text-xs font-mono-label text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-muted-foreground/60" />
                        <span>{formatDate(repo.pushedAt)}</span>
                      </span>

                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-amber-500" />
                          <span>{repo.stars}</span>
                        </span>
                      )}
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-label text-xs font-medium text-foreground hover:text-primary bg-muted/40 hover:bg-muted/80 border border-border/70 hover:border-primary/40 px-3.5 py-2 rounded-md transition-all focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                      aria-label={`View repository ${repo.name} on GitHub`}
                    >
                      <span>View Repository</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
