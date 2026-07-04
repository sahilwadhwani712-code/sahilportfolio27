import { motion, useInView } from "framer-motion";
import { Code2, Smartphone, Layers, Flame, GitBranch, Server, Binary, Braces, Keyboard } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-blinds opacity-20" />
      <div className="absolute top-1/4 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-14">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest">Expertise</span>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold mt-1.5 mb-3 sm:mb-5">
              <span className="text-foreground">Technical </span>
              <span className="text-gradient">Skills</span>
            </h2>
            
            <div className="space-y-1.5 sm:space-y-2.5">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="glass-card rounded-lg p-2 sm:p-3 hover:border-primary/30 transition-all group cursor-default"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`p-1 sm:p-1.5 rounded-md bg-gradient-to-br ${skill.color} text-white flex-shrink-0`}>
                      <skill.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-display font-semibold text-foreground text-[11px] sm:text-sm">{skill.name}</span>
                        <span className="font-body text-[9px] sm:text-xs text-primary font-bold">
                          {skill.suffix || `${skill.level}%`}
                        </span>
                      </div>
                      <div className="h-1 sm:h-1.5 bg-muted/50 rounded-full overflow-hidden">
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
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-secondary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest">Toolkit</span>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold mt-1.5 mb-3 sm:mb-5">
              <span className="text-foreground">Tools I </span>
              <span className="text-gradient">Use</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="glass-card rounded-lg p-2 sm:p-3 flex items-center gap-2 cursor-default hover:border-primary/30 transition-all group bounce-card"
                >
                  <img 
                    src={`https://skillicons.dev/icons?i=${tool.icon}&theme=dark`}
                    alt={tool.name}
                    className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <span className="font-display font-medium text-foreground text-[10px] sm:text-xs">{tool.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-3 sm:mt-5">
              {[
                { value: 6, label: "Years Coding", suffix: "+" },
                { value: 15, label: "Projects Built", suffix: "+" },
                { value: 10, label: "Lines of Kotlin", suffix: "K+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="text-center p-2 sm:p-3 glass-card rounded-lg hover:border-primary/30 transition-all"
                >
                  <div className="text-base sm:text-2xl md:text-3xl font-display font-bold text-gradient">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-body text-muted-foreground mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
