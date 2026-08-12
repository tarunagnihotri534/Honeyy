'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FaqSection.module.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    question: 'How should honey be stored?',
    answer:
      'Store at room temperature away from direct sunlight & moisture. Use only completely dry spoons. Keep the lid closed tightly to prevent moisture absorption, which leads to fermentation of honey.',
  },
  {
    id: '2',
    question: 'Are Monofloral honey varieties artificially flavoured?',
    answer:
      'No, all our monofloral and raw honey varieties are 100% natural. The distinct floral notes and aroma come naturally from the specific nectar collected by bees from wild blossoms, with zero artificial flavours or additives.',
  },
  {
    id: '3',
    question: 'Can diabetics consume honey?',
    answer:
      'Honey has a lower glycemic index than refined white sugar, but it still contains natural fructose and glucose. Diabetics should consult their healthcare provider and consume it in moderation.',
  },
  {
    id: '4',
    question: 'Why does raw honey crystallize and is it safe to eat?',
    answer:
      'Crystallization is a natural hallmark of authentic raw, unfiltered honey. It preserves all natural enzymes and nutrients. You can easily re-liquefy it by placing the glass jar in a warm water bath.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('1');
  const [searchTerm, setSearchTerm] = useState('');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.section} aria-label="Frequently Asked Questions">
      <div className={styles.container}>
        {/* Header Row: Left Title | Right Search */}
        <div className={styles.headerRow}>
          <h2 className={styles.title}>FREQUENTLY ASKED QUESTIONS</h2>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Looking for something?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <svg
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Accordion List */}
        <div className={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className={styles.faqItem}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={styles.faqHeader}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <svg
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={styles.answerWrapper}
                      >
                        <p className={styles.answerText}>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={styles.divider} />
                </div>
              );
            })
          ) : (
            <p className={styles.noResults}>No matching questions found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
