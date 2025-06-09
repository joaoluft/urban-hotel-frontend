
import api from '../axios';

interface ValidateEmailCodeResponse {
  message: string;
  success: boolean;
}

export async function validateEmailCode(code: string): Promise<ValidateEmailCodeResponse> {
  try {
    const response = await api.post<ValidateEmailCodeResponse>('/external/auth/validate-email', {
      code
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao validar código');
  }
}
