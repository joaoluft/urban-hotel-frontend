import { Room } from '@/types';
import api from '../axios';

export interface FilterRoomsParams {
    page: number;
    per_page: number;
    available?: boolean;
    min_price?: number;
    max_price?: number;
    search?: string;
}


export interface FilterRoomsResponse {
    page: number;
    limit: number;
    last_page: number;
    items: Room[];
}
  
export async function filterRooms(params: FilterRoomsParams, token: string): Promise<FilterRoomsResponse> {
    try {
      const response = await api.get<FilterRoomsResponse>('/api/room/', {
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar quartos');
    }
}

export async function getRoomDetails(external_id: string, token: string): Promise<Room> {
    try {
      const response = await api.get<Room>(`/api/room/${external_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar quartos');
    }
}