export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  onClick,
  icon,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none select-none";

  const sizeStyles = {
    xs: "px-2.5 py-1 text-xs rounded-md gap-1.5",
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-3.5 py-2 text-sm rounded-lg gap-2",
    lg: "px-4.5 py-2.5 text-sm rounded-lg gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-white border border-zinc-900 shadow-xs focus-visible:ring-2 focus-visible:ring-zinc-900/20",
    secondary:
      "bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-800 border border-zinc-200/90 shadow-2xs hover:border-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-400/20",
    outline:
      "bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-700 border border-zinc-200 shadow-2xs focus-visible:ring-2 focus-visible:ring-zinc-400/20",
    danger:
      "bg-white hover:bg-rose-50/80 active:bg-rose-100 text-rose-600 border border-rose-200/80 hover:border-rose-300 shadow-2xs focus-visible:ring-2 focus-visible:ring-rose-500/20",
    ghost:
      "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200/70 border border-transparent",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 text-current shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
