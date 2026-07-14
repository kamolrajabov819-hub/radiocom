import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "accent";
type Size = "md" | "sm";

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const variantClass: Record<Variant, string> = {
  primary: "pill-primary",
  ghost: "pill-ghost",
  accent: "pill-accent",
};

export const Pill = forwardRef<HTMLButtonElement, PillProps>(function Pill(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn("pill", variantClass[variant], size === "sm" && "pill-sm", className)}
      {...props}
    >
      {children}
    </button>
  );
});
