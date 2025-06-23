export const getApiBaseUrl = (): string => {
  const fromWindow =
    typeof window !== "undefined" && (window as any).__ENV__?.API_URL;

  const fromProcess =
    typeof process !== "undefined" && process.env?.VITE_API_URL;

  return (fromWindow || fromProcess || "http://localhost:5001/").toString();
};
