import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib.js";
import { journey } from "../data.js";

export default function Journey() {
  const root = useRef();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl", start: "top 70%", end: "bottom 70%", scrub: true } });
      gsap.utils.toArray(".j-num").forEach((el) =>
        gsap.fromTo(el, { yPercent: 25 }, { yPercent: -25, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      gsap.utils.toArray(".j-item").forEach((el) =>
        gsap.from(el.querySelectorAll(".j-in"), { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 75%" } }));
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="journey" ref={root} className="px-5 py-[18vh] md:px-[6vw]">
      <h2 data-rv className="mb-16 font-display text-[10vw] leading-[.9] md:mb-28 md:text-[5vw]">The <em className="text-amber">journey</em></h2>
      <div className="tl relative ml-3 md:ml-0 md:pl-[22vw]">
        <div className="line absolute left-0 top-0 h-full w-px origin-top bg-amber md:left-[18vw]" />
        {journey.map((j) => (
          <div key={j.n} className="j-item relative overflow-hidden py-14 pl-8 md:py-24 md:pl-[4vw]">
            <span className="j-num pointer-events-none absolute -top-2 right-0 select-none font-display text-[30vw] italic leading-none text-bone/[0.05] md:text-[16vw]">{j.n}</span>
            <i className="absolute -left-[4px] top-[4.4rem] h-2 w-2 rounded-full bg-amber md:left-[calc(-4vw-4px)] md:top-[7rem]" />
            <p className="j-in label">Chapter {j.n}</p>
            <h3 className="j-in mt-3 font-display text-[6.5vw] leading-none md:text-[3vw]">{j.t}</h3>
            <p className="j-in mt-4 max-w-lg text-mute">{j.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
