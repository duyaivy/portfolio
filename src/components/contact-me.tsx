"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

import Button from "@/src/components/button";
import Magnet from "@/src/components/magnet";
import SectionTitle from "@/src/components/section-title";
import { personalInfo } from "@/src/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message.");
      }

      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent. Please check your inbox.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      const copy = ".contact-copy";
      const form = ".contact-form";
      const bgWord = bgWordRef.current;
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      if (!bgWord) return;

      gsap.set(copy, {
        autoAlpha: 0,
        xPercent: isDesktop ? -22 : 0,
        y: isDesktop ? 0 : 40
      });
      gsap.set(form, {
        autoAlpha: 0,
        xPercent: isDesktop ? 22 : 0,
        y: isDesktop ? 0 : 40
      });
      gsap.set(bgWord, {
        autoAlpha: 0,
        x: () => -window.innerWidth,
        force3D: true
      });

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 76%",
          end: "bottom 24%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true
        }
      });

      contentTl
        .to(copy, {
          autoAlpha: 1,
          xPercent: 0,
          y: 0,
          duration: 1,
          force3D: true,
          ease: "power3.out"
        })
        .to(
          form,
          {
            autoAlpha: 1,
            xPercent: 0,
            y: 0,
            duration: 1,
            force3D: true,
            ease: "power3.out"
          },
          "-=0.75"
        );

      gsap.to(bgWord, {
        autoAlpha: 1,
        x: 0,
        duration: 1.15,
        force3D: true,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bgWord,
          start: "top 88%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      className="relative py-20 pb-64 bg-[#181818] min-h-screen"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,70,18,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(48,129,255,0.1),transparent_26%)]" />

      <div className="container ">
        <SectionTitle title="Get in Touch" center />

        <div className="grid md:grid-cols-12 gap-16 mt-20">
          <div className="md:col-span-5 contact-copy">
            <h2 className="text-4xl md:text-6xl font-medium text-white leading-tight uppercase tracking-tight mb-8">
              Let&apos;s build something{" "}
              <span className="text-primary italic">extraordinary</span>{" "}
              together.
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[2px] text-gray-300 font-bold mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-2xl text-white hover:text-primary transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex gap-6 mt-12">
              {personalInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm uppercase tracking-[2px] font-bold border-b border-white hover:text-primary hover:border-primary transition-all"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 contact-form">
            <form
              className="space-y-8 bg-[#303030] p-10 border border-[#303030]"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs uppercase tracking-[2px] text-gray-400 font-bold"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Cristiano Ronaldo"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    maxLength={120}
                    autoComplete="name"
                    className="w-full bg-[#181818] border-none p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs uppercase tracking-[2px] text-gray-400 font-bold"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="ronaldo@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    maxLength={180}
                    autoComplete="email"
                    className="w-full bg-[#181818] border-none p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs uppercase tracking-[2px] text-gray-400 font-bold"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Let's build something amazing together..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  maxLength={4000}
                  className="w-full bg-[#181818] border-none p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                ></textarea>
              </div>

              <Magnet magnetStrength={2}>
                <Button
                  as="button"
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full md:w-auto px-12 py-4 bg-primary text-white uppercase tracking-[2px] font-bold text-sm border-none disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Magnet>
            </form>
          </div>
        </div>
      </div>

      <div
        id="bgWord"
        ref={bgWordRef}
        className="pointer-events-none absolute bottom-8 right-8 z-0 select-none whitespace-nowrap text-[14vw] font-bold lowercase leading-none text-white/6"
      >
        {personalInfo.backgroundWord}
      </div>
    </section>
  );
}
