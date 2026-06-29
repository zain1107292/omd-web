"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STATS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.v);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.firstChild!.textContent = String(Math.round(obj.n));
          },
        });
      });
      gsap.from(".stat-col", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative px-[clamp(22px,5vw,72px)] py-[clamp(70px,12vh,150px)] border-t border-[var(--line)] bg-[linear-gradient(180deg,var(--ink),var(--ink-2))]"
    >
      <span className="eyebrow">Track records</span>
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {STATS.map((st) => (
          <div key={st.label} className="stat-col">
            <div className="font-[family-name:var(--font-display)] font-extrabold leading-none text-[clamp(40px,6vw,80px)]">
              <span className="stat-num" data-v={st.v}>
                0
              </span>
              <span className="text-[var(--terra)]">{st.suffix}</span>
            </div>
            <div className="mt-3 text-xs tracking-[0.14em] uppercase text-[var(--muted)]">
              {st.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
