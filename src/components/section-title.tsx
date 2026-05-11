import { cn } from "@/src/lib/utils";

import SectionFlower from "./section-flower";

interface Props {
  classNames?: {
    icon?: string;
    title?: string;
  };
  className?: string;
  title: string;
  center?: boolean;
}

export default function SectionTitle({ title, classNames, className }: Props) {
  return (
    <div
      className={cn(
        "mb-12 flex items-center justify-start gap-5 text-right",
        className
      )}
    >
      <SectionFlower
        width={25}
        className={cn("animate-spin duration-7000", classNames?.icon)}
      />
      <h2
        className={cn(
          "text-sm font-bold uppercase tracking-[4px] text-gray-300",
          classNames?.title
        )}
      >
        {title}
      </h2>
    </div>
  );
}
