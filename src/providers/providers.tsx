import { Suspense } from "react";
import AudioUnlocker from "@/src/components/audio-unlocker";
import { Toaster } from "@/src/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AudioUnlocker />
      <Suspense>{children}</Suspense>
      <Toaster />
    </>
  );
}
