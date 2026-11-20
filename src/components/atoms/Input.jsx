export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  icon,
  className = "",
  ...props
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full text-sm rounded-lg border transition-all duration-150 outline-none bg-white text-zinc-900 placeholder:text-zinc-400 ${
          icon ? "pl-9 pr-3.5 py-2" : "px-3.5 py-2"
        } ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
            : "border-zinc-200/90 hover:border-zinc-300 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/5 shadow-2xs"
        } disabled:bg-zinc-50 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </div>
  );
}
