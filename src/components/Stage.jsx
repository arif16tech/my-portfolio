
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib.js";
import { links } from "../data.js";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";

const FRAME_COUNT = 150;
const FRAME_PATH = "/frames/f";
const FRAME_EXTENSION = ".jpg";

const MAX_DPR = 1.5;
const CACHE_RADIUS = 12;
const PRELOAD_AHEAD = 2;
const PRELOAD_BEHIND = 1;

export default function Stage() {
  const root = useRef(null);
  const canvas = useRef(null);
  const counter = useRef(null);

  useLayoutEffect(() => {
    const section = root.current;
    const element = canvas.current;

    if (!section || !element) return;

    const context = element.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (!context) return;

    const frames = new Map();
    const state = {
      progress: 0,
      drawn: -1,
      lastIndex: 0,
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const heroCopy = section.querySelector(".hero-copy");
    const aboutCopy = section.querySelector(".about-copy");
    const socialCta = section.querySelector(".hero-social-cta");

    let disposed = false;
    let drawRequest = 0;
    let timeline;
    let mediaQuery;
    let resizeObserver;
    let scrollTrigger;
    let lastCounterIndex = -1;

    const getCurrentIndex = () =>
      Math.max(
        0,
        Math.min(
          FRAME_COUNT - 1,
          Math.round(state.progress * (FRAME_COUNT - 1))
        )
      );

    const getFramePath = (index) =>
      `${FRAME_PATH}${String(index + 1).padStart(3, "0")}${FRAME_EXTENSION}`;

    const updateCounter = (index) => {
      if (!counter.current || lastCounterIndex === index) return;

      lastCounterIndex = index;
      counter.current.textContent =
        `${String(index + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
    };

    const drawFrame = (index) => {
      const image = frames.get(index);

      if (
        !image ||
        !image.complete ||
        !image.naturalWidth ||
        !element.width ||
        !element.height
      ) {
        return false;
      }

      const width = element.width;
      const height = element.height;

      // Cover the canvas without stretching the original image.
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight
      );

      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;

      const x = (width - imageWidth) / 2;
      const y = (height - imageHeight) / 2;

      context.drawImage(
        image,
        x,
        y,
        imageWidth,
        imageHeight
      );

      state.drawn = index;
      updateCounter(index);

      return true;
    };

    // Coalesce repeated draw requests into one browser animation frame.
    const scheduleDraw = () => {
      if (disposed || drawRequest) return;

      drawRequest = window.requestAnimationFrame(() => {
        drawRequest = 0;

        if (disposed) return;

        const index = getCurrentIndex();

        // Never draw a stale frame after fast scrolling.
        if (index !== state.drawn) {
          drawFrame(index);
        }
      });
    };

    // Keep nearby frames cached to avoid repeated image loading
    // when the user scrolls forward and backward.
    const pruneCache = (currentIndex) => {
      for (const [index, image] of frames) {
        if (
          Math.abs(index - currentIndex) > CACHE_RADIUS &&
          image.complete
        ) {
          frames.delete(index);
        }
      }
    };

    const loadFrame = (index) => {
      if (
        disposed ||
        index < 0 ||
        index >= FRAME_COUNT ||
        frames.has(index)
      ) {
        return;
      }

      const image = new Image();

      // Allow the browser to decode images asynchronously.
      image.decoding = "async";

      frames.set(index, image);

      image.onload = () => {
        if (disposed || frames.get(index) !== image) return;

        // Draw only if this is the frame currently needed.
        if (index === getCurrentIndex()) {
          scheduleDraw();
        }

        pruneCache(getCurrentIndex());
      };

      image.onerror = () => {
        if (frames.get(index) === image) {
          frames.delete(index);
        }

        // Avoid console spam during temporary loading failures.
      };

      image.src = getFramePath(index);
    };

    const preloadNearbyFrames = (index, direction = 1) => {
      loadFrame(index);

      if (reduceMotion) return;

      // Prioritize frames in the current scroll direction.
      for (let offset = 1; offset <= PRELOAD_AHEAD; offset++) {
        loadFrame(index + offset * direction);
      }

      // Keep a small buffer behind the current frame for reversals.
      for (let offset = 1; offset <= PRELOAD_BEHIND; offset++) {
        loadFrame(index - offset * direction);
      }
    };

    const resizeCanvas = () => {
      if (disposed) return;

      const bounds = element.getBoundingClientRect();

      if (!bounds.width || !bounds.height) return;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        MAX_DPR
      );

      const width = Math.round(bounds.width * dpr);
      const height = Math.round(bounds.height * dpr);

      // Changing canvas dimensions clears its drawing buffer.
      if (element.width !== width || element.height !== height) {
        element.width = width;
        element.height = height;
        state.drawn = -1;
      }

      scheduleDraw();
    };

    // Initial frame: show the hero as soon as the first image is ready.
    loadFrame(0);

    if (!reduceMotion) {
      loadFrame(1);
      loadFrame(2);
    }

    resizeCanvas();

    // Observe actual canvas size changes, including layout changes.
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(element);
    } else {
      window.addEventListener("resize", resizeCanvas);
    }

    if (!reduceMotion) {
      const onScrollUpdate = (self) => {
        state.progress = self.progress;

        const index = getCurrentIndex();
        const direction = index >= state.lastIndex ? 1 : -1;

        state.lastIndex = index;

        preloadNearbyFrames(index, direction);
        scheduleDraw();

        // Release older decoded image references outside the cache window.
        pruneCache(index);
      };

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=380%",
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: onScrollUpdate,
        },
      });

      scrollTrigger = timeline.scrollTrigger;

      timeline
        .to(
          heroCopy,
          {
            autoAlpha: 0,
            y: -32,
            duration: 0.3,
          },
          0.18
        )
        .fromTo(
          aboutCopy,
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
          },
          0.4
        )
        .to({}, { duration: 0.35 });

      // Fade the social CTA on mobile only.
      mediaQuery = gsap.matchMedia();

      mediaQuery.add("(max-width: 767px)", () => {
        timeline.to(
          socialCta,
          {
            autoAlpha: 0,
            y: -24,
            duration: 0.3,
          },
          0.18
        );
      });
    }

    return () => {
      disposed = true;

      if (drawRequest) {
        window.cancelAnimationFrame(drawRequest);
        drawRequest = 0;
      }

      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeCanvas);

      mediaQuery?.revert();

      scrollTrigger?.kill();
      timeline?.kill();

      for (const image of frames.values()) {
        image.onload = null;
        image.onerror = null;
      }

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
        <p className="label text-white/75!">
          <span className="hero-live-dot" />
          Available for opportunities
        </p>

        <p ref={counter} className="label text-white/65!">
          001 / {FRAME_COUNT}
        </p>
      </div>

      <div className="hero-copy absolute inset-x-0 bottom-[14vh] z-10 px-5 md:bottom-[13vh] md:px-[8vw]">
        <p className="label mb-5 text-white/75!">
          Full-stack developer · India
        </p>

        <h1 className="hero-title max-w-4xl font-display text-[14vw] leading-[.82] md:text-[8vw]">
          Ideas into <em>impact.</em>
        </h1>

        <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-base">
            I develop modern web applications with the MERN stack,
            focusing on seamless user experiences and scalable solutions.
          </p>
        </div>
      </div>

      <div className="hero-social-cta absolute bottom-[24vh] right-5 z-10 flex flex-col items-center gap-4 md:bottom-[19vh] md:right-[8vw]">
        <nav
          aria-label="Social links"
          className="flex items-center gap-5 text-white/70"
        >
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-amber"
          >
            <FaGithub aria-hidden="true" className="h-5 w-5" />
          </a>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-amber"
          >
            <FaLinkedinIn aria-hidden="true" className="h-5 w-5" />
          </a>

          <a
            href={`mailto:${links.email}`}
            aria-label="Email"
            className="transition-colors hover:text-amber"
          >
            <MdOutlineMail aria-hidden="true" className="h-5 w-5" />
          </a>
        </nav>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-3 rounded-full border border-white/50 px-5 py-2.5 text-sm text-white transition-colors hover:border-amber hover:text-amber"
        >
          View Resume
          <HiArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>

      <div className="about-copy pointer-events-none absolute inset-x-0 bottom-[16vh] z-10 px-5 opacity-0 md:bottom-[18vh] md:px-[8vw]">
        <p className="label mb-5 text-white/70!">A little about me</p>

        <h2 className="max-w-4xl font-display text-[12vw] leading-[.91] md:text-[7vw]">
          Building with <em className="text-amber">curiosity.</em>
        </h2>

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
          I’m a full-stack developer passionate about solving real-world
          problems and crafting seamless digital experiences through
          thoughtful design, scalable architecture, and efficient systems.
        </p>
      </div>

      <div className="hero-scroll-hint pointer-events-none absolute bottom-6 left-5 z-10 flex items-center gap-3 md:left-[8vw]">
        <span className="hero-scroll-line" />
        <span className="label text-white/60!">Scroll to explore</span>
      </div>

      <span className="hero-index pointer-events-none absolute bottom-6 right-5 z-10 label text-white/60! md:right-[8vw]">
        01 — 05
      </span>
    </section>
  );
}
