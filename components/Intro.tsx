"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATEMENT =
  "We design, build & transform exceptional spaces — interiors, renovations, pools & landscape, delivered under one roof across the UAE.";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".word", {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        ease: "power2.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 70%",
          scrub: 1,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative overflow-hidden px-[clamp(22px,5vw,72px)] py-[clamp(90px,16vh,200px)] grain"
    >
      <span className="eyebrow relative z-[1]">Room 01 — The Majlis · where every project starts</span>
      <p className="relative z-[1] mt-8 max-w-[20ch] sm:max-w-[26ch] font-[family-name:var(--font-serif)] font-light leading-[1.14] tracking-[-0.01em] text-[clamp(30px,4.9vw,74px)]">
        {STATEMENT.split(" ").map((w, i) => (
          <span
            key={i}
            className="word inline-block opacity-15 translate-y-[0.1em] mr-[0.28em]"
          >
            {w}
          </span>
        ))}
      </p>
    </section>
  );
}
