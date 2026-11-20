import Button from "@/components/atoms/Button";

export default function Navbar({ onOpenAdd, isBackendHealthy = true }) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💼</span>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Job Tracker</h1>
            <p className="text-xs text-slate-500">Atomic Architecture + Next.js & MySQL</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full border font-medium ${
              isBackendHealthy
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendHealthy ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
              }`}
            ></span>
            {isBackendHealthy ? "Backend: Connected (5000)" : "Backend: Disconnected"}
          </div>

          <Button variant="primary" size="sm" onClick={onOpenAdd}>
            + Add Application
          </Button>
        </div>
      </div>
    </header>
  );
}
