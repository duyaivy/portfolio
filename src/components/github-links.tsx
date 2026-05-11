"use client";

import {
  Bot,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Monitor,
  Server,
  Smartphone
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/src/lib/utils";
import type { GithubLink, GithubLinkType } from "@/src/types";

type GithubLinksProps = {
  links: GithubLink[];
  className?: string;
  compact?: boolean;
};

const typeStyles: Record<
  GithubLinkType,
  {
    label: string;
    icon: typeof Code2;
    className: string;
  }
> = {
  fe: {
    label: "FE",
    icon: Code2,
    className: "border-blue-400/30 bg-blue-400/10 text-blue-300"
  },
  be: {
    label: "BE",
    icon: Server,
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
  },
  ai: {
    label: "AI",
    icon: Bot,
    className: "border-primary/40 bg-primary/10 text-primary"
  },
  mobile: {
    label: "APP",
    icon: Smartphone,
    className: "border-violet-400/30 bg-violet-400/10 text-violet-300"
  },
  desktop: {
    label: "DESKTOP",
    icon: Monitor,
    className: "border-white/20 bg-white/10 text-white"
  }
};

const POPOVER_WIDTH = 320;
const VIEWPORT_GAP = 16;
const BUTTON_GAP = 12;

export default function GithubLinks({
  links,
  className,
  compact = false
}: GithubLinksProps) {
  const [open, setOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({
    left: VIEWPORT_GAP,
    maxHeight: 420,
    top: VIEWPORT_GAP,
    transformOrigin: "top left"
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const validLinks = links.filter((link) => link.url);

  useEffect(() => {
    if (!open) return;

    const updatePopoverPosition = () => {
      const trigger = wrapperRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const estimatedHeight = Math.min(420, 53 + validLinks.length * 66);
      const left = Math.min(
        Math.max(VIEWPORT_GAP, rect.left),
        window.innerWidth - POPOVER_WIDTH - VIEWPORT_GAP
      );
      const spaceBelow = window.innerHeight - rect.bottom - BUTTON_GAP - VIEWPORT_GAP;
      const spaceAbove = rect.top - BUTTON_GAP - VIEWPORT_GAP;
      const openUp = spaceBelow < Math.min(estimatedHeight, 260) && spaceAbove > spaceBelow;
      const top = openUp
        ? Math.max(VIEWPORT_GAP, rect.top - BUTTON_GAP - estimatedHeight)
        : rect.bottom + BUTTON_GAP;
      const maxHeight = Math.max(
        180,
        openUp ? rect.top - BUTTON_GAP - VIEWPORT_GAP : window.innerHeight - top - VIEWPORT_GAP
      );

      setPopoverStyle({
        left,
        maxHeight,
        top,
        transformOrigin: openUp ? "bottom left" : "top left"
      });
    };

    updatePopoverPosition();
    window.addEventListener("resize", updatePopoverPosition);
    window.addEventListener("scroll", updatePopoverPosition, true);

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition, true);
    };
  }, [open, validLinks.length]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        !wrapperRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!validLinks.length) return null;

  if (validLinks.length === 1) {
    return (
      <a
        href={validLinks[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex h-11 items-center gap-2 border border-white/20 bg-[#181818] px-4 text-[11px] font-bold uppercase tracking-[1.6px] text-white transition-all hover:border-primary hover:text-primary",
          compact &&
          "h-auto border-0 border-b border-white bg-transparent px-0 py-0 text-xs tracking-[2px] hover:border-primary",
          className
        )}
      >
        <Github size={compact ? 14 : 15} />
        Source Code
      </a>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-flex", className)}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-11 items-center gap-2 border border-white/20 bg-[#181818] px-4 text-[11px] font-bold uppercase tracking-[1.6px] text-white transition-all hover:border-primary hover:text-primary",
          open && "border-primary text-primary",
          compact &&
          "h-auto border-0 border-b border-white bg-transparent px-0 py-0 text-xs tracking-[2px] hover:border-primary"
        )}
      >
        <Github size={compact ? 14 : 15} />
        Source Code
        <ChevronDown
          size={compact ? 13 : 15}
          className={cn("transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {typeof document !== "undefined"
        ? createPortal(
          <div
            ref={popoverRef}
            style={{
              left: popoverStyle.left,
              maxHeight: popoverStyle.maxHeight,
              top: popoverStyle.top,
              transformOrigin: popoverStyle.transformOrigin,
              width: POPOVER_WIDTH
            }}
            className={cn(
              "fixed z-[9999] overflow-hidden border border-white/10 bg-[#141414]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300",
              "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,70,18,0.18),transparent_38%,rgba(48,129,255,0.12))]",
              open
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            )}
          >
            <div className="relative max-h-[inherit] overflow-y-auto border border-white/10 bg-[#181818]/80">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
                  Select Repository
                </span>
                <span className="text-[10px] font-bold text-white/35">
                  {validLinks.length} parts
                </span>
              </div>

              <div className="p-1.5">
                {validLinks.map((link) => {
                  const style = typeStyles[link.type ?? "desktop"];
                  const Icon = style.icon;

                  return (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 border border-transparent px-3 py-3 transition-all hover:border-primary/40 hover:bg-primary/10"
                    >
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center border",
                          style.className
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold uppercase tracking-[1.2px] text-white group-hover:text-primary">
                          {link.label}
                        </span>

                      </span>
                      <ExternalLink
                        size={14}
                        className="shrink-0 text-white/35 transition-colors group-hover:text-primary"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )
        : null}
    </div>
  );
}
