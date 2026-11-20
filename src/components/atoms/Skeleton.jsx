export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-zinc-100 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}
