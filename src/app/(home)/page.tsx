import { Metadata } from "next";

import AboutMe from "@/src/components/about-me";
import ContactMe from "@/src/components/contact-me";
import Experiences from "@/src/components/experiences";
import Flipbook from "@/src/components/flipbook";
import Skills from "@/src/components/skills";
import TheatreOfDreams from "@/src/components/theatre-of-dreams";

export const metadata: Metadata = {
  title: "Full Stack Developer",
  description:
    "Portfolio of Nguyen Quoc Duy, a 3rd-year Full Stack Developer student at DUT specializing in React, Next.js, and high-performance web experiences.",
  keywords: [
    "Nguyen Quoc Duy",
    "Full Stack Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Development",
    "DUT Student",
    "Web Performance",
    "UI/UX",
    "Da Nang University of Science and Technology",
    "DUT IT student"
  ],
  openGraph: {
    title: "Nguyen Quoc Duy | Full Stack Developer",
    description:
      "Portfolio of Nguyen Quoc Duy, a 3rd-year Full Stack Developer student at DUT.",
    type: "website"
  }
};

export default function Home() {
  return (
    <div className="bg-[#181818]">
      <AboutMe />
      <Experiences />
      <Skills />
      <Flipbook />
      <TheatreOfDreams />
      <ContactMe />
    </div>
  );
}
