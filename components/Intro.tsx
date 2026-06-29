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
      className="relative px-[clamp(22px,5vw,72px)] py-[clamp(90px,16vh,200px)] grain"
    >
      <span className="eyebrow">What we do</span>
      <p className="mt-8 max-w-[20ch] sm:max-w-[26ch] font-[family-name:var(--font-rubik)] font-semibold leading-[1.08] tracking-[-0.02em] text-[clamp(28px,4.6vw,68px)]">
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
