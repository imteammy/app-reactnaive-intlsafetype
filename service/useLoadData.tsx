import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface OPtionProps<V> {
  getValue: (value: V) => void;
}

function useLoadData<T>(
  key: string[],
  promiseFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> & OPtionProps<T>
) {
  const data = useQuery<T>({
    ...options,
    queryKey: [key.join(" | ")],
    queryFn: () => {
      return promiseFn().then(
        (v) => {
          if (options?.getValue) {
            options?.getValue(v);
          }
          return v;
        },
        (reason) => reason
      );
    },
  });
  return data;
}

export default useLoadData;
