import { personalInfo } from "@/src/data/portfolio";

export default function StickyEmail() {
  return (
    <div className="fixed bottom-10 left-10 z-40 block max-xl:hidden">
      <a
        href={`mailto:${personalInfo.email}`}
        className="px-3 text-xs font-bold tracking-[4px] text-gray-300 transition-colors hover:text-primary"
        style={{
          textOrientation: "mixed",
          writingMode: "vertical-rl"
        }}
      >
        {personalInfo.email}
      </a>
    </div>
  );
}
