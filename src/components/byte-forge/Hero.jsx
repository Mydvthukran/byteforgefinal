"use client";

import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const NeuralSphere = lazy(() => import("./NeuralSphere"));

/* ---- Typewriter hook ---- */
function useTypewriter(text, delay, speed) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, started };
}

/* ---- Sections for right-side indicator ---- */
const sections = [
  { id: "hero", num: "01" },
  { id: "about", num: "02" },
  { id: "members", num: "03" },
  { id: "join", num: "04" },
];

export default function Hero() {
  const [activeSection, setActiveSection] = useState("hero");
  const [linesReady, setLinesReady] = useState(false);
  const observerRefs = useRef({});

  const leftText = useTypewriter(
    "a community of developers, designers and innovators who build computation platforms that push boundaries \u2014 creative, fast and open source.",
    2200,
    22
  );
  const rightText = useTypewriter(
    "building the next-generation tech community, from ground up",
    2600,
    25
  );

  /* Start line animation after mount */
  useEffect(() => {
    const timer = setTimeout(() => setLinesReady(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  /* IntersectionObserver for page indicator */
  useEffect(() => {
    const observers = [];
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sec.id);
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleIndicatorClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* ambient warm glow blobs */}
      <div className={styles.ambientBlobLeft} />
      <div className={styles.ambientBlobRight} />

      {/* 3D brain visualization */}
      <div className={styles.sphereContainer}>
        <Suspense fallback={
          <div className={styles.spherePlaceholder}>
            <div className={styles.sphereGlow} />
          </div>
        }>
          <NeuralSphere />
        </Suspense>
      </div>

      {/* ---- BYTE FORGE title pushed up above the sphere ---- */}
      <div className={styles.titleOverlay}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          BYTE
        </motion.h1>
        <motion.h1
          className={styles.titleSecond}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          FORGE
        </motion.h1>
      </div>

      {/* ---- Animated connecting lines (SVG) from sphere to callouts ---- */}
      <svg className={styles.connectingLines} aria-hidden="true">
        {/* line from sphere center to left annotation */}
        <line
          className={`${styles.connectLine} ${linesReady ? styles.connectLineVisible : ""}`}
          x1="50%"
          y1="55%"
          x2="12%"
          y2="62%"
          style={{ animationDelay: "0s" }}
        />
        {/* small orange dot at the end of left line */}
        <circle
          className={`${styles.connectDot} ${linesReady ? styles.connectDotVisible : ""}`}
          cx="12%"
          cy="62%"
          r="4"
          style={{ animationDelay: "0.8s" }}
        />
        {/* line from sphere center to right annotation */}
        <line
          className={`${styles.connectLine} ${linesReady ? styles.connectLineVisible : ""}`}
          x1="50%"
          y1="40%"
          x2="78%"
          y2="22%"
          style={{ animationDelay: "0.3s" }}
        />
        {/* small orange dot at the end of right line */}
        <circle
          className={`${styles.connectDot} ${linesReady ? styles.connectDotVisible : ""}`}
          cx="78%"
          cy="22%"
          r="4"
          style={{ animationDelay: "1.1s" }}
        />
      </svg>

      {/* "WE ARE" annotation - left */}
      <motion.div
        className={styles.annotationLeft}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <div className={styles.annotationHeader}>
          <span className={styles.annotationDot} />
          <span className={styles.annotationLabel}>WE ARE</span>
        </div>
        <p className={styles.annotationText}>
          {leftText.displayed}
          {leftText.displayed.length < 130 && <span className={styles.cursor}>|</span>}
        </p>
      </motion.div>

      {/* "WE ARE" annotation - right */}
      <motion.div
        className={styles.annotationRight}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        <div className={styles.annotationHeader}>
          <span className={styles.annotationDot} />
          <span className={styles.annotationLabel}>WE ARE</span>
        </div>
        <p className={styles.annotationText}>
          {rightText.displayed}
          {rightText.displayed.length < 58 && <span className={styles.cursor}>|</span>}
        </p>
      </motion.div>

      {/* ---- Right side page indicator (functional) ---- */}
      <motion.div
        className={styles.pageIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        {sections.map((sec, i) => (
          <div key={sec.id}>
            <button
              className={styles.indicatorBtn}
              onClick={() => handleIndicatorClick(sec.id)}
              aria-label={`Go to section ${sec.num}`}
            >
              <span
                className={
                  activeSection === sec.id
                    ? styles.indicatorDotActive
                    : styles.indicatorDot
                }
              />
              {activeSection === sec.id && (
                <span className={styles.indicatorNum}>{sec.num}</span>
              )}
            </button>
            {i < sections.length - 1 && <div className={styles.indicatorLine} />}
          </div>
        ))}
      </motion.div>

      {/* bottom scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollCircle} />
      </motion.div>
    </section>
  );
}
