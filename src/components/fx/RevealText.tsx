import { motion } from "framer-motion";
import { ReactNode } from "react";

/** Masked, upward line reveal for headings — editorial feel. */
const RevealText = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "105%" }}
      whileInView={{ y: "0%" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default RevealText;
