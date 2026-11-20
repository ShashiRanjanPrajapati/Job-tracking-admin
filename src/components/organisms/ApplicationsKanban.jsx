import CompanyAvatar from "@/components/molecules/CompanyAvatar";
import StatusDropdown from "@/components/molecules/StatusDropdown";
import EmptyState from "@/components/molecules/EmptyState";
import { TrashIcon, CalendarIcon } from "@/components/atoms/Icons";

const COLUMNS = [
  { id: "applied", label: "Applied", dot: "bg-blue-500" },
  { id: "Interview", label: "In Interview", dot: "bg-amber-500" },
  { id: "Offer", label: "Offers", dot: "bg-emerald-500" },
  { id: "Rejected", label: "Rejected", dot: "bg-zinc-400" },
];

export default function ApplicationsKanban({
  applications = [],
  onStatusChange,
  onDelete,
  onOpenAdd,
}) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs">
        <EmptyState
          title="No applications on board"
          description="Add a new application to see it flow across your pipeline columns."
          actionLabel="Add Application"
          onAction={onOpenAdd}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {COLUMNS.map((col) => {
        const columnApps = applications.filter((app) => app.status === col.id);

        return (
          <div
            key={col.id}
            className="bg-zinc-50/80 rounded-xl border border-zinc-200/80 p-3 flex flex-col min-h-[420px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/60">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                <h4 className="text-xs font-semibold text-zinc-800 tracking-tight">
                  {col.label}
                </h4>
              </div>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-zinc-200/70 text-zinc-600">
                {columnApps.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-2.5 flex-1 overflow-y-auto">
              {columnApps.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 text-xs border border-dashed border-zinc-200 rounded-lg">
                  No applications
                </div>
              ) : (
                columnApps.map((app) => (
                  <div
                    key={app.id}
                    className="group bg-white rounded-lg border border-zinc-200/90 p-3 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all duration-150 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CompanyAvatar name={app.company} size="sm" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-zinc-900 truncate">
                            {app.company}
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate">
                            {app.role}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onDelete(app.id, app.company)}
                        className="text-zinc-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer opacity-40 group-hover:opacity-100"
                        title="Delete"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                        <CalendarIcon className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span>
                          {app.appliedDate
                            ? new Date(app.appliedDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                        </span>
                      </div>

                      <StatusDropdown
                        currentStatus={app.status}
                        onChange={(newStatus) => onStatusChange(app.id, newStatus)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
