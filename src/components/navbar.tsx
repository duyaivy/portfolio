"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { personalInfo } from "@/src/data/portfolio";
import { cn } from "@/src/lib/utils";

const MENU_LINKS = [
  {
    name: "About Me",
    url: "#about-me"
  },
  {
    name: "My Experience",
    url: "#my-experience"
  },
  {
    name: "Tech Stack",
    url: "#my-stack"
  },
  {
    name: "My Projects",
    url: "#selected-projects"
  },
  {
    name: "My Theatre of Dreams",
    url: "#theatre-of-dreams"
  },
  {
    name: "Get in Touch",
    url: "#contact"
  }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (target: string) => {
    const isHome = pathname === "/" || pathname === "";

    if (!isHome) {
      if (target === "#") {
        router.push("/");
      } else {
        router.push("/");
        if (lenis)
          setTimeout(() => {
            lenis.scrollTo(target, { offset: -30 });
          }, 1000);
      }
      return;
    }

    if (!lenis) return;

    if (target === "#") {
      lenis.scrollTo(0);
    } else {
      lenis.scrollTo(target, { offset: -50 });
    }
  };

  return (
    <>
      <nav className="fixed top-0 right-0 z-[120]">
        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          className={cn(
            "group fixed top-5 right-5 z-[120] size-12 cursor-pointer md:right-10"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={cn(
              "absolute top-1/2 left-1/2 inline-block h-0.5 w-3/5 -translate-x-1/2 -translate-y-[5px] rounded-full bg-white duration-300",
              {
                "-translate-y-1/2 rotate-45": isMenuOpen,
                "md:group-hover:rotate-12": !isMenuOpen
              }
            )}
          ></span>
          <span
            className={cn(
              "absolute top-1/2 left-1/2 inline-block h-0.5 w-3/5 -translate-x-1/2 translate-y-[5px] rounded-full bg-white duration-300",
              {
                "-translate-y-1/2 -rotate-45": isMenuOpen,
                "md:group-hover:-rotate-12": !isMenuOpen
              }
            )}
          ></span>
        </button>
      </nav>

      <div
        id="site-menu"
        className={cn(
          "overlay fixed inset-0 z-[90] overflow-x-clip bg-black/70 transition-all duration-150",
          {
            "pointer-events-none invisible opacity-0": !isMenuOpen
          }
        )}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div
        className={cn(
          "fixed top-0 right-0 left-0 z-[100] h-svh translate-x-full transform overflow-x-hidden overflow-y-auto border-l border-white/10 bg-[#141414] text-white shadow-[-30px_0_90px_rgba(0,0,0,0.5)] transition-transform duration-700 sm:left-auto sm:w-[520px] sm:max-w-[calc(100vw-2rem)]",
          "flex flex-col px-6 py-10 sm:px-12",
          { "translate-x-0": isMenuOpen }
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(218,41,28,0.22),transparent_32%)]" />

        <div className="relative z-10 flex min-h-full flex-col gap-7 pt-14 sm:gap-8 sm:pt-20">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[2px] text-primary">
              Menu
            </p>
            <ul className="space-y-3">
              {MENU_LINKS.map((link, idx) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      handleClick(link.url);
                      setIsMenuOpen(false);
                    }}
                    className="group flex w-full items-baseline gap-4 text-left"
                  >
                    <span className="w-7 shrink-0 text-sm font-bold text-white/35 transition-colors group-hover:text-primary sm:w-8">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <span className="min-w-0 text-xl font-medium leading-tight tracking-tight text-white transition-colors group-hover:text-primary sm:text-3xl">
                      {link.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[2px] text-primary">
              Socials
            </p>
            <ul className="flex flex-col gap-3">
              {personalInfo.socials.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm font-bold uppercase tracking-[1.6px] text-white/75 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[2px] text-primary">
              Get in Touch
            </p>
            <a
              className="break-all text-lg text-white transition-colors hover:text-primary"
              href={`mailto:${personalInfo.email}`}
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
