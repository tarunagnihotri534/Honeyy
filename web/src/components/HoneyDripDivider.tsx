'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './HoneyDripDivider.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface HoneyDripDividerProps {
  color?: string; // Fill color or 'golden' for liquid honey gradient
  height?: number; // Base SVG viewBox height
  className?: string;
}

// Multi-drip organic bezier path data across 1440px wide viewport with deep irregular drips
const MAIN_DRIP_PATH = `
  M0,0
  C40,15 60,35 75,55
  C85,68 95,78 105,78
  C115,78 125,65 135,45
  C150,20 165,15 185,15
  C205,15 215,30 225,50
  C235,70 245,95 255,95
  C265,95 275,70 285,45
  C300,10 315,10 335,25
  C350,38 360,58 375,58
  C390,58 400,35 415,20
  C435,5 455,25 470,60
  C480,85 490,110 500,110
  C510,110 520,80 530,50
  C545,15 565,10 585,25
  C600,38 610,65 625,65
  C640,65 650,40 665,20
  C685,0 705,20 720,50
  C730,72 740,88 750,88
  C760,88 770,65 780,42
  C795,12 815,15 835,35
  C850,50 860,75 875,75
  C890,75 900,45 915,22
  C935,0 955,25 970,65
  C980,92 990,115 1000,115
  C1010,115 1020,85 1030,55
  C1045,18 1065,12 1085,28
  C1100,40 1110,68 1125,68
  C1140,68 1150,42 1165,25
  C1185,5 1205,25 1220,55
  C1230,75 1240,92 1250,92
  C1260,92 1270,70 1280,48
  C1295,20 1315,12 1335,25
  C1350,38 1365,60 1380,60
  C1395,60 1415,35 1440,0
  L1440,0 L0,0 Z
`.replace(/\s+/g, ' ').trim();

// Falling droplet positions beneath the deepest drip tips
const FALLING_DROPLETS = [
  { id: 'drop-1', cx: 255, cy: 100, r: 4.5, delay: 0 },
  { id: 'drop-2', cx: 500, cy: 115, r: 5.5, delay: 0.6 },
  { id: 'drop-3', cx: 750, cy: 92, r: 4.0, delay: 1.2 },
  { id: 'drop-4', cx: 1000, cy: 120, r: 6.0, delay: 0.9 },
  { id: 'drop-5', cx: 1250, cy: 96, r: 4.8, delay: 1.5 },
];

export default function HoneyDripDivider({
  color = '#f5b400',
  height = 130,
  className = '',
}: HoneyDripDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dropletsRef = useRef<(SVGCircleElement | null)[]>([]);

  const isGolden = color === '#f5b400' || color === 'golden';
  const fillValue = isGolden ? 'url(#honeyDripGrad)' : color;

  useGSAP(() => {
    if (!svgRef.current || !containerRef.current) return;

    // 1. ScrollTrigger entrance animation (Scale Y from top)
    gsap.fromTo(
      svgRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
        },
      }
    );

    // 2. Continuous subtle liquid 'dripping' oscillation on the SVG path
    gsap.to(svgRef.current, {
      y: 3,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // 3. Independent falling honey droplet loops
    dropletsRef.current.forEach((drop, i) => {
      if (!drop) return;
      const initialY = FALLING_DROPLETS[i]?.cy || 100;
      const delay = FALLING_DROPLETS[i]?.delay || 0;

      gsap.fromTo(
        drop,
        { cy: initialY, opacity: 0.9, scale: 1, transformOrigin: 'center center' },
        {
          cy: initialY + 28,
          opacity: 0,
          scale: 0.4,
          duration: 2.2,
          delay: delay,
          repeat: -1,
          ease: 'power1.in',
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${styles.dividerWrapper} ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className={styles.dripSvg}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="honeyDripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5b400" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Main irregular honeycomb wax drip path */}
        <path d={MAIN_DRIP_PATH} fill={fillValue} />

        {/* Realism: Independent falling honey droplets */}
        <g className={styles.dropletsGroup}>
          {FALLING_DROPLETS.map((drop, idx) => (
            <circle
              key={drop.id}
              ref={(el) => { dropletsRef.current[idx] = el; }}
              cx={drop.cx}
              cy={drop.cy}
              r={drop.r}
              fill={fillValue}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
