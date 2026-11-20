import Button from "@/components/atoms/Button";
import { PlusIcon, RefreshIcon, TableIcon, KanbanIcon } from "@/components/atoms/Icons";

export default function AppHeader({
  activeFilter = "all",
  viewMode = "table",
  onViewModeChange,
  onOpenAdd,
  onRefresh,
  isRefreshing = false,
}) {
  const filterNames = {
    all: "All Applications",
    applied: "Applied",
    Interview: "In Interview",
    Offer: "Offers",
    Rejected: "Rejected",
  };

  return (
    <header className="h-14 px-6 border-b border-zinc-200/80 bg-white flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-zinc-400 font-medium">Dashboard</span>
        <span className="text-zinc-300">/</span>
        <span className="text-zinc-900 font-semibold">
          {filterNames[activeFilter] || activeFilter}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* View Mode Switcher */}
        <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-100 border border-zinc-200/60">
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              viewMode === "table"
                ? "bg-white text-zinc-900 shadow-2xs"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
            title="Table View"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("kanban")}
            className={`p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              viewMode === "kanban"
                ? "bg-white text-zinc-900 shadow-2xs"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
            title="Kanban Board View"
          >
            <KanbanIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          loading={isRefreshing}
          icon={<RefreshIcon className="w-3.5 h-3.5" />}
          title="Refresh data from MySQL"
        >
          <span className="hidden sm:inline">Refresh</span>
        </Button>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenAdd}
          icon={<PlusIcon className="w-3.5 h-3.5" />}
        >
          New Application
        </Button>
      </div>
    </header>
  );
}
