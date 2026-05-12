"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { portfolioData } from "@/src/data/portfolio";
import {
  ensureNotificationAudio,
  isSharedAudioUnlocked,
  SHARED_AUDIO_UNLOCKED_EVENT
} from "@/src/lib/shared-audio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { theatreOfDreams: tod } = portfolioData;
const MUSIC_START_VOLUME = 0.08;
const MUSIC_NORMAL_VOLUME = 0.82;

export default function TheatreOfDreams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const childImageRef = useRef<HTMLDivElement>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicTweenRef = useRef<gsap.core.Tween | null>(null);
  const isInTheatreRef = useRef(false);
  const isMusicOffRef = useRef(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const getMusicAudio = useCallback(() => {
    const audio = ensureNotificationAudio();
    const musicSrc = new URL("/manchester_united.mp3", window.location.href)
      .href;

    if (audio.src !== musicSrc) {
      audio.src = musicSrc;
    }

    audio.loop = true;
    audio.preload = "auto";
    musicAudioRef.current = audio;

    return audio;
  }, []);

  const playMusic = useCallback(async () => {
    if (isMusicOffRef.current) return;

    if (!isSharedAudioUnlocked()) {
      setIsMusicPlaying(false);
      return;
    }

    const audio = getMusicAudio();

    musicTweenRef.current?.kill();
    audio.volume = audio.paused
      ? MUSIC_START_VOLUME
      : Math.min(audio.volume, MUSIC_NORMAL_VOLUME);

    try {
      await audio.play();
      setIsMusicPlaying(true);
      musicTweenRef.current = gsap.to(audio, {
        volume: MUSIC_NORMAL_VOLUME,
        duration: 3.6,
        ease: "power2.out",
        overwrite: true
      });
    } catch {
      setIsMusicPlaying(false);
    }
  }, [getMusicAudio]);

  const stopMusic = useCallback((markAsOff = true) => {
    const audio = musicAudioRef.current;

    if (markAsOff) {
      isMusicOffRef.current = true;
      setIsMusicEnabled(false);
    }

    if (!audio) return;

    musicTweenRef.current?.kill();
    setIsMusicPlaying(false);
    musicTweenRef.current = gsap.to(audio, {
      volume: 0,
      duration: 0.7,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        audio.pause();
      }
    });
  }, []);

  const toggleMusic = useCallback(() => {
    if (isMusicEnabled) {
      stopMusic();
      return;
    }

    isMusicOffRef.current = false;
    setIsMusicEnabled(true);
    void playMusic();
  }, [isMusicEnabled, playMusic, stopMusic]);

  useEffect(() => {
    const handleAudioUnlocked = () => {
      if (!isInTheatreRef.current || isMusicOffRef.current) {
        return;
      }

      void playMusic();
    };

    window.addEventListener(SHARED_AUDIO_UNLOCKED_EVENT, handleAudioUnlocked);

    return () => {
      window.removeEventListener(
        SHARED_AUDIO_UNLOCKED_EVENT,
        handleAudioUnlocked
      );
    };
  }, [playMusic]);

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

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom top",
        invalidateOnRefresh: true,
        onEnter: () => {
          isInTheatreRef.current = true;
          void playMusic();
        },
        onEnterBack: () => {
          isInTheatreRef.current = true;
          void playMusic();
        },
        onLeave: () => {
          isInTheatreRef.current = false;
          stopMusic(false);
        },
        onLeaveBack: () => {
          isInTheatreRef.current = false;
          stopMusic(false);
        }
      });

      return () => {
        musicTweenRef.current?.kill();
        musicAudioRef.current?.pause();
      };
    },
    { scope: containerRef, dependencies: [playMusic, stopMusic] }
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

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isMusicEnabled ? "Turn off music" : "Turn on music"}
        aria-pressed={isMusicEnabled}
        className={`group absolute bottom-6 right-5 z-20 grid size-[3.75rem] place-items-center overflow-hidden rounded-full border text-white shadow-[0_16px_42px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/70 sm:bottom-8 sm:right-8 sm:size-[4.25rem] ${
          isMusicEnabled
            ? "border-primary/70 bg-primary/20 hover:border-[#ffc72c]/80"
            : "border-white/20 bg-[#181818]/50 hover:border-white/45 hover:bg-white/10"
        }`}
      >
        <span
          className={`absolute inset-[-35%] rounded-full bg-[conic-gradient(from_0deg,rgba(218,41,28,0),rgba(218,41,28,0.85),rgba(255,199,44,0.75),rgba(218,41,28,0))] opacity-70 blur-[1px] transition duration-500 ${
            isMusicEnabled ? "animate-spin [animation-duration:8s]" : "opacity-20"
          }`}
        />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.24),transparent_32%),radial-gradient(circle_at_68%_78%,rgba(255,199,44,0.32),transparent_45%),linear-gradient(145deg,rgba(24,24,24,0.2),rgba(24,24,24,0.78))]" />
        {isMusicEnabled && (
          <span className="absolute inset-1 rounded-full border border-primary/55 shadow-[0_0_28px_rgba(218,41,28,0.5)] animate-pulse" />
        )}
        <span className="absolute inset-[6px] rounded-full border border-white/15" />
        <span className="relative grid size-10 place-items-center rounded-full bg-black/35 shadow-inner shadow-white/10 sm:size-11">
          {isMusicEnabled ? (
            <Volume2
              className={`size-5 text-[#ffc72c] drop-shadow-[0_0_10px_rgba(255,199,44,0.8)] transition duration-300 sm:size-6 ${
                isMusicPlaying ? "scale-110" : ""
              }`}
            />
          ) : (
            <VolumeX className="size-5 text-white/85 sm:size-6" />
          )}
        </span>
      </button>
    </section>
  );
}
