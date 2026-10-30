import { useState } from "react";
import { certifications } from "@/lib/data";
import { motion, useReducedMotion, type Variants, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, CheckCircle2, Award, FileCheck } from "lucide-react";

export default function Certifications() {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleCert = (id: string | number) => {
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
              /// 07 — Certifications
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>

          <div>
            <h2
              id="certifications-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground"
            >
              Certifications
            </h2>
            <p className="text-base sm:text-lg font-display text-muted-foreground max-w-2xl mt-2">
              Technical Credential Registry — Verified technical qualifications, industry foundations, and computational certifications.
            </p>
          </div>
        </motion.div>

        {/* Collapsible Certifications Registry */}
        <div className="border-t border-border/80 divide-y divide-border/80">
          <AnimatePresence mode="popLayout">
            {certifications.map((cert, index) => {
              const isExpanded = expandedId === cert.id;
              const displayIndex = String(index).padStart(2, "0");
              const certUrl = cert.certificateUrl || cert.verifyUrl || cert.verificationUrl || null;

              return (
                <motion.div
                  key={cert.id}
                  layout={!shouldReduceMotion}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="transition-colors"
                >
                  {/* Row Header / Toggle Button */}
                  <button
                    id={`cert-btn-${cert.id}`}
                    onClick={() => toggleCert(cert.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`cert-panel-${cert.id}`}
                    className="w-full text-left py-6 sm:py-7 px-2 sm:px-4 flex items-start sm:items-center justify-between gap-4 sm:gap-6 group hover:bg-muted/25 transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {/* Left: Index Number (00 - 04) */}
                    <span className="font-mono text-sm sm:text-base font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors shrink-0 w-7 sm:w-10 pt-1 sm:pt-0">
                      {displayIndex}
                    </span>

                    {/* Center: Title, System ID, Issuer & Verification Badge */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors tracking-tight inline-flex items-center gap-1.5">
                          <span>{cert.name}</span>
                          {certUrl && (
                            <ArrowUpRight
                              size={16}
                              className="text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </h3>
                        <span
                          className="font-mono-label text-xs font-semibold tracking-wider hidden md:inline"
                          style={{ color: "var(--color-accent-amber)" }}
                        >
                          {cert.sysId}
                        </span>
                      </div>

                      {/* Mobile System ID */}
                      <div
                        className="font-mono-label text-xs font-semibold tracking-wider md:hidden"
                        style={{ color: "var(--color-accent-amber)" }}
                      >
                        {cert.sysId}
                      </div>

                      {/* Issuer & Optional Verification Indicator */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-0.5">
                        <span className="font-mono-label text-[11px] text-muted-foreground/80 flex items-center gap-1.5">
                          <FileCheck size={12} className="text-muted-foreground/60" />
                          <span>{cert.issuer}</span>
                        </span>

                        {certUrl && (
                          <span className="inline-flex items-center gap-1 font-mono-label text-[10px] text-emerald-500 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                            <CheckCircle2 size={10} />
                            <span>VERIFIED</span>
                          </span>
                        )}
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
                        id={`cert-panel-${cert.id}`}
                        role="region"
                        aria-labelledby={`cert-btn-${cert.id}`}
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
                                {cert.sysId}
                              </div>
                              <div
                                className="font-mono-label text-xs font-medium"
                                style={{ color: "var(--color-accent-teal)" }}
                              >
                                Issued by {cert.issuer}
                              </div>
                            </div>

                            {certUrl ? (
                              <span className="inline-flex items-center gap-1 font-mono-label text-[11px] text-emerald-500 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                                <CheckCircle2 size={11} />
                                <span>VERIFIED CREDENTIAL</span>
                              </span>
                            ) : (
                              <span className="font-mono-label text-[11px] text-muted-foreground/60 bg-muted/40 border border-border/40 px-2.5 py-0.5 rounded font-medium">
                                RECORD LOGGED
                              </span>
                            )}
                          </div>

                          {/* Certification Information */}
                          <div className="space-y-2">
                            <h4 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
                              {cert.name}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                              {cert.description || `Official technical credential certified by ${cert.issuer}.`}
                            </p>
                          </div>

                          {/* Action Footer: View Certificate or Missing State */}
                          <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {certUrl ? (
                              <>
                                <div className="flex items-center gap-2 font-mono-label text-xs text-muted-foreground">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  <span>Online Credential Verification Available</span>
                                </div>

                                <div className="shrink-0">
                                  <a
                                    href={certUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono-label text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/15 border border-primary/20 px-4 py-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                                    aria-label={`View certificate for ${cert.name}`}
                                  >
                                    <Award size={14} />
                                    <span>View Certificate</span>
                                    <ArrowUpRight size={13} />
                                  </a>
                                </div>
                              </>
                            ) : (
                              <div className="font-mono-label text-xs text-muted-foreground/60 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                                <span>Certificate link not provided</span>
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
