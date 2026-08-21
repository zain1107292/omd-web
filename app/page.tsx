import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Work from "@/components/Work";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import StepInside from "@/components/StepInside";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <Intro />
      <Work />
      <Services />
      <StepInside />
      <Stats />

      <section
        id="contact"
        className="relative px-[clamp(22px,5vw,72px)] py-[clamp(90px,18vh,220px)] border-t border-[var(--line)] text-center grain"
      >
        <span className="eyebrow">Room 06 — The Keys</span>
        <h2 className="mx-auto mt-6 max-w-[18ch] font-[family-name:var(--font-serif)] font-light leading-[1.02] tracking-[-0.01em] text-[clamp(40px,7vw,110px)]">
          The last room is yours.{" "}
          <em className="font-[family-name:var(--font-serif)] italic font-light text-[var(--terra)]">
            Collect the keys.
          </em>
        </h2>
        <a
          href="mailto:info@outmazeddesign.com"
          className="inline-flex items-center gap-3 mt-12 bg-[var(--terra)] text-[#1c0e07] px-9 py-5 rounded-full text-sm font-medium"
        >
          Book a site visit →
        </a>
        <footer className="mt-24 pt-8 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted)] tracking-wider">
          <span>© 2026 OutMazed® Design — Dubai, UAE</span>
          <span>info@outmazeddesign.com · +971 (0) 4 339 9683</span>
        </footer>
      </section>
    </main>
  );
}
