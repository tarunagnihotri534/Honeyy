'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ShopByCollection.module.css';
import { CoverflowCarousel, CoverflowSlide } from '@/components/ui/coverflow-carousel';

const CAROUSEL_ITEMS: CoverflowSlide[] = [
  { src: '/B1.png',  alt: 'Meadlight Multifloral Fermented Honey Drink',   title: 'Multifloral Honey',   subtitle: 'Fermented Honey Drink' },
  { src: '/B2.png',  alt: 'Meadlight Single Origin Honey Drink',            title: 'Single Origin Honey', subtitle: 'Pure Alpine Collection' },
  { src: '/B3.png',  alt: 'Meadlight Beekeeping Equipment & Reserve',       title: 'Beekeeping Equipment',subtitle: 'Artisan Reserve Kit' },
  { src: '/m4.png',  alt: 'Meadlight Lemon Ginger Fermented Honey Jar',     title: 'Lemon Ginger Honey',  subtitle: 'Fermented Honey Jar' },
  { src: '/r5.png',  alt: 'Meadlight Raw Honey Collection',                 title: 'Raw Honey',           subtitle: 'Cold-Extracted Natural' },
  { src: '/r6.png',  alt: 'Meadlight Reserve Honey Selection',              title: 'Reserve Selection',   subtitle: 'Premium Aged Honey' },
  { src: '/r7.png',  alt: 'Meadlight Premium Honey Blend',                  title: 'Premium Blend',       subtitle: 'Signature Collection' },
];

export default function ShopByCollection() {
  return (
    <section className={styles.section} aria-label="Shop By Collection">
      {/* Seamless Organic Top Wave Separator */}
      <div className={styles.sectionWaveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
          <path
            fill="#fdf0ee"
            d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.sectionTitle}>SHOP BY COLLECTION</h2>
          <a href="/collections" className={styles.viewAllLink}>VIEW ALL →</a>
        </motion.div>

        {/* Coverflow Carousel */}
        <motion.div
          className={styles.carouselWrapper}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CoverflowCarousel
            slides={CAROUSEL_ITEMS}
            rotate={44}
            depth={0.55}
            perspective={3}
            falloff={0.56}
            fade={0.12}
            cardWidth="clamp(220px, 30vw, 340px)"
            gap={0.06}
            loop
            showCaption
            showPagination
            showNavigation
          />
        </motion.div>

        {/* View Store CTA */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="/collections"
            className={styles.viewStoreBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            VIEW STORE
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
