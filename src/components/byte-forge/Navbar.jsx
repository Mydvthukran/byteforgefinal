"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "TEAM", href: "#members" },
  { label: "JOIN", href: "#join" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.brand}>
          <div className={styles.logoMark}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="4" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="2" fill="var(--accent-amber)" opacity="0.6" />
              <circle cx="18" cy="10" r="2" fill="var(--accent-amber)" opacity="0.8" />
              <circle cx="26" cy="10" r="2" fill="var(--accent-amber)" opacity="0.4" />
              <circle cx="10" cy="18" r="2" fill="var(--accent-amber)" opacity="0.8" />
              <circle cx="18" cy="18" r="2" fill="var(--accent-gold)" />
              <circle cx="26" cy="18" r="2" fill="var(--accent-amber)" opacity="0.6" />
              <circle cx="10" cy="26" r="2" fill="var(--accent-amber)" opacity="0.4" />
              <circle cx="18" cy="26" r="2" fill="var(--accent-amber)" opacity="0.6" />
              <circle cx="26" cy="26" r="2" fill="var(--accent-amber)" opacity="0.8" />
            </svg>
          </div>
          <span className={styles.brandText}>BYTE FORGE</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link, i) => (
            <span key={link.label} className={styles.navItem}>
              <a href={link.href} className={styles.navLink}>{link.label}</a>
              {i < navLinks.length - 1 && <span className={styles.separator} aria-hidden="true" />}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
