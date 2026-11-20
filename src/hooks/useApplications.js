import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "@/services/applicationService";

export function useApplications({ status = "all", sort = "default" } = {}) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // TanStack Query for fetching applications
  const {
    data: rawApplications = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["applications", { status, sort }],
    queryFn: () =>
      applicationService.getAll({
        status,
        sort: sort === "date" ? "date" : undefined,
      }),
  });

  // Mutation: Create Application
  const createMutation = useMutation({
    mutationFn: (payload) => applicationService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  // Mutation: Update Status
  const updateMutation = useMutation({
    mutationFn: ({ id, status: newStatus }) =>
      applicationService.update(id, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  // Mutation: Delete Application
  const deleteMutation = useMutation({
    mutationFn: (id) => applicationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  // Filter applications by search term
  const filteredApplications = useMemo(() => {
    if (!searchTerm.trim()) return rawApplications;
    const term = searchTerm.toLowerCase();
    return rawApplications.filter(
      (app) =>
        app.company?.toLowerCase().includes(term) ||
        app.role?.toLowerCase().includes(term)
    );
  }, [rawApplications, searchTerm]);

  return {
    applications: filteredApplications,
    rawCount: rawApplications.length,
    loading: isLoading,
    isFetching,
    error: error ? error.message : null,
    searchTerm,
    setSearchTerm,
    addApplication: (payload) => createMutation.mutateAsync(payload),
    updateStatus: (id, newStatus) =>
      updateMutation.mutateAsync({ id, status: newStatus }),
    removeApplication: (id) => deleteMutation.mutateAsync(id),
    isMutating:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    refetch,
  };
}
