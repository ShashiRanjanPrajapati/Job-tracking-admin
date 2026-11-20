const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-rose-100 text-rose-700 border-rose-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
];

export default function CompanyAvatar({ name = "C", size = "md" }) {
  const initial = name ? name.trim().charAt(0).toUpperCase() : "C";
  // Deterministic color based on company name
  const charCode = name.charCodeAt(0) || 0;
  const colorClass = AVATAR_COLORS[charCode % AVATAR_COLORS.length];

  const sizeStyles = {
    sm: "w-6 h-6 text-xs rounded-md",
    md: "w-8 h-8 text-xs font-semibold rounded-lg",
    lg: "w-10 h-10 text-sm font-semibold rounded-lg",
  };

  return (
    <div
      className={`inline-flex items-center justify-center font-medium border shrink-0 select-none ${
        sizeStyles[size] || sizeStyles.md
      } ${colorClass}`}
    >
      {initial}
    </div>
  );
}
