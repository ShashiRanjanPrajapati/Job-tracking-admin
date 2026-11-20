export default function Card({
  children,
  className = "",
  hoverable = false,
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-zinc-200/80 shadow-2xs ${
        hoverable ? "hover:border-zinc-300 hover:shadow-xs transition-all duration-150" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
