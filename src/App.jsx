import { useEffect, useLayoutEffect } from "react";
import { initScroll, gsap, ScrollTrigger } from "./lib.js";
import Nav from "./components/Nav.jsx";
import Stage from "./components/Stage.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Journey from "./components/Journey.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  useEffect(() => initScroll(), []);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-rv]").forEach((el) =>
        gsap.from(el, { y: 48, opacity: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }));
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); ctx.revert(); };
  }, []);
  return (
    <>
      <Nav />
      <main className="site-shell">
        <Stage />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
