import { motion } from "framer-motion";
import Magnetic from "@/components/fx/Magnetic";
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Sahil-dev7", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sahil-w712", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/__sahil_.27", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/Sahil_701", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@SahilDev", label: "YouTube" },
  ];

  const resumeUrl = "https://raw.githubusercontent.com/Sahil-dev7/Sahil-dev7/main/Resume.pdf";

  return (
    <footer className="relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-6">
        {/* Single compact row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand + signature */}
          <div className="flex items-center gap-3">
            <span
              className="font-bold italic text-xl sm:text-2xl text-gradient leading-none"
              style={{ fontFamily: "'Italianno', cursive", fontStyle: "italic" }}
            >
              Sahil Wadhwani
            </span>
            <span className="text-muted-foreground/30 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/40">
              Android · Stories · Pixels
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-1.5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.08 }}
                aria-label={social.label}
                title={social.label}
                className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-full text-[10px] font-body text-foreground/60 hover:text-primary hover:bg-primary/10 border border-border/40 transition-all"
              >
                <social.icon className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{social.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Contact + resume */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-body">
            <a
              href="mailto:sahilwadhwani712@gmail.com"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>sahilwadhwani712@gmail.com</span>
            </a>
            <Magnetic>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground transition-all text-[11px] font-display font-semibold tracking-widest uppercase"
            >
              Resume
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            </Magnetic>
          </div>
        </div>

        {/* Tiny baseline */}
        <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/35">
          <span>© {new Date().getFullYear()} Sahil Wadhwani</span>
          <span className="hidden sm:inline">Crafted with care · IST</span>
          <span className="sm:hidden">IST</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
