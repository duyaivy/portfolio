"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";
import { projects } from "@/src/data/portfolio";
import GithubLinks from "@/src/components/github-links";
import SectionTitle from "@/src/components/section-title";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProjectList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const projectItems = containerRef.current?.querySelectorAll(".project-card");
      if (!projectItems?.length) return;

      gsap.from(projectItems, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-20" id="selected-projects">
      <div className="container">
        <SectionTitle title="What I Build" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20" ref={containerRef}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative bg-[#303030] overflow-hidden border border-[#303030] hover:border-primary transition-all duration-500"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-medium text-white uppercase tracking-tight">{project.title}</h3>
                  <span className="text-primary font-bold text-xs tracking-widest">{(index + 1).toString().padStart(2, '0')}</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-[#181818] text-gray-400 border border-gray-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  <GithubLinks links={project.links.github} compact />
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xs uppercase tracking-[2px] font-bold border-b border-white hover:text-primary hover:border-primary transition-all"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
