import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function MagneticButton({ children, variant = "solid", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const tx = useTransform(sx, (v) => v);
  const ty = useTransform(sy, (v) => v);

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 px-8 py-4 text-mono text-[13px] font-medium transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-signal text-crisp hover:bg-signal/90"
      : "border border-crisp/40 text-crisp hover:border-signal hover:text-signal";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: tx, y: ty }}
      className={`${base} ${styles} ${className}`}
      {...(rest as any)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
