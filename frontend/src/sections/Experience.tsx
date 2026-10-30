import { experience, achievements } from "@/lib/data";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Briefcase, Trophy } from "lucide-react";

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

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
              /// 04 — Career Log
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground">
              Achievements & Experience
            </h2>
            <p className="text-base sm:text-lg font-display text-muted-foreground max-w-2xl mt-2">
              Verified record of professional software engineering experience and competitive hackathons.
            </p>
          </div>
        </motion.div>

        {/* Vertically Stacked Content */}
        <div className="space-y-12">
          {/* Section 1: Professional Experience */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 font-mono-label text-xs uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/60">
              <Briefcase size={14} style={{ color: "var(--color-accent-teal)" }} />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-4">
              {experience.map((exp) => (
                <article
                  key={exp.id}
                  className="group relative border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 sm:p-7 hover:border-primary/50 transition-all duration-300 shadow-xs flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                >
                  {/* Left Icon Block */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-muted/50 border border-border/70 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors">
                    <Briefcase size={18} style={{ color: "var(--color-accent-teal)" }} />
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 min-w-0 space-y-3 w-full">
                    {/* Top Metadata Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                      <span
                        className="font-mono-label text-xs font-semibold tracking-wider"
                        style={{ color: "var(--color-accent-amber)" }}
                      >
                        {exp.sysId || "EXP_LOG.01"}
                      </span>

                      <span className="inline-flex items-center gap-1.5 font-mono-label text-[10px] text-emerald-500 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        VERIFIED
                      </span>
                    </div>

                    {/* Main Title & Organization */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {exp.role}
                      </h3>
                      <div
                        className="font-mono-label text-xs font-medium"
                        style={{ color: "var(--color-accent-teal)" }}
                      >
                        {exp.organization}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Section 2: Notable Achievements */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 font-mono-label text-xs uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/60">
              <Trophy size={14} style={{ color: "var(--color-accent-amber)" }} />
              <span>Notable Achievements</span>
            </div>

            <div className="space-y-4">
              {achievements.map((item) => (
                <article
                  key={item.id}
                  className="group relative border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 sm:p-7 hover:border-primary/50 transition-all duration-300 shadow-xs flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                >
                  {/* Left Icon Block */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-muted/50 border border-border/70 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors">
                    <Trophy size={18} style={{ color: "var(--color-accent-amber)" }} />
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 min-w-0 space-y-3 w-full">
                    {/* Top Metadata Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="font-mono-label text-xs font-semibold tracking-wider"
                          style={{ color: "var(--color-accent-amber)" }}
                        >
                          {item.sysId}
                        </span>
                        <span className="font-mono-label text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded border border-border/40 font-medium">
                          {item.category}
                        </span>
                      </div>

                      <span className="font-mono-label text-xs font-semibold text-muted-foreground">
                        {item.year}
                      </span>
                    </div>

                    {/* Main Title & Event */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {item.title}
                      </h3>
                      <div
                        className="font-mono-label text-xs font-medium"
                        style={{ color: "var(--color-accent-teal)" }}
                      >
                        {item.event}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
