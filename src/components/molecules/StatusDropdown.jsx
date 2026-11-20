const STATUS_CONFIG = {
  applied: {
    bg: "bg-blue-50/90 text-blue-700 border-blue-200/80 hover:bg-blue-100/80",
    dot: "bg-blue-500",
    label: "Applied",
  },
  Interview: {
    bg: "bg-amber-50/90 text-amber-800 border-amber-200/80 hover:bg-amber-100/80",
    dot: "bg-amber-500",
    label: "Interview",
  },
  Offer: {
    bg: "bg-emerald-50/90 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/80",
    dot: "bg-emerald-500",
    label: "Offer",
  },
  Rejected: {
    bg: "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200/70",
    dot: "bg-zinc-400",
    label: "Rejected",
  },
};

const OPTIONS = ["applied", "Interview", "Offer", "Rejected"];

export default function StatusDropdown({
  currentStatus = "applied",
  onChange,
  disabled = false,
}) {
  const current = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.applied;

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`appearance-none text-xs font-medium pl-6 pr-6 py-1 rounded-md border cursor-pointer outline-none transition-all duration-150 disabled:cursor-not-allowed shadow-2xs ${current.bg}`}
      >
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-white text-zinc-900 font-normal">
            {STATUS_CONFIG[opt]?.label || opt}
          </option>
        ))}
      </select>

      {/* Status Dot */}
      <span
        className={`absolute left-2.5 w-1.5 h-1.5 rounded-full pointer-events-none ${current.dot}`}
        aria-hidden="true"
      />

      {/* Down Chevron */}
      <svg
        className="absolute right-2 w-3 h-3 pointer-events-none opacity-60 text-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
