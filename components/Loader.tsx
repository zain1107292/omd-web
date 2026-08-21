"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import s from "./Loader.module.css";

/**
 * Entry sequence — brand sweep, then the curtain lifts.
 * ~1.6s total; skipped entirely for prefers-reduced-motion.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setGone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setGone(true);
      },
    });
    tl.fromTo(
      `.${s.mark} span`,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.75, stagger: 0.045, ease: "power4.out" },
      0.1
    )
      .fromTo(`.${s.tag}`, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.55)
      .to(`.${s.mark} span`, { yPercent: -115, duration: 0.55, stagger: 0.03, ease: "power3.in" }, 1.05)
      .to(`.${s.tag}`, { opacity: 0, duration: 0.3 }, 1.05)
      .to(root.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, 1.25);
    return () => {
      document.documentElement.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className={s.veil} aria-hidden>
      <div className={s.mark}>
        {"OUTMAZED".split("").map((c, i) => (
          <em key={i} className="line-mask" style={{ display: "inline-block", overflow: "hidden" }}>
            <span>{c}</span>
          </em>
        ))}
      </div>
      <div className={s.tag}>DESIGN &amp; BUILD — DUBAI</div>
    </div>
  );
}
