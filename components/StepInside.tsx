"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { KUULA_PROJECTS, kuulaEmbed } from "@/lib/kuula";
import s from "./StepInside.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Mode = "before" | "after";

export default function StepInside() {
  const root = useRef<HTMLElement>(null);

  // projects with a valid tour; pairs (before+after) first
  const projects = useMemo(
    () =>
      KUULA_PROJECTS.filter((p) => p.primary)
        .map((p) => ({ ...p, name: p.name.replace(/[&/]+\s*$/, "").trim() || "Project" }))
        .sort(
          (a, b) =>
            (b.before && b.after ? 1 : 0) - (a.before && a.after ? 1 : 0)
        ),
    []
  );

  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>("after");
  const p = projects[active];
  const hasPair = !!(p?.before && p?.after);
  const tourId =
    mode === "after"
      ? p?.after || p?.primary
      : p?.before || p?.primary;

  useGSAP(
    () => {
      gsap.from(`.${s.viewerWrap}`, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(`.${s.proj}`, {
        x: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${s.list}`, start: "top 85%" },
      });
    },
    { scope: root }
  );

  if (!p) return null;

  return (
    <section ref={root} id="projects" className={s.section}>
      <div className={s.head}>
        <h2 className={s.title}>
          Step <em>inside</em> the spaces we transform.
        </h2>
        <p className={s.lede}>
          Not photos to scroll past — real 360° walkthroughs of our projects
          across the UAE. Look around. See the before, and the after.
        </p>
      </div>

      <div className={s.layout}>
        <div className={s.viewerWrap}>
          <div className={s.viewer}>
            <span className={s.badge360}>
              <i /> 360° Live Tour
            </span>
            {hasPair && (
              <div className={s.ba}>
                <button
                  className={mode === "before" ? s.on : ""}
                  onClick={() => setMode("before")}
                >
                  Before
                </button>
                <button
                  className={mode === "after" ? s.on : ""}
                  onClick={() => setMode("after")}
                >
                  After
                </button>
              </div>
            )}
            <iframe
              key={tourId}
              src={kuulaEmbed(tourId)}
              loading="lazy"
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
              title={`${p.name} 360 tour`}
            />
          </div>
          <div className={s.meta}>
            <span className={s.metaName}>{p.name}</span>
            {p.location && <span className={s.metaLoc}>{p.location}</span>}
          </div>
        </div>

        <div className={s.list}>
          {projects.map((proj, i) => (
            <button
              key={proj.allIds[0]}
              className={`${s.proj} ${i === active ? s.active : ""}`}
              onClick={() => {
                setActive(i);
                setMode(proj.after ? "after" : "before");
              }}
            >
              <span className={s.projName}>{proj.name}</span>
              {proj.location && (
                <span className={s.projLoc}>{proj.location}</span>
              )}
              <span className={s.projTag}>
                {proj.before && proj.after ? "B/A" : "360°"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
