# OUTMAZED · REAL-ESTATE / DESIGN-&-BUILD PROMPT PACK

> A focused, agency-grade pack of copy-paste prompts for building **cinematic property, construction, and interior-design web sections** — the kind that sell a $2M Dubai villa, not the kind that look AI-generated.
>
> GetLayers has **zero** real-estate/construction templates (their catalog is fintech, AI/SaaS, cosmic particles, portfolios). This pack fills that gap — the concept DNA is drawn from the few *transferable* GetLayers ideas (Lumora's near-black studio calm, Colonnade's architectural column reveal, Kai Nomura's hushed gallery drift, Mirror Hall's reflective carousel, Halcyon Gate's golden-hour luxury), then rebuilt for **interior + exterior design & build** with one thing GetLayers can never offer: **real 360° walkthroughs.**
>
> **Stack assumed:** Next.js (App Router) + GSAP + ScrollTrigger + Lenis + Three.js, deployed on Vercel.
> **Design language (OutMazed):** warm near-black `#14110D` · bone `#ECE3D8` · muted `#9A8D7E` · terracotta accent `#F47A57` · copper `#C98A3C` · sage `#3E4B3C`. Display = Archivo (light). Body = Hanken Grotesk. Labels = Space Mono.
> **Brand:** OutMazed Design · Dubai · "Inspiring Everyday" · interior + exterior design, fit-out & build.

---

## 00 · HOW TO USE

Paste any PROMPT block verbatim, then append one line:
> *Brand = OutMazed Design, subject = luxury interior + exterior design & build (Dubai), accent = #F47A57, real content = <paste your projects/copy/tour IDs>.*

**Global rule — prepend to every prompt:**
> Act as the design lead at a studio whose property sites are mistaken for architecture monographs, never templates. This is a **design-&-build** company — every section must prove *craft and calm*, not hype. Spend all boldness on ONE signature moment per section; keep everything else disciplined and quiet. Motion whispers: 600ms+ for hero/section reveals, 150–300ms for micro-interactions, weighty easing (power3/power4.out), no bounce, no elastic, no `AOS`, no generic fade-up-on-everything. Ship to a silent quality floor: responsive down to 360px (designed, not shrunk), visible keyboard focus, `prefers-reduced-motion` fully honored, semantic HTML, real `<title>`/OG meta, sub-2s LCP. Photography is the hero — type and motion serve it.

**The 8 non-negotiables (the "$10K bar"):** committed POV · type that works (never Inter/Roboto) · 3–5 restrained colors · hierarchy that breathes · imagery with intent · motion that whispers · mobile *designed* · the invisible expensive stuff.

---

## 01 · THRESHOLD — the "step across" hero
**Use:** the opening frame. Embodies the studio's core duality — *raw shell → finished home*, or *exterior → interior*. The signature.
**Tags:** `hero` `webgl` `signature` `scroll` · *DNA: Lumora near-black calm + Halcyon Gate golden stillness*

```
PROMPT — THRESHOLD HERO
Build a full-viewport hero for a luxury design-&-build studio whose single idea is "crossing the threshold from raw space to finished home." Near-black warm background (#14110D). A single wide project photograph fills the frame, but it is revealed through a WebGL liquid-displacement transition: on load the image resolves from a soft blur-and-noise dissolve over 1100ms (2D simplex-noise displacement, cover-fit UV, no visible seams). Then a slow, near-imperceptible ambient drift (scale 1→1.03 over 20s ease-in-out loop) keeps it alive.

Type: an oversized display headline in a LIGHT weight (300), two-tone — first clause bright bone (#ECE3D8), second clause muted (#9A8D7E) — reading like a held breath resolving, e.g. "We build the spaces / you were meant to live in." Split into words in overflow-hidden line masks; reveal y:115%→0, stagger 0.08, power4.out, starting only after the image resolves. One Space-Mono eyebrow above (uppercase, letter-spacing 0.4em, terracotta). One glassy pill CTA with a magnetic pull (translate toward cursor at 0.3 strength, spring back 0.4s).

Signature moment: a segmented two-pill toggle — "Interior / Exterior" — that swaps the hero image via the same liquid-displacement shader (1.2s) AND shifts a global --accent CSS variable warm↔cool so the whole page changes mood. Custom terracotta cursor dot that scales on interactive hover.

Never: center-everything symmetry, text drop-shadows, stock gradient-blob backgrounds, numbered feature cards, emoji, carousel dots in the hero. Mobile (≤768px): disable cursor-parallax and magnetic CTA, keep the displacement reveal, move the toggle to a bottom-centered bar, headline scales with clamp(). Reduced-motion: swap displacement for a 400ms opacity fade, kill the ambient drift.
```

---

## 02 · STEP INSIDE — the 360° signature
**Use:** the section GetLayers can *never* build — real interactive walkthroughs of finished projects.
**Tags:** `signature` `360` `kuula` `interactive` · *DNA: original — this is OutMazed's moat*

```
PROMPT — STEP INSIDE (360° EXPLORER)
Build a section titled "Step inside the spaces we transform." It embeds real 360° panoramic tours (Kuula iframes) as the centerpiece — treat the tour as a living object, not a gallery afterthought.

Layout: a large 16:10 tour stage on a near-black stage with a thin bone hairline frame (1px, rgba bone 0.13) and generous negative space around it — like a framed artwork in a gallery. To the left, a vertical list of project names (Space Mono, small caps) acting as the selector; the active one is terracotta with a short animated underline that draws in on select (scaleX 0→1, transform-origin left, 400ms). Above the stage, a "◑ Before / After" ghost toggle.

Behavior: lazy-load the iframe (only mount when scrolled into view; key the iframe by tourId so switching projects hard-swaps cleanly). While a tour loads, show a subtle skeleton shimmer over the stage, not a spinner. On project change, cross-dissolve the stage 500ms. A small "drag to look around ↺" hint fades in on first load and fades out on first interaction. Optional caption strip below: project name · location · scope (design+build / fit-out / exterior).

Motion: the whole section pins briefly and the stage scales from 0.94→1 as it enters (ScrollTrigger scrub, power2.out) so entering the section feels like stepping up to the glass. Never autoplay audio. Never stack more than one iframe live at a time (perf).

Never: tiny thumbnail-sized tours, more than one active iframe, a spinner, autoplay motion inside the panorama beyond Kuula's own auto-rotate. Mobile: selector becomes a horizontal scroll-snap chip row above the stage; stage goes full-width 4:3; keep before/after toggle; disable the pin-scale. Reduced-motion: no scale, instant mount.
```

---

## 03 · COLONNADE — the spaces walkthrough
**Use:** reveal the range of what you design (living, kitchen, majlis, facade, landscape, pool) as an architectural column accordion.
**Tags:** `section` `interactive` `hover` `editorial` · *DNA: Colonnade (GetLayers) — reborn for rooms*

```
PROMPT — COLONNADE SPACES
Build an interactive horizontal accordion of tall vertical "columns," one per space type a design-&-build studio delivers (e.g. Living · Kitchen · Majlis · Bath · Facade · Landscape). It should read like walking a colonnade — a row of architectural bays you brush past.

Each column is a floor-to-frame vertical panel showing a cropped project photo under a warm graded overlay; a Space-Mono label runs vertically up the closed column. On hover (desktop), the hovered column eases open to ~2.4x width (flex-grow transition, 700ms power3.out) while neighbors compress; its photo un-crops and de-saturates-to-full-color, its label rotates to horizontal, and a one-line description + "View projects →" fade up inside. Only one open at a time; a continuous, conveyor-like feel as focus moves.

Palette stays disciplined: near-black gaps between columns (the "shadow" between pillars), bone text, terracotta only on the active label and link. Subtle inner shadow on closed columns to imply depth/recession.

Never: equal static grid of cards, drop-shadow card lift, more than 6 columns (crowds on desktop), icons instead of photography. Mobile: convert to a vertical scroll-snap stack where each space is a full-width tall panel that reveals its caption on scroll-into-view (no hover); label horizontal. Reduced-motion: instant open on focus/tap, no width tween.
```

---

## 04 · TRANSFORM — the before/after reveal
**Use:** prove the "build" half. A cinematic before→after that isn't a cheesy slider.
**Tags:** `interactive` `proof` `signature` · *DNA: original, elevated from the tired comparison-slider*

```
PROMPT — TRANSFORM (BEFORE / AFTER)
Build a before/after project reveal that feels cinematic, not like a stock comparison slider. Full-bleed project photo, near-black surround. Instead of a draggable handle bar, use a soft vertical WIPE driven by scroll: as the section scrolls through its pinned range, a feathered mask sweeps left→right converting the raw "before" (desaturated, cooler, construction state) into the finished "after" (full warmth, styled). The wipe edge carries a faint 1px terracotta light-line and a subtle displacement ripple so it reads as a reveal, not a curtain.

Anchored type: a small Space-Mono ledger in the corner counting the transformation — e.g. "BEFORE ▸ AFTER" with the project's key stat animating (a split-flap or count-up: 12 weeks · 3,400 sqft) synced to wipe progress. Optional user override: a draggable handle appears after the auto-wipe completes so they can scrub back.

Motion: the wipe is scrubbed to scroll (not time), power1.inOut on the mask. Photo has a gentle 1.02 parallax between the two states. No hard cut.

Never: a chunky center handle with circular grip as the ONLY mechanic, watermarked stock "before" images, a jarring instant swap. Mobile: replace scroll-wipe with a full-width tap-and-hold "hold to reveal after" or a simple 2-frame crossfade on scroll; keep the ledger. Reduced-motion: show after by default with a small "view before" toggle.
```

---

## 05 · PORTFOLIO DRIFT — the works gallery
**Use:** the project index — many projects, browsed like a curated monograph.
**Tags:** `gallery` `scroll` `editorial` · *DNA: Kai Nomura hushed drift + Mirror Hall reflective carousel*

```
PROMPT — PORTFOLIO DRIFT
Build a projects gallery that drifts past like pages of a hushed monograph, not a masonry grid. Two-column asymmetric rhythm: large project frames alternate left/right down the page with big negative space, each entering with a slow y-parallax (images move slightly slower than scroll via ScrollTrigger scrub) so the page breathes as it moves. Each project: oversized image, a thin Space-Mono index number (01 / 02…), project name in light display, and a one-line scope tag (Design + Build · Villa · Emirates Hills).

Hover (desktop): the image lifts imperceptibly (scale 1.02, 600ms) and un-crops slightly; a terracotta "Open ↗" tag fades in; the custom cursor grows into a "VIEW" pill. Every 3rd project spans full-bleed as a palette-cleanser with the name overlaid in large type.

Optional signature footer to this section: an infinite horizontal reflective carousel of extra shots ("Mirror Hall" style) — image cards on a near-black reflective floor, their light rippling below, draggable with inertia — as a "more spaces" strip.

Never: uniform 3-col card grid, hover drop-shadows, "Load more" spinner buttons mid-flow, hard-cropped square thumbnails everywhere. Mobile: single column, full-width frames, parallax reduced to 6px, cursor effects off, carousel becomes scroll-snap. Reduced-motion: no parallax, no scale — just clean stacked frames.
```

---

## 06 · THE METHOD — process ledger
**Use:** explain how a design-&-build engagement works (Consult → Design → Build → Handover) with authority.
**Tags:** `process` `scroll` `pinned` `editorial` · *DNA: Roadmap Ascent milestone spine, calmed down*

```
PROMPT — THE METHOD (PROCESS LEDGER)
Build a pinned process section that reads like a confident ledger of how the studio works: 4–5 stages (Consult · Concept & 3D · Design Development · Build & Fit-out · Handover). As the section pins and the user scrolls, a single glowing node glides down a thin vertical spine on the left, lighting each stage in turn; the active stage's number (Space Mono, large) and its short paragraph slide in from the right and hold, the previous one dimming to 30% rather than leaving.

Each stage carries one supporting detail that animates on activation — a count-up (e.g. "48-hr concept turnaround"), or a small line-draw diagram (SVG stroke-dashoffset draw-in, 800ms). Terracotta marks only the *active* node and its key number; everything else is bone/muted. The spine itself draws in as you scroll (scaleY origin-top).

Motion: node position and stage activation are scrubbed to scroll, not autoplaying, so the user controls the pace. Snap gently to each stage.

Never: horizontal step-cards with numbered circles and connecting dashed lines (the generic default), icon-per-step clipart, all stages visible and equally weighted at once. Mobile: unpin — vertical timeline with the node spine on the left margin, stages stacked, each revealing on scroll-into-view. Reduced-motion: static timeline, all stages at full opacity, no node glide.
```

---

## 07 · GROUNDS — the exterior / landscape moment
**Use:** the "exterior" half of the promise — facades, pools, landscape — with golden-hour luxury calm.
**Tags:** `webgl` `mood` `ambient` · *DNA: Halcyon Gate + Gilded Gyre golden-hour stillness*

```
PROMPT — GROUNDS (EXTERIOR MOOD)
Build a wide, calm exterior-focused section that feels like golden hour holding still. A full-bleed exterior project image (villa facade / pool / landscaped grounds) sits under a warm graded wash; over it, a very restrained WebGL ambient layer — slow drifting light-motes / heat-shimmer at the horizon (low count, <400 particles, warm amber, additive blend, gentle upward drift) — never busy, just breathing air. A soft radial glow tracks slowly across the image on a long loop, like the sun moving.

Type: a single quiet statement, large and light, left-aligned in bone, e.g. "The outside is the first room." One Space-Mono sub-line. No buttons competing for attention — maybe one underlined text link.

Motion: everything is slow (10–20s loops), low amplitude. The particle layer parallax-drifts a few px with scroll. This section is a breath between louder ones.

Never: a particle storm, neon colors, a video with a play button, hero-sized CTAs, cosmic/space vibes (this is architecture, not sci-fi). Mobile: drop the WebGL particles for a static warm-graded image + CSS radial glow; keep the statement. Reduced-motion: static image, no particles, no glow travel.
```

---

## 08 · INVITATION — the contact close
**Use:** the ending. A confident, warm invitation to start a project — not a cold form.
**Tags:** `contact` `close` `form` · *DNA: original — calm confidence over conversion-panic*

```
PROMPT — INVITATION (CONTACT CLOSE)
Build a closing contact section that invites rather than harvests. Near-black, huge negative space. A single oversized line in light display, left-aligned, that completes on scroll: "Let's design / where you'll live." Below it, one Space-Mono line with the studio's Dubai address and a real phone/WhatsApp link.

The form is minimal and warm: 3 fields max (name · contact · "tell us about your space"), no boxes-everywhere — use underline-only inputs that grow a terracotta baseline on focus (scaleX 0→1, 300ms) and a floating-label lift. The submit is a magnetic pill that, on hover, reveals a subtle terracotta fill wipe (left→right, 400ms). On successful submit, don't just toast — animate the whole form gently up and out and replace it in place with a warm one-line confirmation ("We'll be in touch within a day.").

Ambient: a faint warm glow behind the headline that breathes (14s loop). Optional: the OutMazed monogram drawn as an SVG stroke that completes as the section enters.

Never: a walled 6-field form with a captcha wall up front, red asterisks everywhere, a "SUBMIT" button in a hard rectangle, newsletter-popup energy. Mobile: fields full-width stacked, magnetic disabled, keep underline-focus + confirm animation. Reduced-motion: no glow breathing, instant field focus, simple fade to confirmation.
```

---

## RECOMMENDED PAGE ORDER

`01 THRESHOLD` → `02 STEP INSIDE` (signature early, hook them) → `03 COLONNADE` → `05 PORTFOLIO DRIFT` → `04 TRANSFORM` (proof) → `07 GROUNDS` (exterior breath) → `06 THE METHOD` → `08 INVITATION`.

**Global layers (site-wide):** custom terracotta cursor · Lenis smooth scroll · a floating glass pill nav that shrinks on scroll · film-grain + vignette overlay at 3–4% · `--accent` CSS variable that warms/cools with the Interior/Exterior toggle.

**Why this beats a GetLayers premium prompt for OutMazed:** it's tailored to *design & build* (both halves), it's tuned to a Dubai luxury audience, and it's built around a moat GetLayers has no equivalent for — **real 360° walkthroughs of your actual finished projects.**
