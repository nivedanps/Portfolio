import { education } from "@/lib/data";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GraduationCap, CheckCircle2 } from "lucide-react";

export default function Education() {
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
              /// 05 — Academic Log
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground">
              Education & Courses
            </h2>
            <p className="text-base sm:text-lg font-display text-muted-foreground max-w-2xl mt-2">
              Formal academic qualifications and structured coursework in computing and intelligent systems.
            </p>
          </div>
        </motion.div>

        {/* Formal Education Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-2 font-mono-label text-xs uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/60">
            <GraduationCap size={14} style={{ color: "var(--color-accent-teal)" }} />
            <span>Formal Education</span>
          </div>

          {/* Vertical Academic Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-8 border-l border-border/80">
            {education.map((edu) => (
              <article
                key={edu.id}
                className="group relative border border-border/80 bg-card/60 backdrop-blur-md rounded-xl p-6 sm:p-7 space-y-4 hover:border-primary/50 transition-all duration-300 shadow-xs"
              >
                {/* Timeline Indicator Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 h-3.5 w-3.5 rounded-full border-2 border-background bg-foreground/60 group-hover:bg-primary transition-colors" />

                {/* Header: System ID & Grade Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono-label text-xs font-semibold tracking-wider"
                      style={{ color: "var(--color-accent-amber)" }}
                    >
                      {edu.sysId}
                    </span>
                    <span className="font-mono-label text-[11px] text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono-label text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                    <CheckCircle2 size={12} />
                    {edu.grade}
                  </span>
                </div>

                {/* Degree & School Hierarchy */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <div
                    className="font-mono-label text-xs font-medium"
                    style={{ color: "var(--color-accent-teal)" }}
                  >
                    {edu.school}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
