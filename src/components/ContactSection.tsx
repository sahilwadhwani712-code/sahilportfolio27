import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Youtube, Twitter, ArrowRight, Sparkles, Send, Instagram, Globe, FileText } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Sahil-dev7" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-w712" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/__sahil_.27" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/Sahil_701" },
  { icon: Instagram, label: "Vines", href: "https://www.instagram.com/sahil_x_rajat_vines" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@SahilDev" },
];

const ContactSection = () => {
  const resumeUrl = "https://raw.githubusercontent.com/Sahil-dev7/Sahil-dev7/main/Resume.pdf";
  const mocktaleUrl = "https://www.moctale.in/u/MenOfCulture_2";

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong border border-primary/30 mb-4 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm text-foreground font-body font-medium">Let's Connect</span>
          </motion.div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Got an Idea? </span>
            <span className="text-gradient">Let's Talk!</span>
          </h2>
          <p className="text-muted-foreground font-body text-xs sm:text-sm md:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
            Whether it's about a project, collaboration, or just want to say hi — my inbox is always open.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8"
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground font-display font-semibold px-6 sm:px-8 text-sm sm:text-base shadow-glow hover:scale-105 transition-transform group h-10 sm:h-12"
              asChild
            >
              <a href="mailto:sahilwadhwani712@gmail.com">
                <Send className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Say Hello
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="font-display font-semibold px-6 sm:px-8 text-sm sm:text-base glass-strong border-primary/50 hover:bg-primary/20 text-foreground h-10 sm:h-12"
              asChild
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Resume/CV
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.08 }}
                whileHover={{ scale: 1.15, y: -5 }}
                className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-strong text-foreground hover:text-primary hover:border-primary/30 transition-all border border-border/50"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Mocktale link */}
          <motion.a
            href={mocktaleUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors font-body"
          >
            Also on <span className="font-semibold text-foreground">Mocktale</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 sm:mt-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong border border-border/50 text-[10px] sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-body text-foreground">
                Open to <span className="text-primary font-semibold">freelance</span> & <span className="text-primary font-semibold">full-time</span>
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
