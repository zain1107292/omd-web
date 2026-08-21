"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/projects";
import s from "./Work.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Editorial drift: 9 frames, every 4th goes full-bleed as a palette cleanser
const FEATURED = PROJECTS.slice(0, 9);

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // each frame: image drifts slower than scroll (parallax) + soft reveal
      gsap.utils.toArray<HTMLElement>(`.${s.frame}`).forEach((frame) => {
        const img = frame.querySelector("img");
        gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.12 },
          {
            yPercent: 10,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from(frame, {
          y: 70,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 88%" },
        });
      });

      // headline sweep
      gsap.from(`.${s.head} .line-mask > span`, {
        yPercent: 115,
        duration: 1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: `.${s.head}`, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className={s.section}>
      <header className={s.head}>
        <span className="eyebrow">Room 02 — The Gallery</span>
        <h2 className={s.title}>
          <span className="line-mask"><span>Spaces we have</span></span>
          <span className={`line-mask ${s.dim}`}><span>already transformed.</span></span>
        </h2>
      </header>

      <div className={s.flow}>
        {FEATURED.map((p, i) => {
          const wide = i % 4 === 3; // every 4th frame goes full-bleed
          return (
            <a
              key={p.slug}
              href="#projects"
              className={`${s.frame} ${wide ? s.wide : i % 2 ? s.right : s.left}`}
              data-hov
            >
              <figure className={s.media}>
                <img src={p.banner} alt={`${p.name} — ${p.scope}`} decoding="async" />
              </figure>
              <figcaption className={s.meta}>
                <span className={s.idx}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.name}>{p.name}</span>
                <span className={s.scope}>{p.scope}</span>
              </figcaption>
              {wide && <span className={s.ghost}>{p.name}</span>}
            </a>
          );
        })}
      </div>

      <a href="#projects" className={s.all} data-hov>
        All {PROJECTS.length} projects — walk through them in 360° ↓
      </a>
    </section>
  );
}
