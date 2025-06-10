import api from '../axios';

interface BookingCreationPayload {
  checkin_date: string;
  checkout_date: string;
  room_external_id: string;
  card_number: string;
  card_expiration_date: string;
  card_code: string;
}

interface BookingCreationResponse {
  success: boolean;
}

export async function createBooking(payload: BookingCreationPayload): Promise<BookingCreationResponse> {
  try {
    const response = await api.post<BookingCreationResponse>('/api/booking/', payload);
    return response.data;
  } catch (error) {
    throw error
  }
}
