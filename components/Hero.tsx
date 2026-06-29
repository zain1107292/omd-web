"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/lib/content";
import s from "./Hero.module.css";

type Mode = "indoor" | "outdoor";

const STEPS = [
  "Design & Build",
  "Turnkey Renovations",
  "Pools & Landscape",
  "Fit-Out & Joinery",
  "Civil Construction",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("outdoor");
  const [index, setIndex] = useState(0);
  const images = HERO[mode];

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO[mode].length),
      5200
    );
    return () => clearInterval(id);
  }, [mode]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
      tl.from(`.${s.nav} > *`, { y: -14, opacity: 0, duration: 0.7, stagger: 0.1 }, 0)
        .to(`.${s.item}`, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.3)
        .from(`.${s.counter}`, { opacity: 0, y: -10, duration: 0.6 }, 0.5)
        .from(`.${s.toggle}`, { opacity: 0, y: 20, duration: 0.7 }, 0.7)
        .from([`.${s.arrows}`, `.${s.dots}`], { opacity: 0, duration: 0.7 }, 0.8);
    },
    { scope: root }
  );

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <section ref={root} className={s.hero}>
      {images.map((src, i) => (
        <div
          key={mode + i}
          className={`${s.layer} ${i === index ? s.on : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className={s.scrim} />

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
          <div className={s.menuBtn}>
            Menu <span />
          </div>
        </nav>

        <div className={s.menu}>
          {STEPS.map((t) => (
            <a key={t} href="#services" className={s.item}>
              {t}
            </a>
          ))}
        </div>

        <div className={s.counter}>
          <b>{String(index + 1).padStart(2, "0")}</b>{" "}
          <i>/ {String(images.length).padStart(2, "0")}</i>
        </div>

        <div className={s.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${s.dot} ${i === index ? s.active : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className={s.toggle}>
          <span className={`${s.pill} ${mode === "outdoor" ? s.out : ""}`} />
          <button
            className={`${s.seg} ${mode === "indoor" ? s.active : ""}`}
            onClick={() => {
              setMode("indoor");
              setIndex(0);
            }}
          >
            INDOOR
          </button>
          <button
            className={`${s.seg} ${mode === "outdoor" ? s.active : ""}`}
            onClick={() => {
              setMode("outdoor");
              setIndex(0);
            }}
          >
            OUTDOOR
          </button>
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
    </section>
  );
}
