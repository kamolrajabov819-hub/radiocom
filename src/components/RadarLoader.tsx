export function RadarLoader({ size = 24 }: { size?: number }) {
  return (
    <span
      className="relative inline-block"
      style={{ width: size, height: size }}
      aria-label="loading"
    >
      <span className="absolute inset-0 rounded-full border border-signal/30" />
      <span className="absolute inset-1 rounded-full border border-signal/50" />
      <span
        className="radar-arc absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, var(--signal) 60deg, transparent 90deg)`,
          borderRadius: "50%",
          maskImage: "radial-gradient(circle, transparent 30%, black 31%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 30%, black 31%)",
        }}
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-signal" />
    </span>
  );
}
