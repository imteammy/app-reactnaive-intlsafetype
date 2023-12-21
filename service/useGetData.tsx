import * as React from "react";
import isequal from "lodash.isequal";
interface GetDataProps<V> {
  refresh?: number; // Optional refresh interval in milliseconds
  onChange?: (data: V) => void;
}

function useGetData<T = unknown>(name: string | string[], promiseFn: () => Promise<T>, options?: GetDataProps<T>) {
  const isMounted = React.useRef(false);
  const dataRef = React.useRef<T | null>(null);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      promiseFn()
        .then((res: T) => {
          if (isequal(dataRef.current, res)) {
            setLoading(false);
            return;
          }
          if (isMounted.current) {
            setData(res);
            dataRef.current = res;
            setLoading(false);
            setError(undefined);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setError(`Errors useGetData : key name ${typeof name === "string" ? `[${name}]` : name}`);
            setLoading(false);
          }
        });
    };

    isMounted.current = true;
    if (options?.refresh) {
      fetchData();
      const intervalId = setInterval(fetchData, options?.refresh);
      return () => clearInterval(intervalId);
    } else {
      fetchData();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (data && options?.onChange) {
      options.onChange(data);
    }
  }, [data, options?.onChange]);

  const refreshData = () => {
    isMounted.current = true;
    const fetchData = () => {
      setLoading(true);
      promiseFn()
        .then((res: T) => {
          if (isequal(dataRef.current, res)) {
            setLoading(false);
            return;
          }
          if (isMounted.current) {
            setData(res);
            dataRef.current = res;
            setLoading(false);
            setError(undefined);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setError(`Errors useGetData : key name ${typeof name === "string" ? `[${name}]` : name}`);
            setLoading(false);
          }
        })
        .finally(() => {
          isMounted.current = false;
        });
    };
    fetchData();
  };
  return { data, error, loading, dataRef: dataRef.current, refreshData };
}

export default useGetData;
