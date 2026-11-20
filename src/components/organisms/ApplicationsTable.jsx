import CompanyAvatar from "@/components/molecules/CompanyAvatar";
import StatusDropdown from "@/components/molecules/StatusDropdown";
import EmptyState from "@/components/molecules/EmptyState";
import Skeleton from "@/components/atoms/Skeleton";
import { TrashIcon, CalendarIcon } from "@/components/atoms/Icons";

export default function ApplicationsTable({
  applications = [],
  loading = false,
  onStatusChange,
  onDelete,
  onOpenAdd,
  currentFilter = "all",
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
        <div className="divide-y divide-zinc-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs">
        <EmptyState
          title="No applications found"
          description={
            currentFilter !== "all"
              ? `There are currently no job applications matching "${currentFilter}".`
              : "Start tracking your job search by recording your first application."
          }
          actionLabel="Add Application"
          onAction={onOpenAdd}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-zinc-50/60 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              <th className="py-3 px-5 w-16">#</th>
              <th className="py-3 px-5">Company & Role</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Applied Date</th>
              <th className="py-3 px-5 text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {applications.map((app) => (
              <tr
                key={app.id}
                className="group hover:bg-zinc-50/70 transition-colors duration-100"
              >
                {/* ID */}
                <td className="py-3.5 px-5 font-mono text-zinc-400 text-[11px]">
                  #{app.id}
                </td>

                {/* Company & Role */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <CompanyAvatar name={app.company} size="md" />
                    <div className="min-w-0">
                      <p className="font-semibold text-zinc-900 truncate">
                        {app.company}
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">
                        {app.role}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status Dropdown */}
                <td className="py-3.5 px-5">
                  <StatusDropdown
                    currentStatus={app.status}
                    onChange={(newStatus) => onStatusChange(app.id, newStatus)}
                  />
                </td>

                {/* Applied Date */}
                <td className="py-3.5 px-5 text-zinc-500">
                  <div className="flex items-center gap-1.5 text-zinc-600 font-mono text-[11px]">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>
                      {app.appliedDate
                        ? new Date(app.appliedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </span>
                  </div>
                </td>

                {/* Row Actions */}
                <td className="py-3.5 px-5 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(app.id, app.company)}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                    title={`Delete application for ${app.company}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
