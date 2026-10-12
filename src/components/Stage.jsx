import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib.js";
import { links } from "../data.js";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";

const FRAME_COUNT = 150;

export default function Stage() {
  const root = useRef(null);
  const canvas = useRef(null);
  const counter = useRef(null);

  useLayoutEffect(() => {
    const element = canvas.current;
    const context = element.getContext("2d", { alpha: false });
    const frames = new Map();
    const state = { progress: 0, drawn: -1 };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let disposed = false;

    const drawFrame = (index) => {
      const image = frames.get(index);
      if (!image?.complete || !image.naturalWidth) return;

      const width = element.width;
      const height = element.height;
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      context.drawImage(
        image,
        (width - imageWidth) / 2,
        (height - imageHeight) / 2,
        imageWidth,
        imageHeight,
      );
      state.drawn = index;
      if (counter.current) {
        counter.current.textContent = `${String(index + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
      }
    };

    const loadFrame = (index) => {
      if (index < 0 || index >= FRAME_COUNT || frames.has(index)) return;

      const image = new Image();
      frames.set(index, image);
      image.onload = () => {
        if (disposed) return;
        if (Math.round(state.progress * (FRAME_COUNT - 1)) === index)
          drawFrame(index);
        const currentIndex = Math.round(state.progress * (FRAME_COUNT - 1));
        for (const cachedIndex of frames.keys()) {
          if (Math.abs(cachedIndex - currentIndex) > 5)
            frames.delete(cachedIndex);
        }
      };
      image.onerror = () => {
        console.error(
          `Unable to load animation frame: /frames/f${String(index + 1).padStart(3, "0")}.jpg`,
        );
        frames.delete(index);
      };
      image.src = `/frames/f${String(index + 1).padStart(3, "0")}.jpg`;
    };

    const resizeCanvas = () => {
      const bounds = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(bounds.width * dpr);
      element.height = Math.round(bounds.height * dpr);
      const index = Math.round(state.progress * (FRAME_COUNT - 1));
      if (frames.has(index)) drawFrame(index);
    };

    loadFrame(0);
    if (!reduceMotion) loadFrame(1);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let timeline;
    let ticker;
    if (!reduceMotion) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=380%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            state.progress = trigger.progress;
            const index = Math.round(state.progress * (FRAME_COUNT - 1));
            loadFrame(index);
            loadFrame(index - 1);
            loadFrame(index + 1);
            loadFrame(index + 2);
            if (index !== state.drawn) drawFrame(index);
          },
        },
      });

      timeline
        .to(".hero-copy", { autoAlpha: 0, y: -32, duration: 0.3 }, 0.18)
        .fromTo(
          ".about-copy",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          0.4,
        )
        .to({}, { duration: 0.35 });

      // On mobile only: fade the social CTA out with the hero copy
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        timeline.to(".hero-social-cta", { autoAlpha: 0, y: -24, duration: 0.3 }, 0.18);
        return () => gsap.set(".hero-social-cta", { clearProps: "all" });
      });

      ticker = () => {
        const index = Math.round(state.progress * (FRAME_COUNT - 1));
        loadFrame(index);
        if (index !== state.drawn) drawFrame(index);
      };
      gsap.ticker.add(ticker);
    }

    return () => {
      disposed = true;
      window.removeEventListener("resize", resizeCanvas);
      if (ticker) gsap.ticker.remove(ticker);
      mm?.revert();
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      frames.clear();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="hero-stage relative h-screen w-full overflow-hidden"
    >
      <div className="hero-backdrop absolute inset-0">
        <canvas
          ref={canvas}
          className="hero-canvas absolute inset-0 h-full w-full"
          role="img"
          aria-label="Portrait of Arif, animated through 150 frames as you scroll"
        />
      </div>

      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="hero-topline pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-24 md:px-[6vw] md:pt-32">
        <p className="label !text-white/75">
          <span className="hero-live-dot" />
          Available for opportunities
        </p>
        <p ref={counter} className="label !text-white/65">
          001 / {FRAME_COUNT}
        </p>
      </div>

      <div className="hero-copy absolute inset-x-0 bottom-[14vh] z-10 px-5 md:bottom-[13vh] md:px-[8vw]">
        <p className="label mb-5 !text-white/75">
          Full-stack developer · India
        </p>
        <h1 className="hero-title max-w-4xl font-display text-[14vw] leading-[.82] md:text-[8vw]">
          Ideas into <em>impact.</em>
        </h1>
        <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-base">
            I develop modern web applications with the MERN stack, focusing on seamless user experiences 
            and scalable solutions.
          </p>
        </div>
      </div>

      {/* Social links + Resume button — stays visible throughout the hero scroll */}
      <div className="hero-social-cta absolute bottom-[24vh] right-5 z-10 flex flex-col items-center gap-4 md:bottom-[19vh] md:right-[8vw]">
        <nav
          aria-label="Social links"
          className="flex items-center gap-5 text-white/70"
        >
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-amber">
            <FaGithub aria-hidden="true" className="h-5 w-5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-amber">
            <FaLinkedinIn aria-hidden="true" className="h-5 w-5" />
          </a>
          <a href={`mailto:${links.email}`} aria-label="Email" className="transition-colors hover:text-amber">
            <MdOutlineMail aria-hidden="true" className="h-5 w-5" />
          </a>
        </nav>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-3 rounded-full border border-white/50 px-5 py-2.5 text-sm text-white transition-colors hover:border-amber hover:text-amber"
        >
          View Resume <HiArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>

      <div className="about-copy pointer-events-none absolute inset-x-0 bottom-[16vh] z-10 px-5 opacity-0 md:bottom-[18vh] md:px-[8vw]">
        <p className="label mb-5 !text-white/70">A little about me</p>
        <h2 className="max-w-4xl font-display text-[12vw] leading-[.91] md:text-[7vw]">
          Building with <em className="text-amber">curiosity.</em>
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
          I’m a full-stack developer passionate about solving real-world problems and 
          crafting seamless digital experiences through thoughtful design, 
          scalable architecture, and efficient systems.
        </p>
      </div>

      <div className="hero-scroll-hint pointer-events-none absolute bottom-6 left-5 z-10 flex items-center gap-3 md:left-[8vw]">
        <span className="hero-scroll-line" />
        <span className="label !text-white/60">Scroll to explore</span>
      </div>
      <span className="hero-index pointer-events-none absolute bottom-6 right-5 z-10 label !text-white/60 md:right-[8vw]">
        01 — 05
      </span>
    </section>
  );
}
