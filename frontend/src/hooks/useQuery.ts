import { useEffect, useState } from "react";

export function useQuery<T>(initial: T, fn: (...args: any[]) => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const exec = async () => {
    try {
      setLoading(true);
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { exec(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, deps);

  return { data, loading, error, refetch: exec };
}