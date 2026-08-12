'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TestimonialsSection.module.css';

interface Testimonial {
  id: string;
  title: string;
  body: string;
  author: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    title: '"The Most Genuine, Flavourful Honey"',
    body: "I've been using Meadlight's honey for a while now, and it's hands down the most genuine, flavorful honey I've come across. Each jar tastes pure and unadulterated. I've tried other brands occasionally, but I always come back – nothing matches the quality, consistency, and trust I have with Meadlight.",
    author: 'Tushar',
  },
  {
    id: '2',
    title: '"Very Meticulous Explanation of Beekeeping"',
    body: 'Very informative session on Beekeeping for beginners conducted by Master Beekeeper. He explains the practical aspects of Beekeeping very meticulously and the live demonstration was useful. You can tell that he is an expert in this field. The session gave us confidence to start. You can even purchase a Bee box if interested. Thank you.',
    author: 'Geoster Xavier',
  },
  {
    id: '3',
    title: '"Perfect for Tea, Toast, or a Healthy Boost!"',
    body: "I've been using Meadlight Bee Farms honey for a long time, and it's truly amazing! Pure, natural, and full of rich flavor—perfect for tea, toast, or a healthy boost. Highly recommended. People should give a try once to know the taste and purity.",
    author: 'Rahul Gupta',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.section} aria-label="Customer Testimonials">
      <div className={styles.container}>
        {/* Centered Heading */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>
            FIND OUT WHAT PEOPLE ARE SAYING ABOUT MEADLIGHT
          </h2>
        </motion.div>

        {/* 3 Column Grid */}
        <div className={styles.grid}>
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
              <div className={styles.cardAuthor}>{item.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
