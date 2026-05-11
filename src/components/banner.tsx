"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { theatreOfDreams } from "@/src/data/portfolio";
import Button from "@/src/components/button";
import Magnet from "@/src/components/magnet";
import ShinyText from "@/src/components/shiny-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 70%",
          end: "bottom 10%",
          scrub: 1
        }
      });

      tl.fromTo(
        ".slide-up-and-fade",
        { y: 0 },
        { y: -150, opacity: 0, stagger: 0.02 }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="banner" className="relative overflow-hidden">
      {/* Background with MU theme / Theatre of Dreams */}
      <div
        className="absolute inset-0 z-0 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        style={{
          backgroundImage: `url('${theatreOfDreams.bannerImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#181818]/20 via-[#181818]/60 to-[#181818]" />

      <div
        className="container relative z-20 flex h-svh flex-col justify-center gap-10 lg:items-start lg:justify-center"
        ref={containerRef}
      >
        <div className="max-w-[800px] flex-col items-start justify-center self-center pt-20 max-lg:flex md:pt-0 lg:self-start">
          <h1 className="banner-title slide-up-and-fade text-6xl font-medium tracking-tight leading-[.95] sm:text-[100px] text-white">
            <span className="text-primary block">NEVER GONNA</span>
            <span className="block italic">STOP.</span>
          </h1>

          <div className="mt-8 max-w-xl">
            <ShinyText
              className="slide-up-and-fade cursor text-xl md:text-2xl font-light text-gray-300"
              text={theatreOfDreams.inspirationalMessage}
            />
          </div>

          <div className="flex gap-4 mt-10 slide-up-and-fade">
            <Magnet magnetStrength={4}>
              <Button
                as="button"
                variant="primary"
                className="banner-Button px-10 py-4 uppercase tracking-[1.4px] text-sm font-bold bg-primary text-white border-none"
              >
                Explore My Work
              </Button>
            </Magnet>

            <Magnet magnetStrength={4}>
              <Button
                as="button"
                variant="outline"
                className="banner-Button px-10 py-4 uppercase tracking-[1.4px] text-sm font-bold border-white text-white bg-transparent"
              >
                Contact Me
              </Button>
            </Magnet>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 slide-up-and-fade text-white/30 text-xs tracking-[4px] uppercase font-bold animate-pulse">
          Theatre of Dreams
        </div>
      </div>
    </section>
  );
}
