import { useState } from "react";
import { technicalSkills } from "@/lib/data";
import { motion, useReducedMotion, type Variants, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Skills() {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleCategory = (id: string | number) => {
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
              /// 06 — Technical Toolkit
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground"
            >
              Technical Skills
            </h2>
            <p className="text-base sm:text-lg font-display text-muted-foreground max-w-2xl mt-2">
              Technologies and engineering foundations I work with.
            </p>
          </div>
        </motion.div>

        {/* Collapsible Technical Skills Registry */}
        <div className="border-t border-border/80 divide-y divide-border/80">
          <AnimatePresence mode="popLayout">
            {technicalSkills.map((category, index) => {
              const isExpanded = expandedId === category.id;
              const displayIndex = String(index).padStart(2, "0");

              return (
                <motion.div
                  key={category.id}
                  layout={!shouldReduceMotion}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="transition-colors"
                >
                  {/* Row Header / Toggle Button */}
                  <button
                    id={`skill-btn-${category.id}`}
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`skill-panel-${category.id}`}
                    className="w-full text-left py-6 sm:py-7 px-2 sm:px-4 flex items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:bg-muted/25 transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {/* Left: Index Number (00 - 05) */}
                    <span className="font-mono text-sm sm:text-base font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors shrink-0 w-7 sm:w-10 pt-1 sm:pt-0">
                      {displayIndex}
                    </span>

                    {/* Center: Category Title, System ID & Tech Preview */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                          {category.category}
                        </h3>
                        <span
                          className="font-mono-label text-xs font-semibold tracking-wider hidden md:inline"
                          style={{ color: "var(--color-accent-amber)" }}
                        >
                          {category.sysId}
                        </span>
                      </div>

                      {/* Mobile System ID */}
                      <div
                        className="font-mono-label text-xs font-semibold tracking-wider md:hidden"
                        style={{ color: "var(--color-accent-amber)" }}
                      >
                        {category.sysId}
                      </div>

                      {/* Technology Preview Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {category.items.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono-label text-[10px] sm:text-[11px] text-muted-foreground/80 bg-muted/40 border border-border/40 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
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
                        id={`skill-panel-${category.id}`}
                        role="region"
                        aria-labelledby={`skill-btn-${category.id}`}
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
                                {category.sysId}
                              </div>
                              <div
                                className="font-mono-label text-xs font-medium"
                                style={{ color: "var(--color-accent-teal)" }}
                              >
                                {category.category}
                              </div>
                            </div>

                            <span className="font-mono-label text-[11px] bg-muted/60 text-muted-foreground px-2.5 py-0.5 rounded border border-border/40 font-medium">
                              {category.items.length} {category.items.length === 1 ? "Technology" : "Technologies"}
                            </span>
                          </div>

                          {/* Skill Chips / Tags */}
                          <div className="space-y-3 pt-1">
                            <div className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground/70">
                              Technology Stack & Core Concepts
                            </div>
                            <ul
                              className="flex flex-wrap gap-2 pt-1"
                              aria-label={`${category.category} items`}
                            >
                              {category.items.map((skill) => (
                                <li key={skill}>
                                  <span className="font-mono text-xs px-3 py-1.5 rounded-md bg-muted/40 border border-border/60 text-foreground/90 hover:border-primary/40 hover:bg-muted/70 transition-colors inline-block break-words">
                                    {skill}
                                  </span>
                                </li>
                              ))}
                            </ul>
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
