"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { HERO } from "@/lib/content";
import s from "./Hero.module.css";

type Mode = "interior" | "exterior";

// interior = warm terracotta mood · exterior = cooler copper/bronze mood
const ACCENT: Record<Mode, string> = {
  interior: "#f47a57",
  exterior: "#c98a3c",
};

const COPY: Record<Mode, { a: string; b: string }> = {
  interior: { a: "We shape the rooms", b: "you were meant to live in." },
  exterior: { a: "We shape the grounds", b: "you were meant to arrive at." },
};

const IMAGES: Record<Mode, string[]> = {
  interior: HERO.indoor,
  exterior: HERO.outdoor,
};

const VERT = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const FRAG = `
precision highp float;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform vec2 uImg0;
uniform vec2 uImg1;
uniform vec2 uRes;
uniform float uProgress;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

vec2 cover(vec2 uv, vec2 res, vec2 img){
  float rs = res.x / res.y;
  float ri = img.x / img.y;
  vec2 newSize = rs < ri ? vec2(img.x * res.y / img.y, res.y)
                         : vec2(res.x, img.y * res.x / img.x);
  vec2 offset = (rs < ri
    ? vec2((newSize.x - res.x) * 0.5, 0.0)
    : vec2(0.0, (newSize.y - res.y) * 0.5)) / newSize;
  return uv * res / newSize + offset;
}

void main(){
  vec2 par = uMouse * 0.014;                       // gentler parallax
  float drift = 0.004 * sin(uTime * 0.15);         // slow ambient breath
  float wave = sin(vUv.y * 8.0 + uTime * 0.5) * cos(vUv.x * 6.0 - uTime * 0.35);
  float amp = 0.09 * sin(uProgress * 3.14159265);

  vec2 uv0 = cover(vUv, uRes, uImg0) + par + vec2(0.0, drift) + wave * amp * (1.0 - uProgress);
  vec2 uv1 = cover(vUv, uRes, uImg1) + par + vec2(0.0, drift) - wave * amp * uProgress;

  vec3 c0 = texture2D(uTex0, uv0).rgb;
  vec3 c1 = texture2D(uTex1, uv1).rgb;

  float edge = wave * 0.10;
  float m = clamp((uProgress * 1.24 - 0.12) + edge, 0.0, 1.0);
  m = smoothstep(0.0, 1.0, m);

  gl_FragColor = vec4(mix(c0, c1, m), 1.0);
}
`;

type TexInfo = { tex: THREE.Texture; w: number; h: number };

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const copyRef = useRef<HTMLHeadingElement>(null);

  const [mode, setMode] = useState<Mode>("interior");
  const [index, setIndex] = useState(0);
  const [webglOk, setWebglOk] = useState(true);

  const modeRef = useRef<Mode>("interior");
  const ctrl = useRef<{ goTo: (url: string) => void; ready: boolean; busy: boolean }>({
    goTo: () => {},
    ready: false,
    busy: false,
  });
  const firstRun = useRef(true);

  // ---- WebGL setup ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      setWebglOk(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const cache = new Map<string, TexInfo>();
    const load = (url: string) =>
      new Promise<TexInfo>((resolve, reject) => {
        if (cache.has(url)) return resolve(cache.get(url)!);
        loader.load(
          url,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            const info = { tex, w: tex.image.width, h: tex.image.height };
            cache.set(url, info);
            resolve(info);
          },
          undefined,
          reject
        );
      });

    const uniforms = {
      uTex0: { value: null as THREE.Texture | null },
      uTex1: { value: null as THREE.Texture | null },
      uImg0: { value: new THREE.Vector2(1, 1) },
      uImg1: { value: new THREE.Vector2(1, 1) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      const dpr = Math.min(window.devicePixelRatio, 1.8);
      uniforms.uRes.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const tMouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      tMouse.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    };
    if (!reduce) window.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      uniforms.uTime.value = reduce ? 0 : clock.getElapsedTime();
      uniforms.uMouse.value.x += (tMouse.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (tMouse.y - uniforms.uMouse.value.y) * 0.05;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };

    const all = [...HERO.outdoor, ...HERO.indoor];
    load(IMAGES[modeRef.current][0])
      .then((info) => {
        uniforms.uTex0.value = info.tex;
        uniforms.uTex1.value = info.tex;
        uniforms.uImg0.value.set(info.w, info.h);
        uniforms.uImg1.value.set(info.w, info.h);
        ctrl.current.ready = true;
        loop();
        all.forEach((u) => load(u).catch(() => {}));
      })
      .catch(() => setWebglOk(false));

    ctrl.current.goTo = (url: string) => {
      if (!ctrl.current.ready || ctrl.current.busy) return;
      ctrl.current.busy = true;
      load(url)
        .then((info) => {
          uniforms.uTex1.value = info.tex;
          uniforms.uImg1.value.set(info.w, info.h);
          uniforms.uProgress.value = 0;
          gsap.to(uniforms.uProgress, {
            value: 1,
            duration: reduce ? 0.4 : 1.15,
            ease: "power2.inOut",
            onComplete: () => {
              uniforms.uTex0.value = info.tex;
              uniforms.uImg0.value.set(info.w, info.h);
              uniforms.uProgress.value = 0;
              ctrl.current.busy = false;
            },
          });
        })
        .catch(() => {
          ctrl.current.busy = false;
        });
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cache.forEach((i) => i.tex.dispose());
      mat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // trigger image transitions on slide/mode change
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    ctrl.current.goTo(IMAGES[mode][index]);
  }, [mode, index]);

  // autoplay — slow, calm
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES[mode].length), 6400);
    return () => clearInterval(id);
  }, [mode]);

  // accent shift + headline re-reveal on mode change
  useEffect(() => {
    modeRef.current = mode;
    document.documentElement.style.setProperty("--accent", ACCENT[mode]);
    const spans = copyRef.current?.querySelectorAll<HTMLElement>(".line-mask > span");
    if (spans && !firstRun.current) {
      gsap.fromTo(
        spans,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" }
      );
    }
  }, [mode]);

  // entrance + custom cursor + magnetic CTA
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.35 });
    tl.from(`.${s.nav} > *`, { y: -14, opacity: 0, duration: 0.7, stagger: 0.08 }, 0)
      .from(`.${s.eyebrow}`, { opacity: 0, y: 14, duration: 0.7 }, 0.5)
      .fromTo(
        `.${s.copy} .line-mask > span`,
        { yPercent: 115 },
        { yPercent: 0, duration: 1, stagger: 0.09, ease: "power4.out" },
        0.6
      )
      .from(`.${s.sub}`, { opacity: 0, y: 16, duration: 0.8 }, 1.1)
      .from(`.${s.cta}`, { opacity: 0, y: 18, duration: 0.8 }, 1.25)
      .from(`.${s.toggleWrap}`, { opacity: 0, y: 18, duration: 0.7 }, 1.35)
      .from(`.${s.rail}`, { opacity: 0, duration: 0.7 }, 1.45);

    if (reduce || !window.matchMedia("(min-width: 981px)").matches) return;

    // custom cursor
    const cur = curRef.current!;
    const dot = dotRef.current!;
    let cx = innerWidth / 2,
      cy = innerHeight / 2,
      dx = cx,
      dy = cy,
      rafC = 0;
    const move = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      dot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    };
    const tick = () => {
      dx += (cx - dx) * 0.18;
      dy += (cy - dy) * 0.18;
      cur.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      rafC = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    tick();

    const hov = document.querySelectorAll("[data-hov]");
    const on = () => cur.classList.add(s.big);
    const off = () => cur.classList.remove(s.big);
    hov.forEach((el) => {
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
    });

    // magnetic CTA
    const cta = ctaRef.current;
    const onCta = (e: MouseEvent) => {
      if (!cta) return;
      const r = cta.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      gsap.to(cta, { x: mx * 0.3, y: my * 0.3, duration: 0.4, ease: "power3.out" });
    };
    const outCta = () => cta && gsap.to(cta, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    cta?.addEventListener("mousemove", onCta);
    cta?.addEventListener("mouseleave", outCta);

    return () => {
      cancelAnimationFrame(rafC);
      window.removeEventListener("mousemove", move);
      cta?.removeEventListener("mousemove", onCta);
      cta?.removeEventListener("mouseleave", outCta);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = COPY[mode];
  const total = IMAGES[mode].length;

  return (
    <section className={`${s.hero} grain`}>
      <canvas ref={canvasRef} className={s.canvas} />
      {!webglOk && (
        <div className={s.fallback} style={{ backgroundImage: `url(${IMAGES[mode][index]})` }} />
      )}
      <div className={s.scrim} />

      <div className={s.shell}>
        <nav className={s.nav}>
          <div className={s.logo}>
            OUT<b>MAZED</b> DESIGN
          </div>
          <div className={s.navLinks}>
            <a href="#projects" data-hov>Projects</a>
            <a href="#services" data-hov>Services</a>
            <a href="#about" data-hov>Studio</a>
            <a href="#contact" data-hov>Contact</a>
          </div>
        </nav>

        <div className={s.stage}>
          <span className={`${s.eyebrow} eyebrow`}>
            Interior &amp; Exterior — Design &amp; Build · Dubai
          </span>
          <h1 ref={copyRef} className={s.copy}>
            <span className="line-mask">
              <span>{copy.a}</span>
            </span>
            <span className={`line-mask ${s.dim}`}>
              <span>{copy.b}</span>
            </span>
          </h1>
          <p className={s.sub}>
            One studio, from first sketch to final key — crafting the spaces you live in
            and the grounds you arrive at.
          </p>
          <a ref={ctaRef} href="#projects" className={s.cta} data-hov>
            <span>Step inside our work</span>
            <i>↓</i>
          </a>
        </div>

        <div className={s.toggleWrap}>
          <div className={`${s.toggle} ${mode === "exterior" ? s.isExt : ""}`}>
            <span className={s.pill} />
            <button
              className={mode === "interior" ? s.active : ""}
              onClick={() => {
                setMode("interior");
                setIndex(0);
              }}
              data-hov
            >
              Interior
            </button>
            <button
              className={mode === "exterior" ? s.active : ""}
              onClick={() => {
                setMode("exterior");
                setIndex(0);
              }}
              data-hov
            >
              Exterior
            </button>
          </div>
        </div>

        <div className={s.rail}>
          <span className={s.railNum}>
            {String(index + 1).padStart(2, "0")}
            <i> / {String(total).padStart(2, "0")}</i>
          </span>
          <div className={s.railTrack}>
            {IMAGES[mode].map((_, i) => (
              <button
                key={i}
                className={`${s.tick} ${i === index ? s.on : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`View ${i + 1}`}
                data-hov
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={curRef} className={s.cursor} />
      <div ref={dotRef} className={s.cursorDot} />
    </section>
  );
}
