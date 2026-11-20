export default function Badge({
  children,
  variant = "default",
  size = "sm",
  dot = true,
  className = "",
}) {
  const variantStyles = {
    applied: {
      wrapper: "bg-blue-50/80 text-blue-700 border-blue-200/70",
      dot: "bg-blue-500",
    },
    Interview: {
      wrapper: "bg-amber-50/80 text-amber-800 border-amber-200/70",
      dot: "bg-amber-500",
    },
    Offer: {
      wrapper: "bg-emerald-50/80 text-emerald-800 border-emerald-200/70",
      dot: "bg-emerald-500",
    },
    Rejected: {
      wrapper: "bg-zinc-100 text-zinc-600 border-zinc-200/80",
      dot: "bg-zinc-400",
    },
    neutral: {
      wrapper: "bg-zinc-100 text-zinc-700 border-zinc-200/70",
      dot: "bg-zinc-400",
    },
    default: {
      wrapper: "bg-zinc-100 text-zinc-700 border-zinc-200/70",
      dot: "bg-zinc-400",
    },
  };

  const sizeStyles = {
    xs: "px-1.5 py-0.5 text-[10px] gap-1",
    sm: "px-2 py-0.5 text-xs gap-1.5 font-medium",
    md: "px-2.5 py-1 text-xs gap-1.5 font-medium",
  };

  const style = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-tight select-none transition-colors ${style.wrapper} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
