import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib.js";
import { projects } from "../data.js";

function Art({ p }) {
  if (p.image) return <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />;
  const c = (l, a = 1) => `hsl(${p.hue} 70% ${l}% / ${a})`;
  return (
    <div className="relative h-full w-full" style={{ background: `radial-gradient(circle at 30% 20%, ${c(45, .55)}, transparent 55%), radial-gradient(circle at 80% 90%, ${c(30, .5)}, transparent 50%), #0c0c10` }}>
      <div className="absolute inset-[12%] rounded-md border border-white/15 bg-black/40 p-4 backdrop-blur-sm">
        <div className="mb-3 flex gap-1.5">{[0, 1, 2].map((i) => <i key={i} className="h-2 w-2 rounded-full bg-white/25" />)}</div>
        {[70, 90, 55, 80, 40].map((w, i) => <div key={i} className="mb-2.5 h-2 rounded-full bg-white/15" style={{ width: `${w}%` }} />)}
        <div className="mt-5 h-12 rounded" style={{ background: `linear-gradient(90deg, ${c(55, .8)}, transparent)` }} />
      </div>
      <span className="absolute bottom-2 right-4 font-display text-[6rem] italic leading-none text-white/[0.07]">{p.n}</span>
    </div>
  );
}

function ProjectCard({ p, index }) {
  const cardRef = useRef();
  useLayoutEffect(() => {
    const el = cardRef.current;
    gsap.from(el, {
      y: 60, opacity: 0, duration: 0.9, ease: "power3.out", delay: (index % 3) * 0.1,
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
    });
  }, []);

  return (
    <article ref={cardRef} className="p-card flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13] transition-colors duration-300 hover:border-white/20">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Art p={p} />
      </div>

      {/* Info */}
      <div className="flex flex-col p-5">
        {/* tag + dot */}
        <div className="mb-3 flex items-center justify-between">
          <span className="label text-white/50">{p.n} — {p.tag}</span>
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(${p.hue} 70% 60%)` }} />
        </div>

        {/* title + permanent action buttons */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[6vw] leading-tight md:text-[1.7vw]">{p.title}</h3>
          <div className="flex shrink-0 gap-2 pt-1">
            <a href={p.live} target="_blank" rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70 transition hover:border-amber hover:text-amber">
              Live ↗
            </a>
            <a href={p.repo} target="_blank" rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70 transition hover:border-amber hover:text-amber">
              Code ↗
            </a>
          </div>
        </div>

        {/* description */}
        <p className="mt-2.5 text-sm leading-relaxed text-mute">{p.desc}</p>

        {/* tech badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mute">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

const FEATURED = 3;

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const extraRef = useRef();
  const btnRef = useRef();

  const featured = projects.slice(0, FEATURED);
  const rest = projects.slice(FEATURED);

  const handleExpand = () => {
    setExpanded(true);
    // animate extra cards in after they mount
    requestAnimationFrame(() => {
      if (!extraRef.current) return;
      const cards = extraRef.current.querySelectorAll(".p-card");
      gsap.from(cards, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 });
      // smooth scroll to extra section
      setTimeout(() => extraRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    });
  };

  return (
    <section id="projects" className="relative px-5 py-[14vh] md:px-[6vw]">
      {/* Heading row */}
      <div data-rv className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label mb-3 text-white/50">Selected Work</p>
          <h2 className="font-display text-[10vw] leading-[.88] md:text-[5.5vw]">
            Featured <em className="text-amber">projects</em>
          </h2>
        </div>
        <span className="label text-white/40">{String(projects.length).padStart(2, "0")} total</span>
      </div>

      {/* Featured 3 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {featured.map((p, i) => <ProjectCard key={p.n} p={p} index={i} />)}
      </div>

      {/* Remaining projects */}
      {rest.length > 0 && (
        <>
          {!expanded ? (
            <div className="mt-12 flex justify-center">
              <button
                ref={btnRef}
                onClick={handleExpand}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-3.5 text-sm text-white/80 transition-all duration-300 hover:border-amber hover:text-amber"
              >
                View all projects
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-amber/50">
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current" aria-hidden="true">
                    <path d="M8 1v14M1 8l7 7 7-7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="rounded-full bg-amber/15 px-2 py-0.5 font-mono text-[10px] text-amber">
                  +{rest.length}
                </span>
              </button>
            </div>
          ) : (
            <div ref={extraRef} className="mt-10">
              <p className="label mb-8 text-white/40">More projects</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {rest.map((p, i) => <ProjectCard key={p.n} p={p} index={i} />)}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
