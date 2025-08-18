// auth mutation and success side effects
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/login';
import { saveToken } from '../storage/auth-storage';
import type { LoginRequest, LoginResponse } from '../types';

export function useAuth() {
  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginApi,
    onSuccess: async data => {
      await saveToken(data.token);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
