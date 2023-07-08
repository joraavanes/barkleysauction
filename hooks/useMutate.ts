import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type MutateOptions<T> = {
  timeout: number;
  method: 'POST' | 'PUT' | 'PATCH',
  body: T,
  ContentType?: string
}

type State = {
  status: 'error' | 'idle' | 'loading' | 'success',
  body?: object,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  errorMessage?: string,
}

function useMutate<T extends object>(url: string, options: MutateOptions<T>) {
  const [state, setState] = useState<State>({
    status: "idle",
    body: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: undefined
  });

  const { data, status, mutate, isSuccess, isError } = useMutation({
    mutationFn: async (payload: T) => {
      setState(prev => ({
        ...prev,
        status: 'loading',
        isLoading: true
      }));

      const controller = new AbortController()
      const abortId = setTimeout(() => {
        controller.abort()
      }, options.timeout);

      const response = await window.fetch(url, {
        method: options.method,
        headers: {
          "Content-Type": options.ContentType ?? "application/json"
        },
        body: JSON.stringify(options.body),
        signal: controller.signal
      });

      clearTimeout(abortId);

      return response;
    },
    onSuccess: async (data: Response) => {
      const payload = await data.json();

      setState(prev => ({
        ...prev,
        status: 'success',
        body: payload,
        isSuccess: true,
        isLoading: false,
        errorMessage: undefined
      }));
    },
    onError(error: any, variables, context) {
      setState(prev => ({
        ...prev,
        status: 'error',
        isError: true,
        isLoading: false,
        errorMessage: 'Error communicating with server.'
      }));
    },
  });

  if ((isSuccess || isError) && (data?.status !== 201 && data?.status !== 200) && !state.errorMessage) {
    setState(prev => ({
      ...prev,
      status: 'error',
      isSuccess: false,
      isError: true,
      errorMessage: 'Failed to add data'
    }));
  }

  return { state, mutate };
}

export default useMutate;