import Link from "next/link";
import { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  as?: "link" | "button";
  children: ReactNode | ReactNode[];
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "link";
} & (ComponentProps<typeof Link> | ButtonProps);

export default function Button({
  variant = "primary",
  className,
  children,
  as = "link",
  ...rest
}: Props) {
  const variantClasses = {
    primary: `bg-primary text-white hover:bg-primary-dark`,
    secondary: `bg-[#303030] text-white hover:bg-[#404040]`,
    outline: `bg-transparent border border-white text-white hover:bg-white hover:text-black`,
    link: `text-white hover:text-primary underline-offset-4 hover:underline`,
  }[variant];

  const buttonClasses = cn(
    `group h-12 px-10 inline-flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-[1.4px] outline-none transition-all duration-300 rounded-none relative overflow-hidden`,
    variantClasses,
    className
  );

  if (as === "link") {
    const props = rest as ComponentProps<typeof Link>;
    return (
      <Link
        className={buttonClasses}
        {...props}
        href={props.href?.toString() || "#"}
      >
        <span className="z-10">{children}</span>
      </Link>
    );
  } else {
    const props = rest as ButtonProps;
    return (
      <button className={buttonClasses} {...props}>
        <span className="z-10">{children}</span>
      </button>
    );
  }
}
