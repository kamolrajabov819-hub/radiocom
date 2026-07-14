import type { Transition } from "framer-motion";

export const spring: Transition = { type: "spring", stiffness: 100, damping: 20 };
export const springSoft: Transition = { type: "spring", stiffness: 80, damping: 22 };
export const springFast: Transition = { type: "spring", stiffness: 180, damping: 22 };
export const easeOut: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: spring,
};
