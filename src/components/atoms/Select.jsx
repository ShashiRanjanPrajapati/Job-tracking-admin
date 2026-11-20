export default function Select({
  options = [],
  value,
  onChange,
  disabled = false,
  className = "",
  size = "md",
  ...props
}) {
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`rounded-lg border border-zinc-200/90 bg-white text-zinc-800 hover:border-zinc-300 focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/5 transition-all duration-150 cursor-pointer disabled:bg-zinc-50 disabled:cursor-not-allowed shadow-2xs ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {options.map((opt) => {
        const val = typeof opt === "object" ? opt.value : opt;
        const label = typeof opt === "object" ? opt.label : opt;
        return (
          <option key={val} value={val} className="text-zinc-800">
            {label}
          </option>
        );
      })}
    </select>
  );
}
