"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row) => {
        gsap.from(row, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="services"
      className="relative px-[clamp(22px,5vw,72px)] py-[clamp(70px,12vh,150px)] border-t border-[var(--line)]"
    >
      <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <div>
          <span className="eyebrow">Our services</span>
          <h2 className="mt-4 font-[family-name:var(--font-rubik)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[clamp(34px,5.4vw,84px)]">
            Everything,
            <br />
            <em className="font-[family-name:var(--font-cormorant)] not-italic italic font-medium text-[var(--terra)]">
              under one roof.
            </em>
          </h2>
        </div>
        <p className="max-w-[360px] text-[var(--muted)] font-light leading-relaxed">
          A single, accountable team — from first concept to the final
          handover, indoors and out.
        </p>
      </div>

      <div>
        {SERVICES.map((sv) => (
          <a
            key={sv.n}
            href="#contact"
            className="svc-row group grid grid-cols-[44px_1fr] md:grid-cols-[60px_minmax(0,1.1fr)_minmax(0,1.4fr)_40px] items-center gap-x-5 gap-y-1 py-7 border-b border-[var(--line)] transition-colors hover:bg-[rgba(244,122,87,0.04)]"
          >
            <span className="font-[family-name:var(--font-rubik)] text-[var(--copper)] text-sm">
              {sv.n}
            </span>
            <h3 className="font-[family-name:var(--font-rubik)] font-semibold text-[clamp(20px,2.6vw,38px)] leading-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:text-[var(--terra)]">
              {sv.title}
            </h3>
            <p className="col-span-2 md:col-span-1 text-[var(--muted)] text-sm font-light leading-relaxed max-w-[460px]">
              <span className="text-[var(--cream)]">{sv.tag}.</span> {sv.desc}
            </p>
            <span className="hidden md:block text-right text-[var(--terra)] opacity-0 -translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
