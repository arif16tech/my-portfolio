import { lenis } from "../lib.js";

const items = [["Work", "#projects"], ["Skills", "#skills"], ["Journey", "#journey"], ["Contact", "#contact"]];

export default function Nav() {
  const go = (event, href) => {
    event.preventDefault();
    if (lenis) lenis.scrollTo(href, { duration: 1.3 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-[6vw] md:py-6">
      <a href="#top" onClick={(event) => go(event, "#top")} className="brand-lockup flex items-center gap-3" aria-label="Arif, back to top">
        <span className="brand-mark">A.</span>
        <span className="brand-name label">Arif / Developer</span>
      </a>
      <nav aria-label="Main navigation" className="nav-links flex items-center gap-3 rounded-full p-1 md:gap-5 md:p-1.5">
        {items.map(([label, href]) => (
          <a key={href} href={href} onClick={(event) => go(event, href)} className="nav-link label">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
