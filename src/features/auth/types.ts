// minimal auth shapes
export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
  token: string;
  user: { id: string; email: string };
};
