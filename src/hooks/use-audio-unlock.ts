import {
  SHARED_AUDIO_UNLOCKED_EVENT,
  ensureSharedAudio,
  isSharedAudioUnlocked,
  unlockSharedAudioOnce
} from "../lib/shared-audio";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioUnlock() {
  const isUnlockingRef = useRef(false);
  const cleanupFnRef = useRef<(() => void) | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(isSharedAudioUnlocked);

  const handleUnlock = useCallback(async () => {
    if (isUnlockingRef.current || isSharedAudioUnlocked()) {
      return;
    }

    isUnlockingRef.current = true;

    try {
      await unlockSharedAudioOnce();

      if (isSharedAudioUnlocked() && cleanupFnRef.current) {
        setIsUnlocked(true);
        cleanupFnRef.current();
        cleanupFnRef.current = null;
      }
    } catch (error) {
      console.warn("[useAudioUnlock] Unlock failed:", error);
    } finally {
      isUnlockingRef.current = false;
    }
  }, []);

  useEffect(() => {
    ensureSharedAudio();

    const handleUnlocked = () => {
      setIsUnlocked(true);

      if (cleanupFnRef.current) {
        cleanupFnRef.current();
        cleanupFnRef.current = null;
      }
    };

    window.addEventListener(SHARED_AUDIO_UNLOCKED_EVENT, handleUnlocked);

    if (isSharedAudioUnlocked()) {
      return () => {
        window.removeEventListener(SHARED_AUDIO_UNLOCKED_EVENT, handleUnlocked);
      };
    }

    const unlockEvents = [
      "pointerdown",
      "touchend",
      "mousedown",
      "click",
      "keydown"
    ] as const;

    const handleUnlockWrapper = () => {
      handleUnlock();
    };

    unlockEvents.forEach((event) => {
      document.addEventListener(event, handleUnlockWrapper, {
        passive: true,
        once: false
      });
    });

    cleanupFnRef.current = () => {
      unlockEvents.forEach((event) => {
        document.removeEventListener(event, handleUnlockWrapper);
      });
    };

    return () => {
      window.removeEventListener(SHARED_AUDIO_UNLOCKED_EVENT, handleUnlocked);

      if (cleanupFnRef.current) {
        cleanupFnRef.current();
        cleanupFnRef.current = null;
      }
    };
  }, [handleUnlock]);

  return {
    isUnlocked
  };
}
