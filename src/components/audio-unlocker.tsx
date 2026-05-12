"use client";

import { useAudioUnlock } from "@/src/hooks/use-audio-unlock";

export default function AudioUnlocker() {
  useAudioUnlock();

  return null;
}
