import { useEffect, useState } from "react";

export function useSearchTime<T>(value: T, delay?: number): T {
  const [useDebounced, setUseDebouned] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUseDebouned(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return useDebounced;
}
