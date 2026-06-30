export function SmokeEffect({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-bar-smoke/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-bar-burgundy/20 rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-bar-amber/5 rounded-full blur-3xl" />
    </div>
  );
}
