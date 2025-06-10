
import { Booking } from '@/types';
import api from '../axios';
  
export async function getBookings(): Promise<Booking[]> {
    try {
      const response = await api.get<Booking[]>('/api/booking/list/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar quartos');
    }
}
