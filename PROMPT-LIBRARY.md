# OUTMAZED · CINEMATIC PROMPT LIBRARY

> An original, agency-grade library of copy-paste prompts for building **cinematic, non-AI-looking** web sections.
> Written for the Claude-Code era — paste any block into your AI (or hand it to a dev) and get a distinctive result, not a template.
>
> **Stack assumed:** Next.js (App Router) + GSAP + ScrollTrigger + Lenis + Three.js, deployed on Vercel.
> **Design language (edit to taste):** near-black warm ink `#14110D` · bone `#ECE3D8` · accent terracotta `#F47A57` · copper `#B87226` · sage `#3E4B3C`. Display = Archivo / General Sans (light weights). Body = Hanken Grotesk / Onest. Labels = Space Mono.
>
> **The 8 non-negotiables baked into every prompt** (the "$10K bar"): a committed point of view · type that does work (never Inter/Roboto) · 3–5 restrained colors · hierarchy that breathes · imagery with intent · motion that *whispers* (never AOS fade-up slop) · mobile *designed* not shrunk · the invisible expensive stuff (sub-2s, WCAG AA, semantic HTML, real meta).

---

## 00 · HOW TO USE

Each entry has a **name**, a **use-case**, **tags**, and a **PROMPT** block. Paste the PROMPT verbatim, then append one line of context: *"Brand = <name>, subject = <what it sells>, accent = <hex>, real content = <paste yours>."* Keep the "Never do" rules — they are what separate cinematic from generic.

Global rule to prepend to any prompt:
> Act as the design lead at a studio known for sites that could never be mistaken for a template. Make deliberate, opinionated choices. Spend all your boldness on ONE signature moment and keep everything else quiet and disciplined. Ship to a quality floor without announcing it: responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected, semantic HTML, real `<title>`/meta. Motion must whisper — orchestrated, weighty, 600ms+ for hero reveals and 150–300ms for micro-interactions. No `AOS`, no generic fade-up-on-scroll on everything.

---

## 01 · THRESHOLD — the crossing hero
**Use:** a hero that embodies a duality (indoor/outdoor, before/after, dark/light). The signature.
**Tags:** `hero` `webgl` `signature` `scroll`

```
PROMPT — THRESHOLD HERO
Build a full-viewport hero whose single idea is "crossing a threshold." The screen is split by an implied vertical seam: one world on the left, another on the right (e.g. raw exterior vs finished interior; or cool sage vs warm terracotta grade). On load, a thin luminous line draws down the centre in 900ms, then the two halves settle with a slow parallax drift that tracks the cursor (max 18px, eased at 0.05 lerp).

Composition: an oversized display headline in a LIGHT weight (300–400), set in two tones — the first clause bright bone, the second clause muted grey — so the sentence reads like a held breath resolving. Split the headline into words wrapped in overflow-hidden line masks; reveal with y:115%→0, stagger 0.08, power4.out. A single mono eyebrow above it (letter-spacing 0.4em, uppercase, accent colour). One glassy pill CTA below with a magnetic pull (translate toward cursor at 0.3 strength, spring back at 0.4s).

Motion language: no bounce, no elastic. Everything is slow and certain. A film-grain overlay at 4% opacity, a radial vignette that darkens the corners, and an ambient warm glow behind the headline that breathes (14s ease-in-out loop, scale 1↔1.04).

Interaction: a toggle (two segmented pills) that swaps the two worlds — on toggle, cross-fade the imagery over 1.2s AND shift the whole page's accent variable from warm to cool via a CSS custom property transition, so the site itself changes mood.

Never: center-everything symmetry, drop shadows on text, a stock "gradient blob" hero, numbered feature cards, or emoji. Mobile: stack the two worlds vertically with the seam becoming a horizontal rule; the toggle moves to a bottom-centred bar; disable cursor-parallax, keep the reveal.
```

---

## 02 · APERTURE — liquid image slideshow
**Use:** a photography-led hero/section where slides transition through a WebGL displacement, not a fade.
**Tags:** `hero` `webgl` `three` `slider`

```
PROMPT — APERTURE
Build a full-bleed image slideshow rendered on a single Three.js plane with a custom fragment shader. Two textures (current, next) are mixed by a `uProgress` uniform driven by GSAP (power2.inOut, 1.15s). During the transition, offset the UVs by a flowing sin/cos displacement field whose amplitude peaks at mid-transition (sin(progress*π)) so the image appears to ripple like water as it changes. Cover-fit each texture correctly for any aspect ratio. Add a subtle cursor-reactive UV parallax (max 2%).

Over the canvas: a mono slide counter (serif-italic or mono, top-right, "01 / 08"), a thin progress underline that fills over the autoplay interval, and prev/next as bordered glass circles. Ken-Burns the active frame with a very slow scale 1.07→1.18 over 9s. Auto-advance every 5.2s, pause on hover.

Keep chrome minimal — the photograph is the hero. One line of kinetic copy max. Restrained accent only on the active dot / arrows.

Never: crossfade-only transitions, a caption box with a dark rectangle behind it, or four visible arrows. Reduced-motion: swap the shader for a clean 300ms opacity crossfade and stop Ken-Burns. Mobile: full-height, tap zones left/right, hide the counter if it crowds.
```

---

## 03 · STEP INSIDE — the 360° explorer
**Use:** turn real 360°/virtual-tour content into an interactive "walk inside" experience with before/after.
**Tags:** `signature` `360` `gallery` `content`

```
PROMPT — STEP INSIDE
Build a section titled around "step inside" that embeds real 360° tours (e.g. Kuula/Matterport iframes) as the centrepiece — the viewer literally looks around the space, not at a photo. Layout: a large 16:10 rounded viewer on the left (border, deep soft shadow) and a lean vertical index of projects on the right (name in display face, location in mono uppercase, a tiny "B/A" or "360°" tag). Selecting a project lazily swaps ONLY the active iframe (key by tour id) so you never load 20 iframes at once.

If a project has both states, show a floating Before/After toggle inside the viewer's top-right; switching reloads the tour to the other state. A small pulsing "360° LIVE TOUR" mono badge sits top-left of the viewer. Below the viewer, the active project's name (display) and location (mono accent) update with a 0.25s fade-swap.

Reveal on scroll: the viewer rises 60px with opacity, the index rows stagger in from the right (x:24, stagger 0.04). One editorial two-tone headline: "Step [inside] the spaces we transform." — bracketed word in accent.

Never: a wall of autoplaying iframes, a lightbox that traps focus, or generic "our work" cards. Mobile: viewer on top, the index becomes a horizontal chip-scroller beneath it; keep the before/after toggle.
```

---

## 04 · STRATA — pinned scroll story
**Use:** tell a process/journey (design → build → deliver) as a pinned, scrubbed sequence.
**Tags:** `scroll` `pin` `storytelling` `gsap`

```
PROMPT — STRATA
Build a pinned scrollytelling section. Pin the viewport for ~300vh of scroll using ScrollTrigger (pin: true, scrub: true). Across that scroll, move through 3–4 numbered chapters (real process steps). Only ONE chapter is active at a time: as scroll progresses, the previous chapter's large index number (mono, huge, faint) morphs to the next, the chapter's headline (display, light weight) rises into place, and a supporting line (body) fades in beneath it. A thin vertical progress rail on the left fills with the accent as you descend.

Behind the text, a single quiet visual layer parallaxes at 0.3 speed (a duotone image, or a slow-drifting particle field) so there is depth without noise. Transitions between chapters use clip or mask reveals, never a hard cut. End the pin by releasing into the next section with a gentle settle.

Never: five things animating at once, a horizontal carousel pretending to be a story, or progress dots. Reduced-motion & mobile: drop the pin — render the chapters as tall, generously-spaced stacked blocks that reveal once on entry (single subtle rise, no scrub).
```

---

## 05 · LEDGER — the editorial services index
**Use:** a capabilities/services list that reads like a beautiful printed index, not feature cards.
**Tags:** `list` `editorial` `hover`

```
PROMPT — LEDGER
Present services as full-width index rows separated by hairline rules — like the contents page of an architecture monograph. Each row: a mono index number (accent/copper), the service name in a confident display weight, and a one-line description in muted body. On hover: the name slides right 8–10px and shifts to the accent colour, a trailing arrow fades in at the far right, and the row background warms by ~4%. The whole thing must feel typographic and calm.

Header of the section is a two-line statement with the second line in the accent, and a short right-aligned paragraph opposite it (asymmetric). Rows reveal on scroll with a single 60px rise, stagger 0.06 — once, not on every re-entry.

Never: shadowed cards in a 3-column grid, icons in circles, or "Learn more →" on every card. Use the numbers ONLY because a service list is a real sequence; if it isn't, drop them. Mobile: rows stack; description wraps under the name; keep the hairlines and the hover-as-tap active state.
```

---

## 06 · TALLY — the odometer stats
**Use:** track-record numbers that count with weight, not a plain fade-in.
**Tags:** `stats` `count` `scroll`

```
PROMPT — TALLY
A restrained stats band on a subtly gradiented panel. Each figure counts from 0 to target over 1.8s with power3.out easing, triggered when the band enters the viewport (top 85%). The number is set in a heavy display weight; the "+" or unit is in the accent. Labels below are mono, uppercase, small, muted. The whole band rises 40px on entry with a 0.1 stagger between columns.

Optional signature touch: as the numbers settle, a 1px accent underline draws left-to-right beneath each figure. Four columns desktop, two mobile. Keep it quiet — this section earns trust, it doesn't shout.

Never: pie charts, progress bars, or animated icons next to numbers. Reduced-motion: show final numbers immediately. Mobile: 2×2 grid, generous vertical gap.
```

---

## 07 · CHORUS — testimonial marquee
**Use:** many real testimonials, presented as a living editorial band.
**Tags:** `testimonials` `marquee` `social-proof`

```
PROMPT — CHORUS
Render testimonials as a slow, continuous horizontal marquee of quote-cards (translateX loop via GSAP, ~40s linear, pause on hover). Each card is glass over the dark base: a short pulled quote in a light display weight, the client name in mono uppercase, location muted. Duplicate the set for a seamless loop. Above the marquee, a single mono eyebrow ("What our clients say") and one confident headline.

Signature: on hover, the hovered card lifts 6px, brightens, and its accent quote-mark glyph scales up subtly; neighbours dim to 0.5 — so attention has somewhere to rest. Two rows moving in opposite directions reads richer than one.

Never: a star-rating widget, carousel dots, or avatars in perfect circles with drop shadows. Reduced-motion: freeze the marquee into a static, wrapped grid. Mobile: single row, drag-to-scroll with momentum, snap points.
```

---

## 08 · HORIZON — ambient WebGL backdrop
**Use:** a living, restrained background for a section or full page — atmosphere, not decoration.
**Tags:** `webgl` `three` `background` `ambient`

```
PROMPT — HORIZON
A full-section Three.js background: an orthographic full-screen plane with a fragment shader that renders a slow, flowing gradient built from 2D simplex noise (fbm, 3–4 octaves). Colours interpolate across only the brand palette (ink → copper → terracotta), never a rainbow. The field drifts on a time uniform (~0.06 speed) and warms slightly toward the cursor (a soft smoothstep bloom at the mouse uniform). Add a vignette in-shader and a CSS grain overlay at 4%.

It must feel like light moving through a material — expensive and calm, never a "party gradient." Cap pixel ratio at 1.8 for perf. Provide a static CSS radial-gradient fallback if WebGL fails or reduced-motion is set.

Never: neon, hard bands, lens-flares, or more than 3 hues. Mobile: keep it, but lower the noise octaves to 2 and consider pausing when off-screen.
```

---

## 09 · PULSE — the floating glass nav
**Use:** a premium navbar that feels weightless and aware of scroll.
**Tags:** `nav` `glass` `ui`

```
PROMPT — PULSE
A floating, centred pill navbar with top/left/right spacing (not stuck to the edges): glass background (blur 12px, low-opacity fill, hairline border). Links in mono or a tight display; the active link sits in a smaller inner pill. On scroll-down, the bar shrinks slightly and its blur deepens; on scroll-up it returns — smooth, spring-eased. A single glass CTA on the right with a magnetic hover.

Signature: an underline/indicator pill that slides between links on hover using GSAP Flip (measure → animate), so the highlight glides, it doesn't jump. Brand mark on the left in the display face with the accent on one letter.

Never: a full-width sticky bar with a box-shadow, a hamburger on desktop, or nav links that shift layout on hover. Mobile: collapse to a bottom-anchored floating bar or a full-screen overlay menu with staggered link reveals — designed, not a shrunk desktop nav.
```

---

## 10 · MAGNET — cursor & micro-interaction kit
**Use:** the connective tissue that makes a whole site feel hand-made.
**Tags:** `cursor` `micro` `system`

```
PROMPT — MAGNET
Build a site-wide interaction layer: (1) a custom cursor — a lerped outline ring (0.18 follow) plus an instant inner dot, mix-blend-mode: difference so it reads on any background; it grows and tints accent over anything marked data-hover. (2) Magnetic buttons/links: translate toward the cursor at 0.3 strength inside their bounds, spring back at 0.4s on leave. (3) Link hovers use a colour/opacity transition (200ms) — never a scale transform that shifts layout. (4) Images reveal with a clip-path wipe on first view, once.

Everything must be subtle enough that a designer nods rather than rolls their eyes. Disable the custom cursor and magnetism under 980px and for coarse pointers; keep default cursor and tap feedback.

Never: a laggy cursor with a long trail, buttons that balloon on hover, or global scale-on-hover. Respect prefers-reduced-motion (static cursor, no magnetism).
```

---

## 11 · VEIL — seamless page transitions
**Use:** navigating between routes without a jarring reload — the mark of an expensive site.
**Tags:** `transition` `router` `gsap`

```
PROMPT — VEIL
Implement client-side route transitions (Next.js App Router + a view-transition or a GSAP overlay). On navigate: a warm-ink panel wipes up over the current page (clip-path or transform, 0.5s power3.inOut), the route swaps behind it, then the panel wipes away to reveal the new page whose hero elements are already staggering in. Optionally paint the incoming page's key label in the centre of the veil during the crossing (like a chapter title). Keep it under 900ms total so it feels crafted, not slow.

Preserve scroll intent, keep focus management correct for a11y, and fall back to an instant swap under reduced-motion.

Never: a white flash between pages, a spinner on every navigation, or a transition longer than 1s. Mobile: same, but shorten to ~600ms.
```

---

## 12 · EMBER — the finishing layer
**Use:** the last 5% that reads as "expensive" — grain, vignette, depth, focus glow.
**Tags:** `polish` `overlay` `detail`

```
PROMPT — EMBER
Add a global finishing layer: (1) a fixed SVG-noise film grain at 4–6% opacity, overlay blend, pointer-events none. (2) A gentle radial vignette darkening the corners of dark sections. (3) Section-entry "settle": headings arrive with a 6px rise + a 6px→0 blur clear (not a plain fade). (4) A branded selection colour and a slim accent scrollbar. (5) Focus-visible rings in the accent for keyboard users. (6) A tasteful loader on first paint that is part of the art direction (a thin progress line under the wordmark), then fades — never a generic spinner.

These are felt, not seen. Do not overdo grain (it should never texture the type). Reduced-motion removes the blur-clear and loader animation, keeps the grain/vignette static.
```

---

## APPENDIX · NAMING & CADENCE
Name sections with a single evocative word (THRESHOLD, APERTURE, STRATA, HORIZON…) — it forces a concept and reads like a system, not a pile of components. Ship in this order for a launch: **PULSE → THRESHOLD → STEP INSIDE → LEDGER → STRATA → TALLY → CHORUS → EMBER**, wiring **MAGNET** and **VEIL** as global layers throughout.

_Original work — © OutMazed. Reuse across projects freely; do not resell as a library._
