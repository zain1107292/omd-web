"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { scrollBus } from "@/lib/scrollBus";
import s from "./Marquee.module.css";

const PHRASE = "Design — Build — Transform — Dubai — ";

/**
 * Velocity marquee — a plaster-embossed serif band that drifts on its own and
 * surges with scroll speed. Constant life between rooms.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    const half = () => track.scrollWidth / 2;
    const tick = () => {
      const surge = gsap.utils.clamp(-10, 10, scrollBus.v * 0.12);
      x -= 0.55 + surge; // base drift + velocity surge (direction-aware)
      const h = half();
      if (x <= -h) x += h;
      if (x > 0) x -= h;
      track.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const row = PHRASE.repeat(4);
  return (
    <div className={s.band} aria-hidden>
      <div ref={trackRef} className={s.track}>
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}
