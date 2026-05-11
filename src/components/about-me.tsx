"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FileText } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { personalInfo } from "@/src/data/portfolio";

import Magnet from "./magnet";
import SectionTitle from "./section-title";
import ShinyText from "./shiny-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutMe() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgWordTriggerRef = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bgWordTrigger = bgWordTriggerRef.current;
      const bgWord = bgWordRef.current;

      if (!bgWordTrigger || !bgWord) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".about-panel", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out"
      }).from(
        ".terminal-line",
        {
          y: 16,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out"
        },
        "-=0.55"
      );

      gsap.to(imageRef.current, {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.fromTo(
        bgWord,
        {
          x: 0
        },
        {
          x: () => window.innerWidth + bgWord.offsetWidth,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: bgWordTrigger,
            start: "top 86%",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      className="relative overflow-hidden bg-[#181818] py-24 md:py-32 min-h-screen"
      id="about-me"
      ref={container}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,70,18,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(48,129,255,0.1),transparent_26%)]" />

      <div className="container relative z-10">
        <SectionTitle title="About Me" />

        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <article className="about-panel relative min-w-0 overflow-hidden rounded-lg border border-primary/30 bg-[#1d1d1d]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
            <div
              ref={imageRef}
              className="relative mx-auto mb-10 size-48 overflow-hidden rounded-full border border-primary/50 bg-[#242424] p-2 sm:size-64"
            >
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                fill
                sizes="(min-width: 1024px) 32rem, 32rem"
                quality={100}
                priority
                className="rounded-full object-cover  transition-all duration-700 hover:grayscale-0"
              />
              <span className="absolute bottom-5 right-5 size-3 rounded-full bg-emerald-400 ring-4 ring-[#1d1d1d]" />
            </div>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="uppercase tracking-[0.18em] text-gray-300">
                  Operator
                </span>
                <span className="break-words font-bold uppercase tracking-[0.18em] text-primary sm:text-right">
                  {personalInfo.name}
                </span>
              </div>
              <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="uppercase tracking-[0.18em] text-gray-300">
                  Role
                </span>
                <span className="text-blue-400 sm:text-right">
                  {personalInfo.title}
                </span>
              </div>
              <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="uppercase tracking-[0.18em] text-gray-300">
                  Focus
                </span>
                <span className="text-white sm:text-right">
                  {personalInfo.focus}
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="uppercase tracking-[0.18em] text-gray-300">
                  Status
                </span>
                <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase text-emerald-400">
                  {personalInfo.availability}
                </span>
              </div>
            </div>
          </article>

          <article className="about-panel min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1c1c]/95 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-2 font-mono text-xs text-gray-300">
              <div>
                <span className="mr-3 text-blue-400">&gt;</span>
                user_profile.log
              </div>
              <Magnet magnetStrength={2}>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-white"
                >
                  <span className="text-blue-400">-&gt;</span>
                  open resume.pdf
                  <FileText size={14} />
                </a>
              </Magnet>
            </div>

            <div className="space-y-7 p-6 font-mono text-sm leading-relaxed text-gray-300 md:p-8 md:text-base">
              <div className="terminal-line">
                <p className="mb-4 font-bold text-violet-400">
                  <span className="mr-3 text-blue-400">-&gt;</span>whoami
                </p>

                <ShinyText
                  text={personalInfo.bio}
                  className="border-l border-white/15 pl-4"
                />
              </div>

              <div className="terminal-line">
                <p className="mb-4 font-bold text-violet-400">
                  <span className="mr-3 text-blue-400">-&gt;</span>cat
                  mission.txt
                </p>
                <ShinyText
                  text={personalInfo.mission}
                  className="border-l border-white/15 pl-4"
                />
              </div>

              <div className="terminal-line border-t border-white/10 pt-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-300">
                    Education
                  </p>
                  <p className="mt-2 text-white">{personalInfo.status}</p>
                  <p className="mt-1 text-gray-400">
                    {personalInfo.institution}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div
        ref={bgWordTriggerRef}
        className="pointer-events-none absolute right-0 bottom-8 left-0 z-0 h-[14vw] select-none"
      >
        <div
          ref={bgWordRef}
          className="absolute left-96 bottom-0 whitespace-nowrap text-[14vw] font-bold lowercase leading-none text-white/[0.06]"
        >
          {personalInfo.backgroundWord}
        </div>
      </div>
    </section>
  );
}
