"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Dust — a quiet field of warm amber motes drifting toward the viewer.
 * Sits absolutely behind a section; pauses when off-screen; skipped for
 * prefers-reduced-motion. Deliberately sparse (<300 points) — air, not a storm.
 */
export default function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(58, 1, 0.1, 60);
    cam.position.z = 10;

    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = Math.random() * 40 - 30;
      sz[i] = 0.5 + Math.random() * 1.8;
      sp[i] = 0.35 + Math.random() * 0.9;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(sp, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aSize;
        attribute float aSpeed;
        uniform float uTime;
        varying float vFade;
        void main(){
          vec3 p = position;
          p.z = mod(p.z + uTime * aSpeed, 40.0) - 30.0;   // drift toward camera, loop
          p.x += sin(uTime * 0.18 * aSpeed + p.y) * 0.6;   // lazy sway
          p.y += cos(uTime * 0.14 * aSpeed + p.x) * 0.35;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float d = -mv.z;
          vFade = smoothstep(30.0, 22.0, d) * smoothstep(0.4, 4.0, d);
          gl_PointSize = aSize * 42.0 / d;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vFade;
        void main(){
          float r = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.08, r) * vFade * 0.34;
          gl_FragColor = vec4(vec3(0.72, 0.33, 0.16), a);  // burnt terracotta motes on plaster
        }`,
    });
    scene.add(new THREE.Points(geo, mat));

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();
    const loop = () => {
      if (visible) {
        mat.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, cam);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
