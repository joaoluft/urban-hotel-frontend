import api from '../axios';

interface LoginPayload {
  identifier: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user_id: string;
  username: string;
  email: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/external/auth/login', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message
    );
  }
}
