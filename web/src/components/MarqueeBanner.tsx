'use client';

import React from 'react';
import styles from './MarqueeBanner.module.css';

const ITEMS = [
  'EVERY JAR SUPPORTS POLLINATORS',
  'RAW · UNFILTERED · PURE HONEY',
  'PRODOTTO IN ITALIA · NATURALLY FERMENTED',
  'NO ADDITIVES · NO PRESERVATIVES',
  'LEMON GINGER · MULTIFLORAL · SINGLE ORIGIN',
  'ARTISAN BEEKEEPING SINCE 1987',
];

// Duplicate for seamless infinite loop
const TICKER = [...ITEMS, ...ITEMS];

export default function MarqueeBanner() {
  return (
    <div className={styles.banner} aria-hidden="true">
      <div className={styles.track}>
        {TICKER.map((text, i) => (
          <span key={i} className={styles.item}>
            <span>{text}</span>
            <img
              src="/assets/bee-hero.svg"
              alt=""
              className={styles.beeLogo}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
