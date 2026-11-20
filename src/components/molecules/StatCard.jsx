import Card from "@/components/atoms/Card";

export default function StatCard({
  title,
  count = 0,
  description,
  badgeText,
  icon,
  active = false,
  onClick,
}) {
  return (
    <Card
      onClick={onClick}
      hoverable={!!onClick}
      className={`p-4 flex flex-col justify-between transition-all ${
        onClick ? "cursor-pointer" : ""
      } ${active ? "" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-zinc-500 tracking-tight">
          {title}
        </span>
        {icon && (
          <span className="text-zinc-400 p-1 bg-zinc-50 rounded-md border border-zinc-100">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-zinc-900 tracking-tight font-mono">
            {count}
          </span>
          {badgeText && (
            <span className="text-[11px] font-medium text-zinc-500">
              {badgeText}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
