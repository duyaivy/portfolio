"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Hand, Radio } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

import GithubLinks from "@/src/components/github-links";
import SectionTitle from "@/src/components/section-title";
import { portfolioData } from "@/src/data/portfolio";

import ShinyText from "./shiny-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { projects } = portfolioData;
const TOC_PAGE = 1;
const PROJECT_START_PAGE = 2;

export default function Flipbook() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        wrapperRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.8
          }
        }
      );
    },
    { scope: wrapperRef }
  );

  const flipToProject = useCallback((idx: number) => {
    bookRef.current?.pageFlip()?.flip(PROJECT_START_PAGE + idx * 2);
  }, []);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const activeProjectIdx =
    currentPage <= TOC_PAGE
      ? -1
      : Math.floor((currentPage - PROJECT_START_PAGE) / 2);

  return (
    <section
      id="selected-projects"
      className="overflow-hidden bg-[#181818] py-24"
    >
      <div className="container">
        <SectionTitle title="My Projects" center />

        <div ref={wrapperRef} className="mt-20 flex flex-col items-center">
          <div className="portfolio-book w-full max-w-6xl">
            <HTMLFlipBook
              key={isMobile ? "mobile-book" : "desktop-book"}
              ref={bookRef}
              width={isMobile ? 340 : 520}
              height={isMobile ? 520 : 660}
              size="stretch"
              minWidth={280}
              maxWidth={720}
              minHeight={380}
              maxHeight={860}
              showCover={false}
              flippingTime={700}
              usePortrait={isMobile}
              startPage={0}
              drawShadow
              useMouseEvents
              swipeDistance={30}
              clickEventForward
              onFlip={onFlip}
              className="portfolio-book"
              style={{}}
              startZIndex={0}
              autoSize
              mobileScrollSupport
              showPageCorners
              disableFlipByClick={false}
              maxShadowOpacity={0.5}
            >
              <div
                data-density="hard"
                className="flex h-full flex-col justify-center border-r border-[#303030] bg-[#181818] p-12"
              >
                <div className="text-center flex flex-col h-full items-center ">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
                    Selected Work
                  </p>
                  <div className="flex-1 flex items-start justify-center flex-col">
                    <h2 className="text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
                      Discover
                    </h2>
                    <br />
                    <h2 className="text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-white md:text-6xl text-start">
                      My Projects
                    </h2>
                  </div>
                  <div className="flex w-full items-center gap-3 border-t border-white/10 pt-5 text-left">
                    <span className="flex size-10 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
                      <Hand size={18} />
                    </span>
                    <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[1.6px] text-[#8f8f8f]">
                      Tap/click and drag the page edge to flip through the book
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-density="hard"
                className="flex h-full flex-col justify-between bg-[#303030] p-12"
              >
                <div>
                  <p className="mb-8 text-[10px] font-bold uppercase tracking-[2px] text-primary">
                    Table of Contents
                  </p>
                  <ul className="space-y-0">
                    {projects.map((p, i) => (
                      <li key={p.id}>
                        <button
                          onClick={() => flipToProject(i)}
                          className={`group flex w-full items-center justify-between border-t border-[#3b3b3b] py-5 text-left transition-colors ${activeProjectIdx === i
                            ? "text-primary"
                            : "text-white hover:text-primary"
                            }`}
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <span className="w-6 text-xs font-bold tracking-[1.4px] text-[#777777]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="truncate text-base font-medium uppercase tracking-tight">
                              {p.name}
                            </span>
                          </div>
                          <span className="ml-4 shrink-0 text-[10px] font-bold uppercase tracking-[1.4px] text-[#777777] transition-colors group-hover:text-primary">
                            {p.tech[0]?.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[10px] uppercase tracking-[1.4px] text-[#777777]">
                  Click a project to flip
                </p>
              </div>

              {projects.flatMap((p) => [
                <div
                  key={`left-${p.id}`}
                  className="flex h-full flex-col justify-between border-r border-[#303030] bg-[#181818] p-10"
                >
                  <div>
                    <span className="mb-4 block text-[10px] font-bold uppercase tracking-[2px] text-primary">
                      {p.period}
                    </span>
                    <h3 className="mb-8 text-3xl font-medium uppercase leading-tight tracking-tight text-white">
                      {p.name}
                    </h3>
                    <ShinyText text={p.overview} />
                  </div>

                  <div className="space-y-5 border-t border-[#303030] pt-6 mt-6">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-[#666666]">
                        Team
                      </p>
                      <p className="text-sm font-medium text-white">
                        {p.teamSize}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-[#666666]">
                        Role
                      </p>
                      <p className="text-sm font-medium text-white">{p.role}</p>
                    </div>
                  </div>
                </div>,

                <div
                  key={`right-${p.id}`}
                  className="flex h-full flex-col overflow-hidden bg-[#303030] p-8"
                >
                  <div className="group relative aspect-video w-full shrink-0 overflow-hidden border border-[#3a3a3a] bg-[#181818]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 520px, 340px"
                      className="object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-blue-500/30 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
                  </div>

                  <div className="flex flex-1 flex-col justify-end pt-8">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#777777]">
                      Tech Stack
                    </p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t.name}
                          className="inline-flex items-center gap-1.5 border border-[#303030] bg-[#181818] px-2 py-1 text-[9px] font-bold uppercase tracking-[1.4px] text-[#d5d5d5]"
                        >
                          <span className="relative size-4 shrink-0">
                            <Image
                              src={t.icon}
                              alt=""
                              fill
                              sizes="16px"
                              className="object-contain"
                            />
                          </span>
                          {t.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <GithubLinks links={p.githubLinks} />

                      <a
                        href={p.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 border border-primary bg-primary px-4 text-[11px] font-bold uppercase tracking-[1.6px] text-white transition-all hover:bg-primary-dark"
                      >
                        <Radio size={15} />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ])}
            </HTMLFlipBook>
          </div>
        </div>
      </div>
    </section>
  );
}
