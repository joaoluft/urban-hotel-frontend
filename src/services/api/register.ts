import api from '../axios';

interface RegisterPayload {
  username: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
}

interface RegisterResponse {
  success: boolean;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('/external/auth/register', {
      username: payload.username,
      email: payload.email,
      cpf: payload.cpf,
      password: payload.password,
      confirm_password: payload.confirm_password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao realizar cadastro'
    );
  }
}