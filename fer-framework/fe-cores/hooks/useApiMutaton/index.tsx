"use client";

import { useCallback } from "react";
import { useMessage } from "../../components/MessageProvider";

interface IProps {
  useMutationHook: any;
  onSuccess: (data?: any) => void;
  onError?: (data?: any) => void;
  successMessage?: string;
}

// POST MUTATION
export const usePostMutation = (props: IProps) => {
  const { useMutationHook, onSuccess, onError, successMessage } = props;

  const [mutationFn, { isLoading, isSuccess }] = useMutationHook();

  const { message } = useMessage();

  const callPostApi = useCallback(
    async (body: any) => {
      try {
        const data = await mutationFn(body);
        if (successMessage) message.success(successMessage);
        if (onSuccess) onSuccess(data);
      } catch (error) {
        if (onError) onError(error);
      }
    },
    [useMutationHook, onSuccess, onError, successMessage]
  );

  return { callPostApi, isLoading, isSuccess };
};

// PUT MUTATION
export const usePutMutation = (props: IProps) => {
  const { useMutationHook, onSuccess, onError, successMessage } = props;
  const [mutationFn, { isLoading, isSuccess }] = useMutationHook();
  const { message } = useMessage();

  const callPutApi = useCallback(
    async ({ body, prams }: { body: any; prams?: any }) => {
      try {
        const data = await mutationFn({ body, prams });
        if (successMessage) message.success(successMessage);
        if (onSuccess) onSuccess(data);
      } catch (error) {
        if (onError) onError(error);
      }
    },
    [mutationFn, onSuccess, onError, successMessage]
  );

  return { callPutApi, isLoading, isSuccess };
};

// DELETE MUTATION
export const useDeleteMutation = (props: IProps) => {
  const { useMutationHook, onSuccess, onError, successMessage } = props;
  const [mutationFn, { isLoading, isSuccess }] = useMutationHook();
  const { message } = useMessage();

  const callDeleteApi = useCallback(
    async ({ prams }: { prams?: any }) => {
      try {
        const data = await mutationFn({ prams });
        if (successMessage) message.success(successMessage);
        if (onSuccess) onSuccess(data);
      } catch (error) {
        if (onError) onError(error);
      }
    },
    [mutationFn, onSuccess, onError, successMessage]
  );

  return { callDeleteApi, isLoading, isSuccess };
};
