'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

const PRODUCTS = [
  {
    id: 'multifloral',
    name: 'Multifloral Honey',
    subtitle: 'Fermented Honey Drink',
    image: '/B1.png',
    price: '₹ 499',
    tag: 'Bestseller',
    description: 'A rich blend of wildflower nectars, cold-extracted and naturally fermented.',
    category: 'drinks',
  },
  {
    id: 'single-origin',
    name: 'Single Origin Honey',
    subtitle: 'Pure Alpine Collection',
    image: '/B2.png',
    price: '₹ 649',
    tag: 'New',
    description: 'Single-source honey from high-altitude Italian alpine meadows.',
    category: 'drinks',
  },
  {
    id: 'beekeeping',
    name: 'Beekeeping Equipment',
    subtitle: 'Artisan Reserve Kit',
    image: '/B3.png',
    price: '₹ 1,299',
    tag: 'Reserve',
    description: 'Premium beekeeping tools sourced and curated by our master apiarists.',
    category: 'equipment',
  },
  {
    id: 'lemon-ginger',
    name: 'Lemon Ginger Honey',
    subtitle: 'Fermented Honey Jar',
    image: '/m4.png',
    price: '₹ 549',
    tag: 'Popular',
    description: 'Zesty lemon meets warming ginger in this naturally fermented honey blend.',
    category: 'jars',
  },
  {
    id: 'raw-honey',
    name: 'Raw Honey',
    subtitle: 'Cold-Extracted Natural',
    image: '/r5.png',
    price: '₹ 399',
    tag: 'Pure',
    description: 'Unfiltered raw honey straight from the hive, packed with enzymes and pollen.',
    category: 'jars',
  },
  {
    id: 'reserve-honey',
    name: 'Reserve Selection',
    subtitle: 'Premium Aged Honey',
    image: '/r6.png',
    price: '₹ 799',
    tag: 'Limited',
    description: 'Our finest single-batch reserve honey, aged to develop complex flavours.',
    category: 'jars',
  },
  {
    id: 'premium-blend',
    name: 'Premium Blend',
    subtitle: 'Signature Collection',
    image: '/r7.png',
    price: '₹ 899',
    tag: 'Signature',
    description: 'A curated blend of our best varieties — the ultimate Meadlight experience.',
    category: 'jars',
  },
];

const FILTERS = ['All', 'drinks', 'jars', 'equipment'];

const tagColors: Record<string, string> = {
  Bestseller: '#f5b400',
  New:        '#4ade80',
  Reserve:    '#a78bfa',
  Popular:    '#fb923c',
  Pure:       '#38bdf8',
  Limited:    '#f43f5e',
  Signature:  '#f5b400',
};

export default function CollectionsPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);

  const visible = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero Banner */}
      <div className={styles.hero}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          OUR STORE
        </motion.h1>
        <motion.p
          className={styles.heroSub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Raw · Natural · Fermented · Prodotto in Italia
        </motion.p>
      </div>

      <div className={styles.container}>
        {/* Filter Tabs */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {visible.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                className={styles.card}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(product)}
              >
                {/* Tag */}
                <span
                  className={styles.tag}
                  style={{ background: tagColors[product.tag] ?? '#f5b400' }}
                >
                  {product.tag}
                </span>

                {/* Image */}
                <div className={styles.imgWrap}>
                  <img src={product.image} alt={product.name} className={styles.productImg} />
                </div>

                {/* Info */}
                <div className={styles.cardBody}>
                  <p className={styles.productSub}>{product.subtitle}</p>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>{product.price}</span>
                    <button className={styles.addBtn}>Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick-View Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
              <div className={styles.modalInner}>
                <div className={styles.modalImgWrap}>
                  <img src={selected.image} alt={selected.name} className={styles.modalImg} />
                </div>
                <div className={styles.modalInfo}>
                  <span
                    className={styles.tag}
                    style={{ background: tagColors[selected.tag] ?? '#f5b400', position: 'static', marginBottom: '12px' }}
                  >
                    {selected.tag}
                  </span>
                  <h2 className={styles.modalName}>{selected.name}</h2>
                  <p className={styles.modalSub}>{selected.subtitle}</p>
                  <p className={styles.modalDesc}>{selected.description}</p>
                  <div className={styles.modalFooter}>
                    <span className={styles.modalPrice}>{selected.price}</span>
                    <button className={styles.buyBtn}>Add to Cart 🛒</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
