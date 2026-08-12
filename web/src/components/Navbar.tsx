'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'STORE', href: '/collections' },
  { label: 'OUR STORY', href: '#story' },
  { label: 'COLLECTIONS', href: '#collections' },
  { label: 'GALLERY', href: '#gallery' },
];

const HONEY_DROPS = [
  { id: 'drop-1', left: '16.5%', top: '112px', delay: 0 },
  { id: 'drop-2', left: '35.8%', top: '126px', delay: 0.8 },
  { id: 'drop-3', left: '51.5%', top: '118px', delay: 1.6 },
  { id: 'drop-4', left: '71.2%', top: '128px', delay: 0.4 },
  { id: 'drop-5', left: '86.8%', top: '114px', delay: 1.2 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cartCount] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(70);

  // Measure actual navbar height so drip strip sits precisely at its bottom edge
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setNavbarHeight(headerRef.current.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [scrolled]);

  // Track scroll position for header styling & active link highlight
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(targetId);
      } else if (window.location.pathname !== '/') {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <>
      {/* ── Honey Drip Band (Absolute on Hero Landing 1st Page only - scrolls away with 1st section) ── */}
      <div
        aria-hidden="true"
        className={styles.honeyDripWrapper}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: navbarHeight + 90,
          pointerEvents: 'none',
          zIndex: 998,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            d="
              M0,0 H1440 V60

              C1435,60 1428,60 1422,78 C1416,96 1410,108 1404,114 C1398,120 1392,120 1386,114
              C1380,108 1374,95 1368,78 C1362,61 1354,60 1344,60

              C1332,60 1326,60 1320,72 C1314,84 1310,90 1305,93 C1300,96 1295,96 1290,93
              C1285,90 1281,84 1275,72 C1269,60 1261,60 1249,60

              C1233,60 1224,60 1215,82 C1206,104 1199,122 1191,132 C1183,142 1175,144 1167,140
              C1159,136 1152,124 1145,104 C1138,84 1131,60 1119,60

              C1107,60 1100,60 1094,70 C1088,80 1084,86 1079,89 C1074,92 1069,92 1064,89
              C1059,86 1055,80 1049,70 C1043,60 1036,60 1024,60

              C1009,60 1001,60 992,85 C983,110 976,128 967,136 C958,144 949,142 940,134
              C931,126 924,108 917,85 C910,62 902,60 890,60

              C877,60 870,60 864,74 C858,88 854,96 849,100 C844,104 839,104 834,100
              C829,96 825,88 819,74 C813,60 806,60 794,60

              C779,60 771,60 762,88 C753,116 746,136 737,144 C728,152 719,150 710,142
              C701,134 694,114 687,88 C680,62 672,60 660,60

              C647,60 640,60 634,72 C628,84 624,90 619,93 C614,96 609,96 604,93
              C599,90 595,84 589,72 C583,60 576,60 564,60

              C549,60 541,60 532,84 C523,108 516,124 508,132 C500,140 492,140 484,132
              C476,124 469,108 462,84 C455,60 447,60 435,60

              C422,60 415,60 409,70 C403,80 399,86 394,89 C389,92 384,92 379,89
              C374,86 370,80 364,70 C358,60 351,60 339,60

              C324,60 316,60 307,90 C298,120 291,140 282,148 C273,156 264,154 255,146
              C246,138 239,118 232,90 C225,62 217,60 205,60

              C192,60 185,60 179,74 C173,88 169,96 164,100 C159,104 154,104 149,100
              C144,96 140,88 134,74 C128,60 121,60 109,60

              C94,60 86,60 77,82 C68,104 61,120 53,130 C45,140 37,140 29,130
              C21,120 14,104 7,82 C2,68 0,60 0,60

              Z
            "
            fill="#f5b400"
          />
        </svg>

        {/* Animated Honey Drop Effects in First Section */}
        {HONEY_DROPS.map((drop) => (
          <motion.div
            key={drop.id}
            className={styles.honeyDrop}
            style={{ left: drop.left, top: drop.top }}
            animate={{
              y: [0, 18, 55, 100],
              scaleX: [1, 0.85, 0.6, 0.2],
              scaleY: [1, 1.4, 2.2, 0.6],
              opacity: [0, 1, 0.95, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: drop.delay,
              ease: [0.45, 0.05, 0.55, 0.95],
            }}
          />
        ))}
      </div>

      {/* ── STICKY NAVBAR ────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      >
        <div className={styles.container}>
          {/* Left: Brand Logo */}
          <a href="/" className={styles.brand}>
            <img src="/assets/bee-hero.svg" alt="Meadlight Bee Logo" className={styles.brandBee} />
            <span className={styles.brandText}>
              MEAD<span className={styles.brandHighlight}>LIGHT</span>
            </span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className={styles.navMenu}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className={styles.navIndicator}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Actions & Pill Button */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Shopping Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>

            <motion.a
              href="/about"
              className={styles.aboutPill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              ABOUT
            </motion.a>
          </div>
        </div>
      </header>
    </>
  );
}
