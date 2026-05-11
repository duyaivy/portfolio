"use client";

import { useEffect, useState } from "react";

import Button from "@/src/components/button";
import Cursor from "@/src/components/cursor";

const animations = [
  "float",
  "floatReverse",
  "float2",
  "floatReverse2"
] as const;

type Particle = {
  char: "0" | "4";
  style: React.CSSProperties;
};

export default function NotFoundContent() {
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    const arr: Particle[] = Array.from({ length: 80 }, (_, i) => {
      const char: "0" | "4" = i < 40 ? "0" : "4";
      const size = Math.floor(Math.random() * 20) + 10;
      const blur = i * 0.02;
      const speed = Math.floor(Math.random() * 20) + 20;
      const delay = Math.floor(Math.random() * 10) * 0.1;
      const anim = animations[Math.floor(Math.random() * animations.length)];

      return {
        char,
        style: {
          top: `${((Math.random() * 100) / (100 + size / 8)) * 100}%`,
          left: `${((Math.random() * 100) / (100 + size / 10)) * 100}%`,
          fontSize: `${size}px`,
          filter: `blur(${blur}px)`,
          animation: `${speed}s ${anim} infinite`,
          animationDelay: `${delay}s`
        }
      };
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(arr);
  }, []);

  if (!particles) {
    return null;
  }

  return (
    <div className="relative mx-auto grid h-screen place-items-center overflow-hidden px-8 text-center">
      <Cursor />

      {particles.map((item, i) => (
        <span
          key={i}
          className="pointer-events-none absolute block opacity-15"
          style={item.style}
        >
          {item.char}
        </span>
      ))}

      <div>
        <h1 className="mt-10 text-4xl leading-snug text-white uppercase tracking-tighter">
          404 <br /> <span className="text-primary italic">Lost</span> in the
          dreams.
        </h1>
        <Button as="link" href="/" variant="primary" className="mt-12">
          Back Home
        </Button>
      </div>
    </div>
  );
}
