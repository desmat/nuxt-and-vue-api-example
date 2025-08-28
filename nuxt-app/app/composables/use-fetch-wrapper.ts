export const useFetchWrapper = async (request: any, opts?: any) => {
  const { data, error } = await useFetch(request, opts);
  // TODO error handling
  return toValue(data);
}