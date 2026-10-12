import { useState } from "react";
import { skills } from "../data.js";

export default function Skills() {
  const [note, setNote] = useState("Hover a skill.");
  return (
    <section id="skills" className="relative px-5 py-[18vh] md:px-[6vw]">
      <div data-rv className="mb-14 flex items-end justify-between md:mb-24">
        <h2 className="font-display text-[10vw] leading-[.9] md:text-[6vw]">Toolkit<span className="text-amber">.</span></h2>
        <p className="label hidden max-w-[16rem] text-right md:block" aria-live="polite">{note}</p>
      </div>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {skills.map((g) => (
          <div key={g.group} data-rv className="grid gap-4 py-8 md:grid-cols-[14rem_1fr] md:py-12">
            <span className="label pt-3">{g.group}</span>
            <ul className="skills-row flex flex-wrap gap-x-8 gap-y-1 md:gap-x-12">
              {g.items.map(([name, n]) => (
                <li key={name} className="sk cursor-default font-display text-[6.2vw] leading-tight md:text-[2.6vw]"
                  onMouseEnter={() => setNote(n)} onFocus={() => setNote(n)} tabIndex={0}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="label mt-6 md:hidden">React · Node.js · FastAPI · LangChain · RAG · MERN</p>
    </section>
  );
}
