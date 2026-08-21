"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/projects";
import { scrollBus } from "@/lib/scrollBus";
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

      // CONTINUOUS scroll cinema (Codrops recipe): everything scrubbed, nothing fire-once.
      gsap.utils.toArray<HTMLElement>(`.${s.frame}`).forEach((frame) => {
        const img = frame.querySelector("img");
        const media = frame.querySelector(`.${s.media}`);
        // image drifts slower than scroll + settles from a zoom as it crosses the viewport
        gsap.fromTo(
          img,
          { yPercent: -9, scale: 1.28 },
          {
            yPercent: 9,
            scale: 1.06,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        // the frame's mask opens with your finger — scrubbed, reversible
        gsap.fromTo(
          media,
          { clipPath: "inset(14% 8% 14% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 96%", end: "top 40%", scrub: 0.4 },
          }
        );
      });

      // velocity skew — the page bends with scroll speed, settles at rest
      const medias = gsap.utils.toArray<HTMLElement>(`.${s.media}`);
      const skewTo = medias.map((m) => gsap.quickTo(m, "skewY", { duration: 0.5, ease: "power3.out" }));
      const clamp = gsap.utils.clamp(-4.5, 4.5);
      const tick = () => {
        const sk = clamp(scrollBus.v * 0.045);
        skewTo.forEach((fn) => fn(sk));
      };
      gsap.ticker.add(tick);
      const cleanup = () => gsap.ticker.remove(tick);
      window.addEventListener("beforeunload", cleanup);

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
