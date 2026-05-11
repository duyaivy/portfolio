"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

export default function ScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    const refresh = () => ScrollTrigger.refresh();

    lenis.on("scroll", update);
    window.addEventListener("load", refresh);

    const firstRefresh = window.setTimeout(refresh, 350);
    const secondRefresh = window.setTimeout(refresh, 1600);

    return () => {
      lenis.off("scroll", update);
      window.removeEventListener("load", refresh);
      window.clearTimeout(firstRefresh);
      window.clearTimeout(secondRefresh);
    };
  }, [lenis]);

  return null;
}
