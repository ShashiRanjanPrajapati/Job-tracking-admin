export default function FilterTabs({
  tabs = [],
  activeTab,
  onSelectTab,
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-lg bg-zinc-100/90 border border-zinc-200/60 text-xs font-medium ${className}`}
    >
      {tabs.map((tab) => {
        const id = typeof tab === "object" ? tab.id : tab;
        const label = typeof tab === "object" ? tab.label : tab;
        const count = typeof tab === "object" ? tab.count : undefined;
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectTab(id)}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 cursor-pointer inline-flex items-center gap-1.5 select-none ${
              isActive
                ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <span>{label}</span>
            {count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-zinc-100 text-zinc-800"
                    : "bg-zinc-200/80 text-zinc-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
