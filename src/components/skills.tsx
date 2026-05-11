"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";
import { portfolioData } from "@/src/data/portfolio";
import SectionTitle from "@/src/components/section-title";
import Magnet from "@/src/components/magnet";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  { label: "Frontend", items: portfolioData.techStack.frontend },
  { label: "Backend", items: portfolioData.techStack.backend },
  { label: "Mobile", items: portfolioData.techStack.mobile },
  { label: "Tools & Others", items: portfolioData.techStack.tools },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = containerRef.current?.querySelectorAll(".stack-row");
      if (!rows?.length) return;

      rows.forEach((row) => {
        const label = row.querySelector(".stack-label");
        const chips = row.querySelectorAll(".stack-chip");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        });

        if (label) tl.from(label, { opacity: 0, x: -30, ease: "none" }, 0);
        if (chips.length) {
          tl.from(
            chips,
            { opacity: 0, y: 20, ease: "none", stagger: 0.05 },
            0
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="my-stack" ref={containerRef} className="py-20 bg-[#181818]">
      <div className="container">
        <SectionTitle title="Tech Stack" center />

        <div className="mt-20 flex flex-col gap-y-16">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="stack-row border-t border-[#303030] pt-12 flex flex-col gap-8"
            >
              {/* Category label */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-primary" />
                <p className="stack-label text-xs font-bold uppercase tracking-[2px] text-primary">
                  {cat.label}
                </p>
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-3">
                {cat.items.map((tech) => (
                  <Magnet
                    key={tech.name}
                    magnetStrength={8}
                    padding={45}
                    wrapperClassName="inline-flex"
                  >
                    <div className="stack-chip group flex items-center gap-2.5 px-4 py-2.5 bg-[#303030] border border-[#303030] hover:border-primary transition-colors duration-300">
                      <span className="relative size-6 shrink-0">
                        <Image
                          src={tech.icon}
                          alt=""
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </span>
                      <span className="text-sm font-medium text-white uppercase tracking-wide group-hover:text-primary transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  </Magnet>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
