import { useEffect, useState, useCallback } from "react";
import { fetchPaginated } from "@/api/genericApi";
import { PaginatedResponse, PaginationMeta } from "@/types/pagination";

// Exclude page/limit from filter keys
type WithoutPageLimit<T> = Omit<T, "page" | "limit">;

interface UsePaginated<T, F = Record<string, any>> {
  items: T[];
  pagination: PaginationMeta;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setFilters: (filters: WithoutPageLimit<F>) => void;
  refetch: () => void;
  filters: WithoutPageLimit<F>;
}

export function usePaginated<T, F = Record<string, any>>(
  url: string,
  initialFilters: WithoutPageLimit<F> = {} as WithoutPageLimit<F>,
  initialPage = 1,
  limit = 20
): UsePaginated<T, F> {
  const [items, setItems] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: initialPage,
    limit,
    total: 0,
    totalPages: 1,
  });
  const [filters, setFiltersState] =
    useState<WithoutPageLimit<F>>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchPaginated<T>(url, {
      ...filters,
      page: pagination.page,
      limit: pagination.limit,
    })
      .then((res) => {
        setItems(res.data);
        setPagination(res.pagination);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, [url, filters, pagination.page, pagination.limit]);

  // Effect to re-fetch on filters/page/limit/url change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set page, reset to 1 if needed
  const setPage = useCallback(
    (page: number) => setPagination((p) => ({ ...p, page })),
    []
  );
  const setFilters = useCallback((newFilters: WithoutPageLimit<F>) => {
    setFiltersState(newFilters);
    setPagination((p) => ({ ...p, page: 1 })); // Reset to first page
  }, []);

  // Allow manual refresh
  const refetch = fetchData;

  return {
    items,
    pagination,
    loading,
    error,
    setPage,
    setFilters,
    refetch,
    filters,
  };
}
