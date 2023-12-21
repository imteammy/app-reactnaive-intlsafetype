import {
  DefaultError,
  DefinedInitialDataOptions,
  QueryClient,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

function use<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  options:
    | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): UseQueryResult<TData, TError> {
  const data = useQuery(options, queryClient);
  return data;
}

export default use;
