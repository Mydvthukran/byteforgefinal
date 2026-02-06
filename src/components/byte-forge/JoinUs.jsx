"use client";

import { motion } from "framer-motion";
import styles from "./JoinUs.module.css";

export default function JoinUs() {
  return (
    <section className={styles.joinUs} id="join">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className={styles.glow} />

        <div className={styles.labelRow}>
          <span className={styles.dot} />
          <p className={styles.label}>JOIN US</p>
        </div>

        <h2 className={styles.heading}>
          {"Ready to forge"}
          <br />
          {"the future?"}
        </h2>

        <p className={styles.description}>
          Be part of a community that builds, learns, and innovates together.
        </p>

        <a href="https://docs.google.com/forms/d/e/1FAIpQLSes1nifMXuuC9MwFNLrcuhCtFl5BW-HRNQU1TI1RGK2vMCh_w/viewform?usp=publish-editor" className={styles.cta}>
          <span>Join us </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <div className={styles.cornerTL} />
        <div className={styles.cornerBR} />
      </motion.div>
    </section>
  );
}
