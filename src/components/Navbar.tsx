import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Home, Code2, Heart, Gamepad2, Image, Phone, FileText, ArrowUpRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Developer", to: "/developer", icon: Code2 },
  { label: "About", to: "/friend", icon: Heart },
  { label: "Gamer", to: "/gamer", icon: Gamepad2 },
  { label: "Gallery", to: "/gallery", icon: Image },
  { label: "Contact", to: "/friend#contact", icon: Phone },
];

const resumeUrl = "https://raw.githubusercontent.com/Sahil-dev7/Sahil-dev7/main/Resume.pdf";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleNavigate = (to: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const [path, hash] = to.split("#");
      navigate(path);
      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);
  };

  const isActive = (to: string) => {
    const path = to.split("#")[0];
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2 sm:py-3 border-b border-border/40 backdrop-blur-xl bg-background/70" : "py-3 sm:py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => handleNavigate("/")}
              className="font-display text-base sm:text-xl font-semibold tracking-tight text-foreground"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-gradient">Sahil</span>
              <span className="text-foreground/50 mx-1">/</span>
              <span className="text-foreground/90">dev</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0.5 rounded-full hairline px-1.5 py-1 bg-background/40 backdrop-blur-md">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3.5 py-1.5 font-body text-[13px] tracking-tight text-foreground/55 hover:text-foreground transition-colors duration-200 rounded-full"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item.to!)}
                    className={`relative px-3.5 py-1.5 font-body text-[13px] tracking-tight rounded-full transition-colors duration-200 ${
                      isActive(item.to!)
                        ? "text-foreground"
                        : "text-foreground/55 hover:text-foreground"
                    }`}
                  >
                    {isActive(item.to!) && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-foreground/[0.08] hairline-strong"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              )}
            </div>

            {/* Resume CTA — same animation as Enter Dev pill */}
            <div className="hidden md:block">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full font-display font-medium text-[11px] uppercase tracking-[0.24em] text-foreground overflow-hidden border border-primary/40"
                style={{ background: "hsl(0 0% 100% / 0.04)", backdropFilter: "blur(14px)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out bg-primary"
                />
                <span className="relative z-10 transition-colors group-hover:text-white">Resume / CV</span>
                <span className="relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary transition-colors group-hover:bg-white/20">
                  <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-foreground z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[75%] max-w-[300px] z-40 md:hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-card via-background to-background border-l border-primary/20" />
              <div className="relative h-full flex flex-col pt-20 pb-8 px-6">
                <div className="mb-8">
                  <span className="font-display text-xl font-bold text-gradient">SAHIL DEV</span>
                  <p className="text-[10px] text-muted-foreground font-body mt-1">Android Developer</p>
                </div>
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, index) =>
                    item.external ? (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all"
                      >
                        <item.icon className="w-4 h-4 text-primary/60" />
                        <span className="font-display text-sm font-semibold">{item.label}</span>
                      </motion.a>
                    ) : (
                      <motion.button
                        key={item.label}
                        onClick={() => handleNavigate(item.to!)}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all ${
                          isActive(item.to!)
                            ? "text-primary bg-primary/10"
                            : "text-foreground/80 hover:text-foreground hover:bg-primary/10"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${isActive(item.to!) ? "text-primary" : "text-primary/60"}`} />
                        <span className="font-display text-sm font-semibold">{item.label}</span>
                      </motion.button>
                    )
                  )}
                </nav>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative w-full inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2.5 rounded-full font-display font-medium text-[11px] uppercase tracking-[0.24em] text-foreground overflow-hidden border border-primary/40"
                    style={{ background: "hsl(0 0% 100% / 0.04)" }}
                  >
                    <span aria-hidden className="absolute inset-0 rounded-full origin-left scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-700 ease-out bg-primary" />
                    <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white group-active:text-white">
                      <FileText className="w-4 h-4" />
                      Resume
                    </span>
                    <span className="relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
