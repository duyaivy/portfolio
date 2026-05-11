"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

import { portfolioData } from "@/src/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { theatreOfDreams: tod } = portfolioData;

export default function TheatreOfDreams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const childImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );

      gsap.from(".tod-reveal", {
        opacity: 0,
        y: 34,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          invalidateOnRefresh: true
        }
      });

      if (childImageRef.current) {
        gsap.fromTo(
          childImageRef.current,
          {
            xPercent: 0,
            yPercent: 0,
            scale: 0.42,
            transformOrigin: "50% 100%",
            opacity: 0.72,
            clipPath: "inset(100% 0% 0% 0%)"
          },
          {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            transformOrigin: "50% 100%",
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true
            }
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="theatre-of-dreams"
      ref={containerRef}
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#181818] max-sm:min-h-[720px]"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Theatre of Dreams background"
          fill
          sizes="100vw"
          quality={74}
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-[#181818]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/70 via-[#181818]/15 to-[#181818]/65" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#181818]/75 via-[#181818]/20 to-[#181818]/15" />

      <div
        ref={childImageRef}
        className="pointer-events-none absolute bottom-0 left-0 z-[4] h-[66vh] w-full origin-bottom overflow-hidden sm:bottom-4 sm:left-4 sm:h-[64vh] sm:w-[70vw] md:bottom-6 md:left-6 md:top-6 md:h-auto md:w-[45vw] md:min-w-[320px] md:max-w-[720px]"
      >
        <Image
          src="/child_banner.jpg"
          alt="Manchester United legacy"
          fill
          sizes="(min-width: 768px) 45vw, (min-width: 640px) 70vw, 100vw"
          className="object-cover object-left"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#181818]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/35 via-transparent to-[#181818]/30 md:from-[#181818]/20" />
      </div>

      <div className="relative z-10 flex h-full items-start justify-end px-5 pt-12 sm:px-10 sm:pt-16 md:px-24 md:py-24">
        <div className="ml-auto w-full max-w-[680px] text-left max-md:max-h-[36vh] max-md:overflow-hidden md:w-2/3 lg:w-4/5">
          <p className="tod-reveal mb-5 text-[10px] font-bold uppercase tracking-[2px] text-primary sm:mb-6 sm:text-xs">
            My Theatre of Dreams
          </p>

          <div className="tod-reveal">
            <p className="max-w-180 font-[cursive] text-[clamp(1.25rem,2.45vw,2.7rem)] font-semibold italic leading-[1.15] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]">
              &ldquo;{tod.quote}&rdquo;
            </p>
            <p className="mt-4 text-right font-[cursive] text-lg font-semibold italic uppercase tracking-[1px] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)] sm:text-xl md:text-2xl">
              - {tod.quoteAuthor} -
            </p>
          </div>

          <div className="tod-reveal ml-auto mt-5 w-full  pl-5 drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)] sm:mt-6 sm:pl-6 md:mt-8">
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm md:text-lg">
              {tod.personalNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
