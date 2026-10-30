
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Cpu, Activity } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function About() {
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

  const profileSpecs = [
    {
      icon: Briefcase,
      label: "Current Role",
      value: personalInfo.role,
      detail: "Excelsoft Technologies Limited, Mysuru",
    },
    {
      icon: GraduationCap,
      label: "Academic Status",
      value: personalInfo.educationStatus,
      detail: "Maharaja Institute of Technology, Mysuru",
    },
    {
      icon: MapPin,
      label: "Location Base",
      value: personalInfo.location,
      detail: "Karnataka, India",
    },
    {
      icon: Cpu,
      label: "Engineering Focus",
      value: "AI Agents • Applied ML • Web Systems",
      detail: "Data-driven architecture & full-stack development",
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
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="font-mono-label text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--color-accent-amber)" }}
            >
              /// 02 — About
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground">
            Engineering Profile
          </h2>

          <p className="text-lg sm:text-xl font-display font-medium text-muted-foreground max-w-3xl">
            Grounded in computer science fundamentals, curious about intelligent systems.
          </p>
        </motion.div>

        {/* Main Content Grid: Narrative & Metadata Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Narrative Column */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <div className="space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {personalInfo.aboutParagraphs.map((paragraph, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border/80 hover:border-primary/50 transition-colors py-1">
                  <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-border" />
                  <p className="text-foreground/90">{paragraph}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile Specs Column */}
          <motion.div variants={itemVariants} className="lg:col-span-5 w-full">
            <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-lg p-6 sm:p-7 space-y-6 shadow-xs w-full">
              <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                <span className="font-mono-label text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  Profile Specifications
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono-label text-[10px] text-emerald-500 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  ACTIVE
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {profileSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:bg-muted border border-border/40 rounded-md transition-colors shrink-0 flex items-center justify-center">
                      <spec.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5 text-left">
                      <div className="font-mono-label text-[10px] uppercase tracking-wider text-muted-foreground/70 truncate">
                        {spec.label}
                      </div>
                      <div className="text-sm font-semibold text-foreground leading-snug">
                        {spec.value}
                      </div>
                      <div className="text-xs text-muted-foreground leading-normal">
                        {spec.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
