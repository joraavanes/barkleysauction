import { useQuery as _useQuery } from '@tanstack/react-query';

type QueryOptions = {
  timeout: number;
  ContentType?: string
}

function useQuery<T>(url: string, token: string, options: QueryOptions) {
  const { data, isSuccess, isError, status, isFetching } = _useQuery([token], async () => {
    const controller = new AbortController();
    const abortId = setTimeout(() => controller.abort(), options.timeout);

    const response = await window.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': options.ContentType ?? 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(abortId);

    return response.json() as T;
  }
  );

  return { status, data, isSuccess, isError, isLoading: isFetching };
}

export default useQuery;