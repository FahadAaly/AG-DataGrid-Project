// api/genericApi.ts

import { get } from "@/lib/fetcher";
import { PaginatedResponse } from "@/types/pagination";

export async function fetchPaginated<T>(
  url: string,
  params: Record<string, any> = {}
): Promise<PaginatedResponse<T>> {
  const query = { ...params };
  if (query.filters && typeof query.filters === "object") {
    query.filters = JSON.stringify(query.filters);
  }
  console.log("params", params);
  console.log("query", query);

  const searchParams = new URLSearchParams(query as any).toString();
  return get<PaginatedResponse<T>>(`${url}?${searchParams}`);
}
