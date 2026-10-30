import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Education", path: "#education" },
  { name: "Skills", path: "#skills" },
  { name: "Certifications", path: "#certifications" },
  { name: "GitHub", path: "#github" },
  { name: "Contact", path: "#contact" },
];

interface AnimatedLetterTextProps {
  text: string;
  shouldReduceMotion: boolean | null;
}

function AnimatedLetterText({ text, shouldReduceMotion }: AnimatedLetterTextProps) {
  if (shouldReduceMotion) {
    return <span>{text}</span>;
  }

  const characters = Array.from(text);

  return (
    <span className="relative inline-flex items-center overflow-hidden leading-tight py-0.5">
      <span className="inline-flex" aria-hidden="true">
        {characters.map((char, index) => (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
          >
            {/* Primary Character: Slides upward on hover */}
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: "0%" },
                hover: { y: "-100%" },
              }}
              transition={{
                duration: 0.32,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.02,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* Secondary Character: Slides in from bottom on hover */}
            <motion.span
              className="absolute inset-0 inline-block"
              variants={{
                initial: { y: "100%" },
                hover: { y: "0%" },
              }}
              transition={{
                duration: 0.32,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.02,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

function LogoIcon() {
  return (
    <img
      src="/navbar-logo.png"
      alt=""
      aria-hidden="true"
      className="w-5 h-5 object-contain shrink-0"
    />
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionIds = ["home", "about", "projects", "experience", "education", "skills", "certifications", "github", "contact"];
      const scrollPos = window.scrollY + 200; // Offset to trigger early

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection((prev) => (prev !== id ? id : prev));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 w-full overflow-hidden">
      <nav
        aria-label="Main Navigation"
        className={cn(
          "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border bg-background/60 backdrop-blur-xl transition-all duration-300 shadow-lg max-w-full",
          scrolled ? "border-border" : "border-transparent bg-transparent shadow-none"
        )}
      >
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          initial="initial"
          whileHover={shouldReduceMotion ? undefined : "hover"}
          whileFocus={shouldReduceMotion ? undefined : "hover"}
          className="font-mono-label text-xs sm:text-sm font-medium mr-2 md:mr-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded shrink-0"
        >
          {/* Mobile branding with original three-block logo */}
          <span className="inline-flex md:hidden items-center gap-2 max-w-[210px] xs:max-w-none overflow-hidden whitespace-nowrap">
            <LogoIcon />
            <AnimatedLetterText text="Nivedan P S | Software Student" shouldReduceMotion={shouldReduceMotion} />
          </span>

          {/* Desktop branding: text only */}
          <span className="hidden md:inline-block">
            <AnimatedLetterText text="Nivedan P S" shouldReduceMotion={shouldReduceMotion} />
          </span>
        </motion.a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6 mr-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.path.substring(1);

            return (
              <motion.a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                initial="initial"
                whileHover={shouldReduceMotion ? undefined : "hover"}
                whileFocus={shouldReduceMotion ? undefined : "hover"}
                className={cn(
                  "text-sm font-display tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-0.5",
                  isActive
                    ? "text-accent-teal font-semibold"
                    : "text-foreground/50 hover:text-foreground font-normal"
                )}
                style={isActive ? { color: "var(--color-accent-teal)" } : undefined}
              >
                <AnimatedLetterText text={item.name} shouldReduceMotion={shouldReduceMotion} />
              </motion.a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-20 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl z-40 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.path.substring(1);

                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={cn(
                      "text-2xl font-display font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary px-2 rounded",
                      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
