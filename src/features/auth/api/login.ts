// login endpoint
import { apiFetch } from '../../../shared/lib/fetcher';
import type { LoginRequest, LoginResponse } from '../types';

export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
