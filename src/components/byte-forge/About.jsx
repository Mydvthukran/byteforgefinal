"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./About.module.css";

const stats = [
  { value: "10+", label: "Members" },
  { value: "2", label: "Projects" },
  { value: "2", label: "Hackathon participations" },
  { value: "5+", label: "Months of activity" },
];

function AnimatedCounter({ value, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={styles.statValue}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {value}
    </motion.span>
  );
}

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.sectionLine} />
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className={styles.labelRow}>
          <span className={styles.dot} />
          <p className={styles.label}>ABOUT US</p>
        </div>
        <h2 className={styles.heading}>
          Building the <span className={styles.accent}>next generation</span> of
          tech innovators
        </h2>
        <p className={styles.description}>
          Byte Forge is a community of developers, designers, and tech
          enthusiasts pushing the boundaries of what{"'"}s possible. We collaborate,
          build, and ship products that matter.
        </p>

        <div className={styles.stats}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={styles.stat}>
              <AnimatedCounter value={stat.value} delay={i * 0.12} />
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statUnderline} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
