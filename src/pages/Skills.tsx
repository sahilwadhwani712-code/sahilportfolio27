import { motion, useInView } from "framer-motion";
import { Code2, Smartphone, Layers, Flame, GitBranch, Server, Binary, Braces, Keyboard, ArrowLeft, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heroImage = "https://i.postimg.cc/wvpwk7bg/Picsart-26-03-18-10-12-43-169.png";
const heroBg = "https://i.postimg.cc/LsfyfzDv/martial-artist-sunset-conjures-ethereal-dragon-shadow-dramatic-night-sky-silhouetted-martial-artist.webp";

const skills = [
  { name: "Kotlin", level: 95, icon: Code2, color: "from-violet-500 to-purple-600" },
  { name: "Android SDK", level: 90, icon: Smartphone, color: "from-green-500 to-emerald-600" },
  { name: "Jetpack Compose", level: 85, icon: Layers, color: "from-blue-500 to-cyan-600" },
  { name: "Firebase", level: 80, icon: Flame, color: "from-orange-500 to-amber-600" },
  { name: "Dart", level: 70, icon: Braces, color: "from-teal-500 to-cyan-600" },
  { name: "Python", level: 65, icon: Binary, color: "from-yellow-500 to-green-600" },
  { name: "REST APIs", level: 85, icon: Server, color: "from-pink-500 to-rose-600" },
  { name: "Git & GitHub", level: 90, icon: GitBranch, color: "from-gray-500 to-slate-600" },
  { name: "Typing Speed", level: 80, icon: Keyboard, suffix: "80 WPM", color: "from-primary to-red-600" },
];

const tools = [
  { name: "Android Studio", icon: "androidstudio" },
  { name: "VS Code", icon: "vscode" },
  { name: "Figma", icon: "figma" },
  { name: "Postman", icon: "postman" },
  { name: "Firebase", icon: "firebase" },
  { name: "Google Play", icon: "gcp" },
  { name: "Git", icon: "git" },
  { name: "Gradle", icon: "gradle" },
];

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else { setCount(Math.floor(start)); }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <Navbar />

      {/* ── Cinematic Hero ── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        {/* BG image — cropped from bottom via object-position */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover object-bottom"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Accent glow */}
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[100px]"
          style={{ background: "hsl(30 80% 40%)" }}
        />

        <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 py-24 sm:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
            {/* Left — Text */}
            <div className="order-2 md:order-1 pb-12 sm:pb-0">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                </span>
                <span className="text-xs font-body text-foreground/80">More Than a Developer</span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-4"
              >
                <span className="text-foreground">Technical</span>
                <br />
                <span className="text-gradient">Arsenal</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed mb-6"
              >
                From crafting clean Kotlin code to mastering martial arts — discipline 
                runs through everything I do. Here's the stack that powers my work.
              </motion.p>

              {/* Stats row */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
                className="flex flex-wrap gap-3 sm:gap-5"
              >
                {[
                  { value: 4, label: "Years of Experience", suffix: "" },
                  { value: 7, label: "Apps Shipped", suffix: "+" },
                  { value: 10, label: "Lines of Kotlin", suffix: "K+" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl sm:text-3xl font-display font-bold text-gradient">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[9px] sm:text-xs font-body text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Character PNG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2 relative flex justify-center md:justify-end"
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ background: "hsl(30 70% 40%)" }}
              />
              <img
                src={heroImage}
                alt="Sahil Wadhwani — Martial Arts"
                className="relative z-10 h-[50svh] sm:h-[55svh] md:h-[70svh] lg:h-[78svh] w-auto object-contain object-bottom select-none"
                style={{
                  maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                  filter: "drop-shadow(0 20px 40px hsl(0 0% 0% / 0.5))",
                }}
                loading="eager"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-muted-foreground/50"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Skills Section ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-blinds opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Skills bars */}
            <div>
              <span className="text-primary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest">Expertise</span>
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold mt-1.5 mb-5">
                <span className="text-foreground">Technical </span>
                <span className="text-gradient">Skills</span>
              </h2>
              <div className="space-y-2.5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="glass-card rounded-lg p-3 hover:border-primary/30 transition-all group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md bg-gradient-to-br ${skill.color} text-white flex-shrink-0`}>
                        <skill.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-display font-semibold text-foreground text-sm">{skill.name}</span>
                          <span className="font-body text-xs text-primary font-bold">
                            {skill.suffix || `${skill.level}%`}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 + index * 0.04, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <span className="text-secondary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest">Toolkit</span>
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold mt-1.5 mb-5">
                <span className="text-foreground">Tools I </span>
                <span className="text-gradient">Use</span>
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="glass-card rounded-lg p-3 flex items-center gap-2 cursor-default hover:border-primary/30 transition-all group"
                  >
                    <img
                      src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                      alt={tool.name}
                      className="w-7 h-7 group-hover:scale-110 transition-transform"
                      loading="lazy"
                    />
                    <span className="font-display font-medium text-foreground text-xs">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillsPage;
