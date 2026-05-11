import { Analytics } from "@vercel/analytics/next";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import type { Metadata } from "next";

import ScrollTriggerSync from "@/src/components/scroll-trigger-sync";
import Providers from "@/src/providers/providers";
import "@/src/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "duyaivy | %s",
    default: "Full Stack Developer"
  },
  description:
    "Portfolio of Quoc Duy, a 3rd-year Full Stack Developer student at DUT. Specializing in React, Next.js, and modern web solutions.",
  metadataBase: new URL("https://duyaivy.id.vn"),
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="relative overflow-x-clip bg-[#181818] font-sans text-white antialiased select-none"
      >
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.4
          }}
        >
          <main>
            <ScrollTriggerSync />
            <Providers>{children}</Providers>
          </main>
        </ReactLenis>
        <Analytics />
      </body>
    </html>
  );
}
