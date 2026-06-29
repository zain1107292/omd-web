"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
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
  vec2 par = uMouse * 0.02;
  float wave = sin(vUv.y * 9.0 + uTime * 0.6) * cos(vUv.x * 7.0 - uTime * 0.4);
  float amp = 0.10 * sin(uProgress * 3.14159265);

  vec2 uv0 = cover(vUv, uRes, uImg0) + par + wave * amp * (1.0 - uProgress);
  vec2 uv1 = cover(vUv, uRes, uImg1) + par - wave * amp * uProgress;

  vec3 c0 = texture2D(uTex0, uv0).rgb;
  vec3 c1 = texture2D(uTex1, uv1).rgb;

  float edge = wave * 0.12;
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

  const [mode, setMode] = useState<Mode>("outdoor");
  const [index, setIndex] = useState(0);
  const [webglOk, setWebglOk] = useState(true);

  const ctrl = useRef<{
    goTo: (url: string) => void;
    ready: boolean;
    busy: boolean;
  }>({ goTo: () => {}, ready: false, busy: false });
  const firstRun = useRef(true);

  // ---- WebGL setup ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
            const info = {
              tex,
              w: tex.image.width,
              h: tex.image.height,
            };
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
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
    });
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
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.x += (tMouse.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (tMouse.y - uniforms.uMouse.value.y) * 0.05;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };

    // preload everything, show first
    const all = [...HERO.outdoor, ...HERO.indoor];
    load(HERO[mode][0])
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
            duration: 1.15,
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

  // trigger transitions on slide/mode change
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    ctrl.current.goTo(HERO[mode][index]);
  }, [mode, index]);

  // autoplay
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO[mode].length),
      5400
    );
    return () => clearInterval(id);
  }, [mode]);

  // entrance + custom cursor
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.25 });
    tl.from(`.${s.nav} > *`, { y: -14, opacity: 0, duration: 0.7, stagger: 0.1 }, 0)
      .to(`.${s.item}`, { x: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, 0.3)
      .from(`.${s.counter}`, { opacity: 0, y: -10, duration: 0.6 }, 0.5)
      .from(`.${s.toggle}`, { opacity: 0, y: 20, duration: 0.7 }, 0.7)
      .from([`.${s.arrows}`, `.${s.dots}`], { opacity: 0, duration: 0.7 }, 0.8);

    if (window.matchMedia("(min-width: 981px)").matches) {
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
      return () => {
        cancelAnimationFrame(rafC);
        window.removeEventListener("mousemove", move);
      };
    }
  }, []);

  const next = () => setIndex((i) => (i + 1) % HERO[mode].length);
  const prev = () => setIndex((i) => (i - 1 + HERO[mode].length) % HERO[mode].length);
  const total = HERO[mode].length;

  return (
    <section className={s.hero}>
      <canvas ref={canvasRef} className={s.canvas} />
      {!webglOk && (
        <div
          className={s.fallback}
          style={{ backgroundImage: `url(${HERO[mode][index]})` }}
        />
      )}
      <div className={s.scrim} />

      <div className={s.shell}>
        <nav className={s.nav}>
          <div className={s.navLinks}>
            <a href="#about" data-hov>About</a>
            <a href="#projects" data-hov>Projects</a>
            <a href="#services" data-hov>Services</a>
            <a href="#contact" data-hov>Contact</a>
          </div>
          <div className={s.logo}>
            OUT<b>MAZED</b> DESIGN
          </div>
          <div className={s.menuBtn} data-hov>
            Menu <span />
          </div>
        </nav>

        <div className={s.menu}>
          {STEPS.map((t) => (
            <a key={t} href="#services" className={s.item} data-hov>
              {t}
            </a>
          ))}
        </div>

        <div className={s.counter}>
          <b>{String(index + 1).padStart(2, "0")}</b>{" "}
          <i>/ {String(total).padStart(2, "0")}</i>
        </div>

        <div className={s.dots}>
          {HERO[mode].map((_, i) => (
            <button
              key={i}
              className={`${s.dot} ${i === index ? s.active : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              data-hov
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
            data-hov
          >
            INDOOR
          </button>
          <button
            className={`${s.seg} ${mode === "outdoor" ? s.active : ""}`}
            onClick={() => {
              setMode("outdoor");
              setIndex(0);
            }}
            data-hov
          >
            OUTDOOR
          </button>
        </div>

        <div className={s.arrows}>
          <button onClick={prev} aria-label="Previous" data-hov>←</button>
          <button onClick={next} aria-label="Next" data-hov>→</button>
        </div>
      </div>

      <div ref={curRef} className={s.cursor} />
      <div ref={dotRef} className={s.cursorDot} />
    </section>
  );
}
