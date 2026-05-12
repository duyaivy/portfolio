let isUnlocked = false;
let unlockAudioEl: HTMLAudioElement | null = null;
let playbackAudioEl: HTMLAudioElement | null = null;
let notificationAudioEl: HTMLAudioElement | null = null;

export const SHARED_AUDIO_UNLOCKED_EVENT = "shared-audio-unlocked";

export function ensureSharedAudio(): HTMLAudioElement {
  if (!playbackAudioEl) {
    const audio = document.createElement("audio");
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.style.display = "none";
    document.body.appendChild(audio);
    playbackAudioEl = audio;
  }
  return playbackAudioEl;
}

export function ensureNotificationAudio(): HTMLAudioElement {
  if (!notificationAudioEl) {
    const audio = document.createElement("audio");
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.style.display = "none";
    audio.loop = true;
    document.body.appendChild(audio);
    notificationAudioEl = audio;
  }
  return notificationAudioEl;
}

export function isSharedAudioUnlocked(): boolean {
  return isUnlocked;
}

function markSharedAudioUnlocked() {
  if (isUnlocked) {
    return;
  }

  isUnlocked = true;
  window.dispatchEvent(new Event(SHARED_AUDIO_UNLOCKED_EVENT));
}

export async function unlockSharedAudioOnce(): Promise<void> {
  if (isUnlocked) {
    return;
  }

  if (!unlockAudioEl) {
    unlockAudioEl = document.createElement("audio");
    unlockAudioEl.style.display = "none";
    unlockAudioEl.setAttribute("playsinline", "true");
    document.body.appendChild(unlockAudioEl);
  }

  try {
    // Unlock the context by briefly playing a silent clip.
    // Safari iOS only considers the context "user activated" once the promise
    // from play() resolves, so playSilentClip explicitly waits a short window
    // before cleaning up to guarantee the first POI can autoplay.
    await playSilentClip(unlockAudioEl, {
      removeSrc: true,
      resetMute: true,
      label: "unlock"
    });

    if (playbackAudioEl) {
      await playSilentClip(playbackAudioEl, {
        removeSrc: true,
        label: "playback",
        resetMute: true
      });
    }

    // Ensure notification audio element exists before unlocking
    if (!notificationAudioEl) {
      notificationAudioEl = document.createElement("audio");
      notificationAudioEl.style.display = "none";
      notificationAudioEl.setAttribute("playsinline", "true");
      document.body.appendChild(notificationAudioEl);
    }

    // Only unlock notificationAudioEl if it's not currently being used for ambient audio
    // If it has a src, it means ambient audio is playing and we shouldn't interfere
    const hasSrc = notificationAudioEl.src && notificationAudioEl.src !== "";
    if (!hasSrc) {
      await playSilentClip(notificationAudioEl, {
        removeSrc: true,
        label: "notification",
        resetMute: true
      });
    }

    markSharedAudioUnlocked();
  } catch (err) {
    console.warn("[SharedAudio] Unlock failed:", err);
  }
}

type PlaySilentOptions = {
  removeSrc?: boolean;
  resetMute?: boolean;
  label: "unlock" | "playback" | "notification";
};

async function playSilentClip(
  el: HTMLAudioElement,
  { removeSrc = false, resetMute = false, label }: PlaySilentOptions
): Promise<boolean> {
  const silentWav =
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

  el.muted = true;
  el.src = silentWav;

  // Fire the play request to satisfy browser gesture requirements, but wrap
  // it so we can still proceed even if the element refuses to play (e.g. when
  // already unlocked).
  let playSucceeded = false;
  const playPromise = el
    .play()
    .then(() => {
      playSucceeded = true;
    })
    .catch((err) => {
      console.warn(`[SharedAudio] ${label} play failed`, err);
      playSucceeded = false;
    });

  // Wait for either the play promise to settle or a short timeout. Safari iOS
  // sometimes never resolves play() when we immediately pause, so this race
  // guarantees we move on while still giving the platform ~200 ms to mark the
  // audio context as unlocked.
  await Promise.race([
    playPromise,
    new Promise((resolve) => setTimeout(resolve, 200))
  ]);

  el.pause();
  el.currentTime = 0;

  if (removeSrc) {
    el.removeAttribute("src");
  }

  if (resetMute) {
    el.muted = false;
  }

  // Return true if play succeeded, false otherwise
  // If timeout occurred, we assume it might have worked (Safari iOS quirk)
  // but return false to be safe - the caller can decide
  return playSucceeded;
}

export function waitForSharedAudioUnlock(timeoutMs = 1500): Promise<void> {
  if (isUnlocked) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const t = setTimeout(() => resolve(), timeoutMs);

    const checkUnlocked = () => {
      if (isUnlocked) {
        clearTimeout(t);
        resolve();
      } else {
        setTimeout(checkUnlocked, 50);
      }
    };

    checkUnlocked();
  });
}
