"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type BouncePath = {
  d: string;
  duration: number;
  ease: [number, number, number, number];
  diameter: number;
  endX: number;
};

const bounceEase: BouncePath["ease"] = [0.42, 0, 0.58, 1];

function createBouncePath(
  title: HTMLHeadingElement,
  emphasis: HTMLSpanElement,
  previousEnd: number | null,
  previousDirection: 1 | -1 | null,
): BouncePath | null {
  const titleBounds = title.getBoundingClientRect();
  const emphasisBounds = emphasis.getBoundingClientRect();
  if (!titleBounds.width || !titleBounds.height || !emphasisBounds.width) return null;

  const diameter = Math.max(12, Math.min(titleBounds.width * 0.035, 21));
  const left = emphasisBounds.left - titleBounds.left + diameter / 2;
  const right = emphasisBounds.right - titleBounds.left - diameter / 2;
  const span = right - left;
  const randomBetween = (minimum: number, maximum: number) =>
    minimum + Math.random() * Math.max(0, maximum - minimum);
  const startX = previousEnd ?? randomBetween(left, right);
  const minimumTravel = span * 0.3;
  const leftEnd = Math.max(left, Math.min(right, startX - minimumTravel));
  const rightStart = Math.min(right, Math.max(left, startX + minimumTravel));
  const hasLeftPath = leftEnd > left;
  const hasRightPath = right > rightStart;
  const preferredDirection: 1 | -1 = previousDirection
    ? Math.random() < 0.65 ? previousDirection : previousDirection * -1 as 1 | -1
    : Math.random() < 0.5 ? -1 : 1;
  const travelDirection = preferredDirection === 1 && hasRightPath || !hasLeftPath ? 1 : -1;
  const endX = travelDirection === 1
    ? randomBetween(rightStart, right)
    : randomBetween(left, leftEnd);
  const landingY = emphasisBounds.bottom - titleBounds.top - diameter * 0.1;
  const firstLine = title.querySelector(":scope > span:first-child")?.getBoundingClientRect();
  const apexY = firstLine
    ? firstLine.top - titleBounds.top + firstLine.height * (0.44 + Math.random() * 0.08)
    : titleBounds.height * 0.15;
  const apexX = startX + (endX - startX) * (0.46 + (Math.random() - 0.5) * 0.12);
  const controlY = apexY + (landingY - apexY) * 0.38;
  const reboundDistance = Math.abs(endX - startX) * (0.025 + Math.random() * 0.025);
  const reboundHeight = Math.max(5, diameter * (0.35 + Math.random() * 0.3));
  const reboundX = Math.max(diameter / 2, Math.min(titleBounds.width - diameter / 2, endX + travelDirection * reboundDistance));

  const d = [
    `M ${startX} ${landingY}`,
    `C ${startX + (apexX - startX) * 0.28} ${controlY}, ${apexX - (apexX - startX) * 0.18} ${apexY}, ${apexX} ${apexY}`,
    `S ${endX - (endX - apexX) * 0.28} ${controlY}, ${endX} ${landingY}`,
    `Q ${(endX + reboundX) / 2} ${landingY - reboundHeight}, ${reboundX} ${landingY}`,
    `Q ${(endX + reboundX) / 2} ${landingY + diameter * 0.12}, ${endX} ${landingY}`,
  ].join(" ");

  return {
    d,
    duration: 2.7,
    ease: bounceEase,
    diameter,
    endX,
  };
}

export function HeroTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emphasisRef = useRef<HTMLSpanElement>(null);
  const previousEndRef = useRef<number | null>(null);
  const previousDirectionRef = useRef<1 | -1 | null>(null);
  const reduceMotion = useReducedMotion();
  const [bouncePath, setBouncePath] = useState<BouncePath | null>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const title = titleRef.current;
    const emphasis = emphasisRef.current;
    if (!title || !emphasis || reduceMotion) return;

    const updatePath = () => {
      const nextPath = createBouncePath(title, emphasis, previousEndRef.current, previousDirectionRef.current);
      if (nextPath) {
        const previousEnd = previousEndRef.current;
        previousEndRef.current = nextPath.endX;
        previousDirectionRef.current = previousEnd === null ? null : Math.sign(nextPath.endX - previousEnd) as 1 | -1;
        setBouncePath(nextPath);
        setCycle((current) => current + 1);
      }
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    observer.observe(title);
    observer.observe(emphasis);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const handleBounceComplete = () => {
    const title = titleRef.current;
    const emphasis = emphasisRef.current;
    if (!title || !emphasis) return;

    {
      const nextPath = createBouncePath(title, emphasis, previousEndRef.current, previousDirectionRef.current);
      if (nextPath) {
        const previousEnd = previousEndRef.current;
        previousEndRef.current = nextPath.endX;
        previousDirectionRef.current = previousEnd === null ? null : Math.sign(nextPath.endX - previousEnd) as 1 | -1;
        setBouncePath(nextPath);
        setCycle((current) => current + 1);
      }
    }
  };

  return (
    <h1 ref={titleRef} className="heroTitle">
      <span>Hi, I&apos;m Angelo.</span>
      <span>I build useful</span>
      <span ref={emphasisRef} className="heroTitleEmphasis">digital products.</span>
      {!reduceMotion && bouncePath && (
        <svg className="heroTitleMotionTrace" aria-hidden="true">
          <motion.path
            key={`trace-${cycle}`}
            d={bouncePath.d}
            fill="none"
            stroke="url(#hero-orb-trail)"
            strokeWidth={Math.max(1.5, bouncePath.diameter * 0.12)}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.44 }}
            animate={{ pathLength: 1, opacity: [0.44, 0.28, 0] }}
            transition={{
              pathLength: { duration: bouncePath.duration, ease: bouncePath.ease },
              opacity: { duration: bouncePath.duration, times: [0, 0.72, 1], ease: "linear" },
            }}
          />
          <defs>
            <linearGradient id="hero-orb-trail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#aaa9f6" stopOpacity="0" />
              <stop offset="100%" stopColor="#8d8bed" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {!reduceMotion && bouncePath && (
        <motion.span
          key={`orb-${cycle}`}
          className="heroTitleOrb"
          aria-hidden="true"
          style={{
            width: bouncePath.diameter,
            height: bouncePath.diameter,
            offsetPath: `path("${bouncePath.d}")`,
            offsetRotate: "0deg",
          }}
          initial={{ offsetDistance: "0%", scale: 1 }}
          animate={{ offsetDistance: "100%", scale: [1, 1.04, 0.94, 1] }}
          transition={{
            offsetDistance: { duration: bouncePath.duration, ease: bouncePath.ease },
            scale: { duration: bouncePath.duration, times: [0, 0.45, 0.88, 1], ease: "easeInOut" },
          }}
          onAnimationComplete={handleBounceComplete}
        />
      )}
    </h1>
  );
}
