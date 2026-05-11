"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import { experiences } from "@/src/data/portfolio";

import SectionTitle from "./section-title";
import ShinyText from "./shiny-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MONTHS: Record<string, string> = {
  january: "JAN",
  february: "FEB",
  march: "MAR",
  april: "APR",
  may: "MAY",
  june: "JUN",
  july: "JUL",
  august: "AUG",
  september: "SEP",
  october: "OCT",
  november: "NOV",
  december: "DEC"
};

const formatDatePart = (datePart: string) => {
  const normalized = datePart.trim();

  if (/present/i.test(normalized)) return "NOW";

  return normalized.replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/gi,
    (month) => MONTHS[month.toLowerCase()] ?? month
  );
};

const getDisplayTime = (period: string) => {
  const parts = period.split(" - ").map(formatDatePart);
  return parts.join(" / ");
};

export default function Experiences() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = containerRef.current?.querySelector(".career-timeline");
      const items = containerRef.current?.querySelectorAll(".career-info-box");

      if (!timeline || !items?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1
        }
      });

      tl.to(timeline, { height: "100%", ease: "none" }, 0).from(
        items,
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out"
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      className="career-section section-container"
      id="my-experience"
      ref={containerRef}
    >
      <div className="career-container">
        <SectionTitle
          title="My Experience"
          center
          className="career-section-title"
        />
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <h3 className="text-white">{getDisplayTime(exp.period)}</h3>
                <div className="career-role">
                  {exp.organizationUrl ? (
                    <a
                      href={exp.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-fit text-primary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#181818]"
                    >
                      {exp.organization}
                    </a>
                  ) : (
                    <p>{exp.organization}</p>
                  )}
                  <h4>{exp.role}</h4>
                </div>
              </div>
              <ShinyText text={exp.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
