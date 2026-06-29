"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/lib/content";
import s from "./Hero.module.css";

type Mode = "indoor" | "outdoor";

const COPY: Record<
  Mode,
  { kicker: string; lines: { t: string; em?: boolean }[][]; sub: string }
> = {
  outdoor: {
    kicker: "Outdoor design & build · Dubai, UAE",
    lines: [[{ t: "Outdoor living," }], [{ t: "resort", em: true }, { t: " at home." }]],
    sub: "Pools, landscapes, pergolas and resort-style exteriors — engineered to turn every villa into a private retreat.",
  },
  indoor: {
    kicker: "Interior design · Dubai, UAE",
    lines: [[{ t: "Interiors that" }], [{ t: "feel like", em: true }, { t: " home." }]],
    sub: "Turnkey interiors, bespoke joinery and fit-outs — refined living spaces designed and built under one roof.",
  },
};

const SERVICE_TABS = [
  "Design & Build",
  "Turnkey Renovations",
  "Pools & Landscape",
  "Fit-Out & Joinery",
  "Project Management",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("outdoor");
  const [index, setIndex] = useState(0);
  const images = HERO[mode];
  const copy = COPY[mode];

  // autoplay
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO[mode].length),
      5200
    );
    return () => clearInterval(id);
  }, [mode]);

  // entrance
  useGSAP(
    () => {
      gsap.set(`.${s.h1} .lineInner`, { yPercent: 115 });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
      tl.to(`.${s.h1} .lineInner`, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.2)
        .to(`.${s.kicker}`, { opacity: 1, duration: 0.8 }, 0.25)
        .to(`.${s.sub}`, { opacity: 1, duration: 0.8 }, 0.7)
        .to(`.${s.actions}`, { opacity: 1, duration: 0.7 }, 0.85)
        .to(`.${s.foot}`, { opacity: 1, duration: 0.8 }, 1);
    },
    { scope: root }
  );

  // re-animate text on mode change
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${s.h1} .lineInner`,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.95, stagger: 0.08, ease: "power4.out" }
      );
      gsap.fromTo(
        [`.${s.kicker}`, `.${s.sub}`],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }
      );
    }, root);
    return () => ctx.revert();
  }, [mode]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <section ref={root} className={`${s.hero} grain`}>
      {images.map((src, i) => (
        <div
          key={mode + i}
          className={`${s.layer} ${i === index ? s.on : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className={s.scrim} />
      <div className={s.cine} />

      <div className={s.shell}>
        <nav className={s.nav}>
          <div className={s.navLinks}>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={s.logo}>
            OUT<b>MAZED</b> DESIGN
          </div>
          <a className={s.navCta} href="#contact">
            Get in touch
          </a>
        </nav>

        <div className={s.mid}>
          <span className={`${s.kicker} eyebrow`}>{copy.kicker}</span>
          <h1 className={s.h1}>
            {copy.lines.map((line, li) => (
              <span key={li} className="line-mask">
                <span className="lineInner">
                  {line.map((w, wi) =>
                    w.em ? <em key={wi}>{w.t}</em> : <span key={wi}>{w.t}</span>
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p className={s.sub}>{copy.sub}</p>
          <div className={s.actions}>
            <a className={s.primary} href="#contact">
              Start your project <span className={s.arr}>→</span>
            </a>
            <div className={s.toggle}>
              <span className={`${s.pill} ${mode === "outdoor" ? s.out : ""}`} />
              <button
                className={`${s.seg} ${mode === "indoor" ? s.active : ""}`}
                onClick={() => {
                  setMode("indoor");
                  setIndex(0);
                }}
              >
                Indoor
              </button>
              <button
                className={`${s.seg} ${mode === "outdoor" ? s.active : ""}`}
                onClick={() => {
                  setMode("outdoor");
                  setIndex(0);
                }}
              >
                Outdoor
              </button>
            </div>
          </div>
        </div>

        <div className={s.foot}>
          <div className={s.services}>
            {SERVICE_TABS.map((t) => (
              <button key={t}>{t}</button>
            ))}
          </div>
          <div className={s.controls}>
            <div className={s.counter}>
              <b>{String(index + 1).padStart(2, "0")}</b>{" "}
              <i>/ {String(images.length).padStart(2, "0")}</i>
            </div>
            <div className={s.arrows}>
              <button onClick={prev} aria-label="Previous">
                ←
              </button>
              <button onClick={next} aria-label="Next">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
