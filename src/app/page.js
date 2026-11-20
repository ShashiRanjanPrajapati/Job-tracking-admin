"use client";

import { useState } from "react";
import DashboardTemplate from "@/components/templates/DashboardTemplate";
import { useStats } from "@/hooks/useStats";
import { useApplications } from "@/hooks/useApplications";

export default function DashboardPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // TanStack Query 1: Stats (/api/applications/stats)
  const {
    stats,
    loading: statsLoading,
    isFetching: statsFetching,
    error: statsError,
    refetchStats,
  } = useStats();

  // TanStack Query 2: Applications (/api/applications)
  const {
    applications,
    loading: appsLoading,
    isFetching: appsFetching,
    error: appsError,
    searchTerm,
    setSearchTerm,
    addApplication,
    updateStatus,
    removeApplication,
    refetch: refetchApplications,
  } = useApplications({
    status: currentFilter,
    sort: sortOption,
  });

  const handleCreate = async (payload) => {
    await addApplication(payload);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (id, company) => {
    if (!confirm(`Are you sure you want to delete the application for ${company}?`)) {
      return;
    }
    try {
      await removeApplication(id);
    } catch (err) {
      alert("Failed to delete application: " + err.message);
    }
  };

  const handleRefresh = async () => {
    await Promise.all([refetchApplications(), refetchStats()]);
  };

  const combinedError = appsError || statsError;
  const isFetching = appsFetching || statsFetching;

  return (
    <DashboardTemplate
      stats={stats}
      statsLoading={statsLoading}
      applications={applications}
      appsLoading={appsLoading}
      isFetching={isFetching}
      error={combinedError}
      onRetry={handleRefresh}
      currentFilter={currentFilter}
      onSelectFilter={setCurrentFilter}
      sortOption={sortOption}
      onSortChange={setSortOption}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={() => setIsDrawerOpen(true)}
      onCloseDrawer={() => setIsDrawerOpen(false)}
      onCreateApplication={handleCreate}
      onStatusChange={handleStatusChange}
      onDeleteApplication={handleDelete}
    />
  );
}
