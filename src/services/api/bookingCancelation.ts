import api from '../axios';

interface BookingCancelationResponse {
  success: boolean;
}

export async function cancelBooking(external_id: string): Promise<BookingCancelationResponse> {
  try {
    const response = await api.delete<BookingCancelationResponse>('/api/booking/' + external_id);
    return response.data;
  } catch (error) {
    throw error
  }
}