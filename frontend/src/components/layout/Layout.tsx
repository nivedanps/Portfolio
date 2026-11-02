
import { Navigation } from "./Navigation";
import { personalInfo, socialLinks } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Github":
      return <Github size={16} />;
    case "Linkedin":
      return <Linkedin size={16} />;
    case "Mail":
      return <Mail size={16} />;
    default:
      return null;
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-background text-foreground">
      <Navigation />

      <main className="flex-grow pt-16 relative z-10">
        <div className="min-h-[calc(100vh-64px)]">
          {children}
        </div>
      </main>

      <footer className="py-16 relative z-10 border-t border-border">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 font-mono-label text-sm text-muted-foreground">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-foreground transition-colors flex items-center gap-2"
              >
                {getSocialIcon(social.iconName)} {social.name}
              </a>
            ))}
          </div>
          <div className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
