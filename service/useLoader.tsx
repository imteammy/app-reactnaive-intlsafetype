import React from "react";
async function useLoader<T>(props: { endpoint: (...args: unknown[]) => Promise<T> }, onChange?: (data: T) => void) {
  const [isloading, setIsloading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<unknown | undefined>();
  const [data, setData] = React.useState<T | undefined>();

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsloading(true);
        const res = await props.endpoint();
        if (isMounted) {
          setData(res);
          setIsloading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(true);
          setErrorMsg(error);
          setIsloading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    onChange?.(data as T);
  }, [onChange]);

  if (isError) {
    throw errorMsg; // Throw error to be caught by an error boundary
  }

  return { isloading, data };
}

export default useLoader;
