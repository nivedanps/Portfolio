
import { HeroScene } from "@/components/3d/HeroScene";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, FileText, Github, Linkedin, Mail, Terminal, MapPin } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";

import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import GithubStatus from "./GithubStatus";
import Contact from "./Contact";

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Github":
      return Github;
    case "Linkedin":
      return Linkedin;
    case "Mail":
      return Mail;
    default:
      return Mail;
  }
};

export default function Home() {
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
    <div className="relative bg-background min-h-screen">
      {/* 3D Interactive Starfield Background */}
      <HeroScene />

      {/* Floating Left Sidebar - Quick Social Links (Desktop) */}
      <aside
        aria-label="Social Profiles"
        className="fixed left-6 bottom-24 hidden xl:flex flex-col items-center gap-5 z-30"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground/60 vertical-text uppercase">
          Connect
        </span>
        <div className="w-[1px] h-8 bg-border" />
        <div className="flex flex-col gap-4">
          {socialLinks.map((social) => {
            const IconComponent = getSocialIcon(social.iconName);
            return (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                aria-label={social.name}
              >
                <IconComponent size={17} />
              </a>
            );
          })}
        </div>
      </aside>

      {/* HERO SECTION */}
      <section
        id="home"
        aria-label="Introduction & Overview"
        className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-24 md:pt-32 pb-12 overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full space-y-8"
          >
            {/* Technical Status Kicker */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 font-mono-label text-xs tracking-wider text-muted-foreground border border-border px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="uppercase text-[11px] font-medium tracking-widest text-foreground/80">
                  {personalInfo.status}
                </span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono-label text-xs text-muted-foreground">
                <MapPin size={13} className="text-muted-foreground/70" />
                {personalInfo.location}
              </span>
            </motion.div>

            {/* Identity & Main Heading */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div
                className="font-mono-label text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2"
                style={{ color: "var(--color-accent-teal)" }}
              >
                <Terminal size={14} />
                <span>{personalInfo.title}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[0.95] text-foreground">
                {personalInfo.name}
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-foreground/90 leading-tight pt-2">
                {personalInfo.tagline}
              </p>
            </motion.div>

            {/* Bio Statement */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Action Buttons & Quick Connect */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-3 text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7 rounded-md shadow-xs group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                View Selected Work
                <ArrowDown size={15} className="group-hover:translate-y-1 transition-transform duration-200" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 text-sm font-medium transition-all bg-muted/40 hover:bg-muted text-foreground border border-border h-12 px-6 rounded-md group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <FileText size={15} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                View Resume
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Technical Ticker / Marquee Band */}
        <div className="marquee-band w-full mt-12 bg-background/50 backdrop-blur-xs border-y border-border">
          <div className="marquee-track font-mono-label text-xs uppercase tracking-widest text-muted-foreground">
            <span>{personalInfo.name} — Software Student — AI & SOFTWARE Enthusiast — MYSURU, INDIA — &nbsp;</span>
            <span>{personalInfo.name} — Software Student — AI & SOFTWARE Enthusiast — MYSURU, INDIA — &nbsp;</span>
            <span>{personalInfo.name} — Software Student — AI & SOFTWARE Enthusiast — MYSURU, INDIA — &nbsp;</span>
            <span>{personalInfo.name} — Software Student — AI & SOFTWARE Enthusiast — MYSURU, INDIA — &nbsp;</span>
          </div>
        </div>
      </section>

      {/* SECTIONS IN LOCKED PORTFOLIO ORDER */}
      <div className="space-y-0 relative z-20 text-foreground">
        {/* 02 — About */}
        <section id="about" className="border-t border-border bg-background">
          <About />
        </section>

        {/* 03 — Things I've Built / Projects */}
        <section id="projects" className="border-t border-border bg-muted/30">
          <Projects />
        </section>

        {/* 04 — Achievements & Experience */}
        <section id="experience" className="border-t border-border bg-background">
          <Experience />
        </section>

        {/* 05 — Education & Courses */}
        <section id="education" className="border-t border-border bg-muted/30">
          <Education />
        </section>

        {/* 06 — Technical Skills */}
        <section id="skills" className="border-t border-border bg-background">
          <Skills />
        </section>

        {/* 07 — Certifications */}
        <section id="certifications" className="border-t border-border bg-muted/30">
          <Certifications />
        </section>

        {/* 08 — GitHub Status */}
        <section id="github" className="border-t border-border bg-background">
          <GithubStatus />
        </section>

        {/* 09 — Contact */}
        <section id="contact" className="border-t border-border bg-muted/30">
          <Contact />
        </section>
      </div>
    </div>
  );
}
