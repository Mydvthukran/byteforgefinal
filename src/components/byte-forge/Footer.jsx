"use client";

import styles from "./Footer.module.css";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#members" },
  { label: "Join", href: "#join" },
];

const contacts = [
  { name: "Nishit Yadav", phone: "+91 9876543210", email: "nishit@byteforge.com" },
  { name: "Manish Yadav", phone: "+91 9461429507", email: "my3596418@gmail.com" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect width="36" height="36" rx="4" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="var(--accent-amber)" opacity="0.6" />
              <circle cx="24" cy="12" r="2" fill="var(--accent-amber)" opacity="0.8" />
              <circle cx="12" cy="24" r="2" fill="var(--accent-amber)" opacity="0.8" />
              <circle cx="24" cy="24" r="2" fill="var(--accent-amber)" opacity="0.6" />
            </svg>
            <span className={styles.brandText}>BYTE FORGE</span>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {links.map((link, i) => (
              <span key={link.label} className={styles.navItem}>
                <a href={link.href} className={styles.link}>{link.label}</a>
                {i < links.length - 1 && <span className={styles.linkSeparator} aria-hidden="true" />}
              </span>
            ))}
          </nav>
        </div>

        <div className={styles.divider} />

        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Contact</h3>
          <div className={styles.contactGrid}>
            {contacts.map((contact) => (
              <div key={contact.email} className={styles.contactCard}>
                <p className={styles.contactName}>{contact.name}</p>
                <a href={`tel:${contact.phone}`} className={styles.contactLink}>
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Byte Forge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
