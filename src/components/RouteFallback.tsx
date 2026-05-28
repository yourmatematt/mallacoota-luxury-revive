const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-live="polite">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  </div>
);

export default RouteFallback;
