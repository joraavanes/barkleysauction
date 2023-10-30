import { useMutation } from '@tanstack/react-query';
import { Status } from '@/shared/types';
import { useState } from 'react';

type FormDataPayload = {
  [k: string]: Blob | string | null
};

type JsonPayload = {
  [k: string]: any
};

type Payload<T> = T extends FormDataPayload ? FormDataPayload : JsonPayload;

type MutateOptions = {
  timeout: number;
  method: 'POST' | 'PUT' | 'PATCH',
  ContentType?: string
}

type State = {
  status: Status,
  responseBody?: object,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  errorMessage?: string,
}

function useMutate<T>(url: string, options: MutateOptions) { // todo: add an option to choose request body type
  const [state, setState] = useState<State>({
    status: Status.idle,
    responseBody: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: undefined
  });

  const { data, mutate, isSuccess, isError } = useMutation({
    mutationFn: async (payload: Payload<T>) => {
      setState(prev => ({
        ...prev,
        status: Status.loading,
        isLoading: true
      }));

      const controller = new AbortController()
      const abortId = setTimeout(() => {
        controller.abort()
      }, options.timeout);

      const formData = new FormData();
      for (let key in payload)
        formData.append(key, payload[key]!);

      const response = await window.fetch(url, {
        method: options.method,
        headers: {
          ...(options.ContentType && { "Content-Type": options.ContentType })
        },
        body: options.ContentType === 'application/json' ? JSON.stringify(payload) : formData,
        signal: controller.signal
      });

      clearTimeout(abortId);

      return response;
    },
    onSuccess: async (data: Response) => {
      if (!data.ok) return;

      const payload = await data.json();

      setState(prev => ({
        ...prev,
        status: Status.success,
        responseBody: payload,
        isSuccess: true,
        isLoading: false,
        errorMessage: undefined
      }));
    },
    onError(error: any, variables, context) {
      setState(prev => ({
        ...prev,
        status: Status.error,
        isError: true,
        isLoading: false,
        errorMessage: 'Error communicating with server.'
      }));
    },
    onSettled: async (data, error, variables, context) => {
      if (!data?.ok) {
        const payload = await data?.json();

        setState(prev => ({
          ...prev,
          status: Status.error,
          isError: true,
          isLoading: false,
          errorMessage: payload?.error ? payload.error : "Cant make it now"
        }));
      }
    },
  });

  if ((isSuccess || isError) && (data?.status !== 201 && data?.status !== 200) && !state.errorMessage) {
    setState(prev => ({
      ...prev,
      status: Status.error,
      isSuccess: false,
      isError: true,
      errorMessage: 'Failed to add data'
    }));
  }

  return { state, mutate };
}

export default useMutate;