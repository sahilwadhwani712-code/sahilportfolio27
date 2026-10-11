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
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div>
            <a href="mailto:sahilwadhwani712@gmail.com" className="inline-flex items-center gap-3 font-display text-xl sm:text-2xl font-medium text-foreground hover:text-primary transition-colors">Let's talk <ArrowUpRight className="w-5 h-5" /></a>
            <p className="mt-2 text-sm text-muted-foreground break-all">sahilwadhwani712@gmail.com</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 lg:max-w-md lg:justify-end">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"><social.icon className="w-3.5 h-3.5" /><span>{social.label}</span></a>)}
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sahil Wadhwani</span>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-btn-slide inline-flex items-center gap-2 px-4 py-2 rounded-full text-foreground"><span className="relative">Resume / CV</span><ArrowUpRight className="relative w-3.5 h-3.5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
