import { useState } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import AppHeader from "@/components/organisms/AppHeader";
import StatsSection from "@/components/organisms/StatsSection";
import ApplicationsTable from "@/components/organisms/ApplicationsTable";
import ApplicationsKanban from "@/components/organisms/ApplicationsKanban";
import ApplicationDrawer from "@/components/organisms/ApplicationDrawer";
import FilterTabs from "@/components/molecules/FilterTabs";
import SearchBar from "@/components/molecules/SearchBar";
import ErrorBanner from "@/components/molecules/ErrorBanner";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "applied", label: "Applied" },
  { id: "Interview", label: "Interview" },
  { id: "Offer", label: "Offer" },
  { id: "Rejected", label: "Rejected" },
];

export default function DashboardTemplate({
  stats,
  statsLoading,
  applications,
  appsLoading,
  isFetching,
  error,
  onRetry,
  currentFilter,
  onSelectFilter,
  sortOption,
  onSortChange,
  searchTerm,
  onSearchChange,
  isDrawerOpen,
  onOpenDrawer,
  onCloseDrawer,
  onCreateApplication,
  onStatusChange,
  onDeleteApplication,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" | "kanban"

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans text-zinc-900 antialiased">
      {/* 1. Left Collapsible Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeFilter={currentFilter}
        onSelectFilter={onSelectFilter}
        stats={stats}
        isBackendHealthy={!error}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <AppHeader
          activeFilter={currentFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenAdd={onOpenDrawer}
          onRefresh={onRetry}
          isRefreshing={isFetching}
        />

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Connection Error Banner */}
          {error && <ErrorBanner message={error} onRetry={onRetry} />}

          {/* Top KPI Metrics Strip */}
          <StatsSection
            stats={stats}
            loading={statsLoading}
            activeFilter={currentFilter}
            onSelectFilter={onSelectFilter}
          />

          {/* Action & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <FilterTabs
              tabs={FILTER_TABS}
              activeTab={currentFilter}
              onSelectTab={onSelectFilter}
            />

            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              sortOption={sortOption}
              onSortChange={onSortChange}
            />
          </div>

          {/* Dynamic View: Table or Kanban */}
          {viewMode === "table" ? (
            <ApplicationsTable
              applications={applications}
              loading={appsLoading}
              onStatusChange={onStatusChange}
              onDelete={onDeleteApplication}
              onOpenAdd={onOpenDrawer}
              currentFilter={currentFilter}
            />
          ) : (
            <ApplicationsKanban
              applications={applications}
              onStatusChange={onStatusChange}
              onDelete={onDeleteApplication}
              onOpenAdd={onOpenDrawer}
            />
          )}
        </main>
      </div>

      {/* 3. Slide-over Right Drawer */}
      <ApplicationDrawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
        onSubmit={onCreateApplication}
      />
    </div>
  );
}
