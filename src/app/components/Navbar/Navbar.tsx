"use client"

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Chat", href: "/chat" },
  { name: "Weather", href: "/weather" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          AI-Dashboard
        </Link>

        {/* Desktop Nav */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.ctaWrapper}>
          <button className={styles.ctaButton}>Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className={styles.mobileMenuButton}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={styles.mobileNav}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className={styles.ctaButton}>Get Started</button>
        </motion.div>
      )}
    </nav>
  );
}
