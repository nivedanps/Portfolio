import { useState, useMemo } from "react";
import { projects } from "@/lib/data";
import { motion, useReducedMotion, type Variants, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, Plus, Minus } from "lucide-react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Extract all unique categories dynamically
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(projects.map((p) => p.category || "General").filter(Boolean))
    );
    return ["All", ...cats];
  }, []);

  // Filter projects according to category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const toggleProject = (id: string | number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const contentVariants: Variants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
        ease: "easeInOut",
      },
    },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

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
              /// 03 — Things I've Built
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground">
                Things I've Built
              </h2>
              <p className="text-base sm:text-lg font-display text-muted-foreground max-w-2xl mt-2">
                A curated registry of software systems, AI pipelines, and full-stack applications.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-2"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    role="tab"
                    aria-selected={isActive}
                    className={`font-mono-label text-xs px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/60"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}

              {/* External Other Work Action */}
              <a
                href="https://github.com/nivedanps"
                target="_blank"
                rel="noopener noreferrer"
                role="tab"
                aria-selected={false}
                className="font-mono-label text-xs px-3.5 py-1.5 rounded-md transition-all cursor-pointer bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/60 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none inline-block"
              >
                Other Work
              </a>
            </div>
          </div>
        </motion.div>

        {/* Collapsible Project Registry */}
        <div className="border-t border-border/80 divide-y divide-border/80">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedId === project.id;
              const projectUrl = project.github || project.link || "#";
              const techList = project.technologies || project.tags || [];
              const displayIndex = String(index).padStart(2, "0");

              return (
                <motion.div
                  key={project.id}
                  layout={!shouldReduceMotion}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="transition-colors"
                >
                  {/* Row Header / Toggle Button */}
                  <button
                    id={`project-btn-${project.id}`}
                    onClick={() => toggleProject(project.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`project-panel-${project.id}`}
                    className="w-full text-left py-6 sm:py-7 px-2 sm:px-4 flex items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:bg-muted/25 transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {/* Left: Index Number */}
                    <span className="font-mono text-sm sm:text-base font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors shrink-0 w-7 sm:w-10 pt-1 sm:pt-0">
                      {displayIndex}
                    </span>

                    {/* Center: Title, Subtitle, Status & Tech */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                          {project.title}
                        </h3>
                        <span className="text-muted-foreground font-normal text-sm sm:text-base hidden md:inline">
                          — {project.subtitle}
                        </span>
                      </div>

                      {/* Mobile Subtitle */}
                      <p className="text-xs sm:text-sm text-muted-foreground md:hidden">
                        {project.subtitle}
                      </p>

                      {/* Metadata Row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-0.5">
                        {project.status && (
                          <span className="inline-flex items-center gap-1 font-mono-label text-[11px] text-emerald-500 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            {project.status}
                          </span>
                        )}

                        <span className="font-mono-label text-[11px] text-muted-foreground/70">
                          {project.category}
                        </span>

                        {/* Technology Preview Tags (Desktop) */}
                        <div className="hidden sm:flex flex-wrap items-center gap-1.5 ml-1">
                          {techList.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono-label text-[10px] text-muted-foreground/80 bg-muted/40 border border-border/40 px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Expand / Collapse Indicator Button */}
                    <div
                      aria-hidden="true"
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-border/80 flex items-center justify-center font-mono transition-all duration-200 ${
                        isExpanded
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-muted/30 text-muted-foreground group-hover:border-primary/60 group-hover:text-foreground"
                      }`}
                    >
                      {isExpanded ? (
                        <Minus size={15} strokeWidth={2.5} />
                      ) : (
                        <Plus size={15} strokeWidth={2.5} />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`project-panel-${project.id}`}
                        role="region"
                        aria-labelledby={`project-btn-${project.id}`}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={contentVariants}
                        className="overflow-hidden"
                      >
                        <div className="py-6 px-4 sm:px-6 sm:ml-12 sm:mr-4 mb-6 space-y-6 border border-border/60 bg-card/60 backdrop-blur-md rounded-xl shadow-xs">
                          {/* Header Metadata */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/50">
                            <div className="space-y-0.5">
                              <div
                                className="font-mono-label text-xs font-semibold tracking-wider"
                                style={{ color: "var(--color-accent-amber)" }}
                              >
                                {project.sysId || `SYS_BUILD.${String(index + 1).padStart(2, "0")}`}
                              </div>
                              <div
                                className="font-mono-label text-xs font-medium"
                                style={{ color: "var(--color-accent-teal)" }}
                              >
                                {project.subtitle}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-mono-label text-[11px] bg-muted/60 text-muted-foreground px-2.5 py-0.5 rounded border border-border/40 font-medium">
                                {project.category || "System"}
                              </span>
                              {project.status && (
                                <span className="inline-flex items-center gap-1 font-mono-label text-[11px] text-emerald-500 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                  {project.status}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
                            {project.description}
                          </p>

                          {/* Key Highlights */}
                          {project.highlights && project.highlights.length > 0 && (
                            <div className="space-y-3 pt-1">
                              <div className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground/70">
                                Key Engineering Highlights
                              </div>
                              <ul className="space-y-2">
                                {project.highlights.map((highlight, hIdx) => (
                                  <li
                                    key={hIdx}
                                    className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2.5 bg-muted/20 border border-border/40 rounded-md p-3 leading-relaxed"
                                  >
                                    <span
                                      className="font-mono text-xs shrink-0 mt-0.5"
                                      style={{ color: "var(--color-accent-teal)" }}
                                    >
                                      ▸
                                    </span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tech Stack Chips & Action Link */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-border/50">
                            {/* Technologies */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              {techList.map((tech) => (
                                <span
                                  key={tech}
                                  className="font-mono-label text-[11px] text-muted-foreground bg-muted/40 border border-border/50 px-2.5 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* View Source ↗ Button */}
                            {projectUrl !== "#" && (
                              <div className="shrink-0">
                                <a
                                  href={projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 font-mono-label text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/15 border border-primary/20 px-4 py-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                  aria-label={`View source code for ${project.title} on GitHub`}
                                >
                                  <Github size={14} />
                                  <span>View Source</span>
                                  <ArrowUpRight size={13} />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
