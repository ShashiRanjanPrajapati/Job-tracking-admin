import { useQuery } from "@tanstack/react-query";
import { applicationService } from "@/services/applicationService";

export function useStats() {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: applicationService.getStats,
  });

  return {
    stats: data || { total: 0, byStatus: {} },
    loading: isLoading,
    isFetching,
    error: error ? error.message : null,
    refetchStats: refetch,
  };
}
