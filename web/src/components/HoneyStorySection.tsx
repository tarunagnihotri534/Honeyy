'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import styles from './HoneyStorySection.module.css';

export interface StorySlide {
  step: string;
  category: string;
  title: string;
  quote: string;
  image: string;
  imageAlt: string;
  badge: string;
}

const STORY_SLIDES: StorySlide[] = [
  {
    step: '01',
    category: 'APIARY OPENING',
    title: 'HOW NATURAL HONEY IS MADE ?',
    quote: 'Step 01 · Entering the hive in harmony with nature.',
    image: '/h1.png',
    imageAlt: 'Beekeeper carefully opening hive on natural honey farm',
    badge: 'Principia Apiary · Live Harvest',
  },
  {
    step: '02',
    category: 'GOLDEN FRAME EXTRACTION',
    title: 'GOLDEN HONEYCOMB HARVEST',
    quote: '“Carefully harvested from the hive, where nature creates every drop of golden honey.”',
    image: '/h2.png',
    imageAlt: 'Beekeeper lifting honey-filled frame surrounded by bees',
    badge: 'Principia Honey · Frame Extraction',
  },
  {
    step: '03',
    category: 'PURE NECTAR TRANSFORMATION',
    title: 'FROM HIVE TO HONEYCOMB',
    quote: '“Inside the hive, bees transform nature’s nectar into golden honey, filling each honeycomb cell drop by drop.”',
    image: '/h3.png',
    imageAlt: 'Beekeeper checking honey-filled comb dripping raw golden honey',
    badge: 'Principia Honey · Golden Dripping Comb',
  },
  {
    step: '04',
    category: 'RAW COLD FILTERING',
    title: 'GENTLE COLD FILTERING',
    quote: '“The honey is gently filtered from the harvested comb, removing wax and impurities.”',
    image: '/h4.png',
    imageAlt: 'Raw golden honey being gently filtered through stainless steel mesh strainers',
    badge: 'Principia Honey · Cold Gravity Filtering',
  },
  {
    step: '05',
    category: 'JAR BOTTLING & PERFECTION',
    title: 'HIVE TO BOTTLE JOURNEY',
    quote: '“The harvested honey is gently filtered to remove wax and impurities, keeping its natural golden color and rich texture.”',
    image: '/h5.png',
    imageAlt: 'Golden honey flowing from stainless steel tap into a clean glass jar',
    badge: 'Principia Honey · Glass Jar Bottling',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 400 : -400,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function HoneyStorySection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const activeIndex = ((page % STORY_SLIDES.length) + STORY_SLIDES.length) % STORY_SLIDES.length;
  const currentSlide = STORY_SLIDES[activeIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const goToSlide = (index: number) => {
    const dir = index > activeIndex ? 1 : -1;
    setPage([index, dir]);
  };

  // Autoplay functionality (every 4.5 seconds)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [page, isHovered]);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeConfidenceThreshold || info.offset.x < -50) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold || info.offset.x > 50) {
      paginate(-1);
    }
  };

  return (
    <section
      className={styles.section}
      aria-label="How Natural Honey is Made"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Honeycomb Overlay */}
      <div className={styles.honeycombBg} aria-hidden="true" />

      {/* Decorative Vintage Background Accents */}
      <img src="/assets/story_00.png" alt="" className={styles.storyDipperLeft} aria-hidden="true" />
      <img src="/assets/story_01.png" alt="" className={styles.storyJarRight} aria-hidden="true" />
      <img src="/assets/eucalyptus.png" alt="" className={styles.poppingLeafLeft} aria-hidden="true" />
      <img src="/assets/eucalyptus.png" alt="" className={styles.poppingLeafRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Step Navigation Indicators (01 - 05 Circle Badges) */}
        <div className={styles.stepIndicatorRow}>
          {STORY_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.step}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`${styles.stepBadgeBtn} ${isActive ? styles.stepBadgeActive : ''}`}
                aria-label={`Go to step ${slide.step}`}
              >
                <div className={styles.circleBadge}>
                  <svg viewBox="0 0 100 100" className={styles.circleSvg}>
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      stroke={isActive ? '#f59e0b' : '#ffcc26'}
                      strokeWidth={isActive ? '5' : '3.5'}
                      fill={isActive ? '#ffcc26' : 'none'}
                      strokeDasharray="270"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={`${styles.circleNumber} ${isActive ? styles.activeNumber : ''}`}>
                    {slide.step}
                  </span>
                </div>
                <span className={styles.stepBadgeLabel}>{slide.category}</span>
              </button>
            );
          })}
        </div>

        {/* Synced Text Header Block */}
        <div className={styles.headerTextBlock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.step}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.headerTextGroup}
            >
              <span className={styles.subHeadingPill}>{currentSlide.category}</span>
              <h2 className={styles.mainHeading}>{currentSlide.title}</h2>
              <p className={styles.shortTextQuote}>{currentSlide.quote}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Sliding Image & Controls Container */}
        <div className={styles.sliderMain}>
          {/* Arrow Buttons */}
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.prevBtn}`}
            onClick={() => paginate(-1)}
            aria-label="Previous step"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.nextBtn}`}
            onClick={() => paginate(1)}
            aria-label="Next step"
          >
            ›
          </button>

          {/* Animated Interactive Cursor Sliding Image Frame */}
          <div className={styles.imageFrameContainer}>
            <div className={styles.imageFrame}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className={styles.slashImageContainer}
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.imageAlt}
                    className={styles.slashImage}
                    draggable={false}
                  />
                  <div className={`${styles.slashEdge} ${styles.slashEdgeLeft}`} aria-hidden="true" />
                  <div className={`${styles.slashEdge} ${styles.slashEdgeRight}`} aria-hidden="true" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
