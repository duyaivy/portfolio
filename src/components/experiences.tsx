"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import SectionTitle from "@/src/components/section-title";
import { experiences } from "@/src/data/portfolio";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const formatPeriod = (period: string) => {
  return period.replace(/\s*-\s*/g, " — ").toUpperCase();
};

const getTitle = (organization: string | undefined, role: string) => {
  if (!organization) return role;
  const parts = organization.split(" - ");
  return parts[0].trim();
};

const getSubtitle = (organization: string | undefined, role: string) => {
  if (!organization) return role;
  return `${role} @${organization}`;
};

export default function Experiences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const userInteractedRef = useRef<number>(0);
  // Initially -1 so all cards start in collapsed (half-width) state before scrolling to them
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useGSAP(
    () => {
      const sectionEl = containerRef.current;
      if (!sectionEl) return;

      // Precise scroll position tracking:
      // When a card reaches the focal trigger line, it expands horizontally to 100% and vertically,
      // lighting up with full white typography, glowing red border, and bright bullet points.
      // Other cards occupy half-width (48% on desktop).
      // Before scrolling to the section, all cards remain at half-width.
      const handleScroll = () => {
        if (Date.now() < userInteractedRef.current) return;

        const windowH = window.innerHeight;
        const sectionRect = sectionEl.getBoundingClientRect();

        // 1. Before scrolling to the section (section top still well below focal zone):
        if (sectionRect.top > windowH * 0.7) {
          setActiveIndex(-1);
          return;
        }

        // 2. If section has completely scrolled past the top of the viewport:
        if (sectionRect.bottom < windowH * 0.15) {
          setActiveIndex(experiences.length - 1);
          return;
        }

        // 3. Focal trigger line: around 60% of viewport height (ideal reading height)
        const triggerY = windowH * 0.6;

        const card0 = cardRefs.current[0];
        const card1 = cardRefs.current[1];
        const card2 = cardRefs.current[2];

        const card0Top = card0 ? card0.getBoundingClientRect().top : 999999;
        const card1Top = card1 ? card1.getBoundingClientRect().top : 999999;
        const card2Top = card2 ? card2.getBoundingClientRect().top : 999999;

        if (card2Top <= triggerY) {
          setActiveIndex(2);
        } else if (card1Top <= triggerY) {
          setActiveIndex(1);
        } else if (card0Top <= triggerY || sectionRect.top <= windowH * 0.7) {
          setActiveIndex(0);
        } else {
          setActiveIndex(-1);
        }
      };

      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });

      // Run once immediately on mount to establish correct initial state
      handleScroll();

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    },
    { scope: containerRef }
  );

  const handleCardClick = useCallback((index: number) => {
    userInteractedRef.current = Date.now() + 1500;
    setActiveIndex((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#181818] py-28"
      id="my-experience"
      ref={containerRef}
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <SectionTitle
          title="My Experience"
          center
          className="mb-16 md:mb-20"
        />

        <div className="flex flex-col items-start gap-7">
          {experiences.map((exp, index) => {
            const isExpanded = activeIndex === index;
            const title = getTitle(exp.organization, exp.role);
            const subtitle = getSubtitle(exp.organization, exp.role);
            const bullets =
              exp.bullets && exp.bullets.length > 0
                ? exp.bullets
                : exp.description
                    .split(/\.\s+/)
                    .map((s) => s.trim().replace(/\.$/, ""))
                    .filter((s) => s.length > 0)
                    .map((s) => `${s}.`);

            return (
              <article
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "experience-card group relative overflow-hidden rounded-2xl border select-none transition-all duration-500 ease-out cursor-pointer",
                  // Width behavior: Inactive = half-width (48%), Active = full-width (100%)
                  isExpanded ? "w-full" : "w-full md:w-[48%]",
                  // Active card lights up with elevated brightness, vibrant red border, and ambient glow
                  isExpanded
                    ? "border-primary bg-[#282828] shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(218,41,28,0.22)] opacity-100"
                    : "border-[#383838] bg-[#222222] hover:border-primary/50 hover:bg-[#252525] opacity-90"
                )}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={cn(
                    "transition-all duration-500",
                    isExpanded ? "p-7 sm:p-9" : "p-6 sm:p-7"
                  )}
                >
                  {/* Top metadata line: Date range + Expand arrow */}
                  <div className="flex items-center justify-between gap-4 mb-2.5">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold tracking-[2px] uppercase transition-colors",
                        isExpanded ? "text-primary" : "text-primary/90"
                      )}
                    >
                      {formatPeriod(exp.period)}
                    </span>
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full border transition-all duration-300",
                        isExpanded
                          ? "border-primary/70 bg-primary/15 text-primary shadow-[0_0_10px_rgba(218,41,28,0.3)]"
                          : "border-white/15 bg-white/5 text-gray-300 group-hover:text-primary group-hover:border-primary/50"
                      )}
                    >
                      {isExpanded ? (
                        <ArrowDownRight size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </span>
                  </div>

                  {/* Main Title (Company / Organization) */}
                  <h3
                    className={cn(
                      "font-bold uppercase tracking-tight transition-all duration-300",
                      isExpanded
                        ? "text-2xl sm:text-3xl md:text-4xl text-white"
                        : "text-xl sm:text-2xl text-white/90 group-hover:text-white"
                    )}
                  >
                    {title}
                  </h3>

                  {/* Role / Subtitle */}
                  <p
                    className={cn(
                      "mt-1.5 font-normal transition-all",
                      isExpanded
                        ? "text-sm sm:text-base text-gray-200"
                        : "text-xs sm:text-sm text-gray-400 line-clamp-1 group-hover:text-gray-300"
                    )}
                  >
                    {subtitle}
                  </p>

                  {/* Collapsed state indicator */}
                  {!isExpanded && (
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[2px] text-gray-400 transition-colors group-hover:text-primary">
                      <span>Open Chapter</span>
                      <ArrowUpRight size={12} />
                    </div>
                  )}

                  {/* Expanded description (bullet points) */}
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-out",
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="overflow-hidden">
                      {/* Subtle dividing line matching theme */}
                      <div className="my-5 border-t border-[#383838]" />

                      {/* 2-column responsive bullet layout */}
                      <div className="grid grid-cols-1 gap-x-10 gap-y-4 pt-1 md:grid-cols-2">
                        {bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(218,41,28,0.9)]" />
                            <p className="text-sm leading-relaxed text-gray-200">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
