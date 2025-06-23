import { getApiBaseUrl } from "./getApiBaseUrl";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetcherOptions extends RequestInit {
  body?: any;
  baseUrl?: string;
  signal?: AbortSignal;
}

export async function fetcher<T>(
  url: string,
  opts: FetcherOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers,
    body,
    baseUrl = getApiBaseUrl(),
    ...rest
  } = opts;

  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: body && method !== "GET" ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}\n${message}`
    );
  }

  return response.status === 204
    ? (undefined as unknown as T)
    : ((await response.json()) as T);
}

export const get = <T>(url: string, opts?: FetcherOptions) =>
  fetcher<T>(url, { ...opts, method: "GET" });

export const post = <T, B>(url: string, body: B, opts?: FetcherOptions) =>
  fetcher<T>(url, { ...opts, method: "POST", body });

export const put = <T, B>(url: string, body: B, opts?: FetcherOptions) =>
  fetcher<T>(url, { ...opts, method: "PUT", body });

export const del = <T>(url: string, opts?: FetcherOptions) =>
  fetcher<T>(url, { ...opts, method: "DELETE" });
