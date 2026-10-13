import { links } from "../data.js";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi2";

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-8 pt-[22vh] md:px-[6vw]">
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-amber/15 blur-[150px]" />

      {/* Main content: heading left, socials right */}
      <div className="relative flex max-w-6xl flex-col gap-16 md:flex-row md:items-start md:justify-between">

        {/* Left: heading + CTA */}
        <div>
          <p data-rv className="label mb-6">What's next</p>
          <h2 data-rv className="font-display text-[12vw] leading-[.85] md:text-[8vw]">
            Let's build<br /><em className="text-amber">something.</em>
          </h2>
          <a
            data-rv
            href={`mailto:${links.email}`}
            className="group mt-12 inline-flex items-center gap-4 rounded-full border border-bone/30 px-8 py-4 text-base transition-all hover:border-amber hover:bg-amber hover:text-ink"
          >
            Start a conversation{" "}
            <HiArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Right: social link cards */}
        <div data-rv className="flex flex-col gap-4 md:pt-3 md:min-w-55">
          <p className="label text-white/50! mb-2">Find me on</p>

          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4 text-white/70 transition-all hover:border-amber/40 hover:bg-amber/5 hover:text-amber"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-amber/50">
              <FaGithub aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">GitHub</span>
              <span className="text-xs text-white/40">View my projects</span>
            </div>
            <HiArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
          </a>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4 text-white/70 transition-all hover:border-amber/40 hover:bg-amber/5 hover:text-amber"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-amber/50">
              <FaLinkedinIn aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">LinkedIn</span>
              <span className="text-xs text-white/40">Connect with me</span>
            </div>
            <HiArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
          </a>

          <a
            href={`mailto:${links.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4 text-white/70 transition-all hover:border-amber/40 hover:bg-amber/5 hover:text-amber"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-amber/50">
              <MdOutlineMail aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium">Email</span>
              <span className="truncate text-xs text-white/40">{links.email}</span>
            </div>
          </a>
        </div>
      </div>

      <footer className="relative mt-24 border-t border-white/10 pt-6 text-center">
        <span className="label">© {new Date().getFullYear()} Arif — Full-Stack Developer </span>
      </footer>
    </section>
  );
}
