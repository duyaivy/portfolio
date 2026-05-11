import { Suspense } from "react";
import { Toaster } from "@/src/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>{children}</Suspense>
      <Toaster />
    </>
  );
}
