import { BriefcaseIcon, TableIcon, KanbanIcon } from "@/components/atoms/Icons";

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  activeFilter,
  onSelectFilter,
  stats,
  isBackendHealthy = true,
}) {
  const total = stats?.total || 0;
  const applied = stats?.byStatus?.applied || 0;
  const interview = stats?.byStatus?.Interview || 0;
  const offer = stats?.byStatus?.Offer || 0;
  const rejected = stats?.byStatus?.Rejected || 0;

  const navItems = [
    { id: "all", label: "All Applications", count: total },
    { id: "applied", label: "Applied", count: applied },
    { id: "Interview", label: "In Interview", count: interview },
    { id: "Offer", label: "Offers Received", count: offer },
    { id: "Rejected", label: "Archived / Rejected", count: rejected },
  ];

  return (
    <aside
      className={`bg-zinc-50/70 border-r border-zinc-200/80 flex flex-col justify-between transition-all duration-200 select-none shrink-0 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Top Brand / Logo */}
      <div>
        <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-200/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-2xs font-semibold text-sm">
              JT
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-900 leading-none truncate">
                  Job Tracker
                </p>
                <p className="text-[10px] text-zinc-400 mt-1 truncate">
                  Production Workspace
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                collapsed ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <div className="p-3 space-y-1">
          {!collapsed && (
            <p className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Pipeline Views
            </p>
          )}

          {navItems.map((item) => {
            const isActive = activeFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectFilter(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-2xs border border-zinc-200/70"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 border border-transparent"
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      item.id === "Offer"
                        ? "bg-emerald-500"
                        : item.id === "Interview"
                        ? "bg-amber-500"
                        : item.id === "applied"
                        ? "bg-blue-500"
                        : item.id === "Rejected"
                        ? "bg-zinc-400"
                        : "bg-zinc-900"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900 font-semibold"
                        : "text-zinc-400"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Service Status & Profile */}
      <div className="p-3 border-t border-zinc-200/60 space-y-2">
        <div
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] border ${
            isBackendHealthy
              ? "bg-emerald-50/60 text-emerald-800 border-emerald-200/60"
              : "bg-rose-50/60 text-rose-800 border-rose-200/60"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isBackendHealthy ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          {!collapsed && (
            <span className="truncate font-medium">
              {isBackendHealthy ? "MySQL :5000 Online" : "Backend Offline"}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
