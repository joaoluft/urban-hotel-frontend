
import { Reservation } from '@/types';

export const mockReservations: Reservation[] = [
  {
    id: '1',
    roomId: 'A20B',
    roomName: 'Quarto A20B',
    userId: '1',
    guestName: 'Usuário Teste',
    guestDocument: '123.456.789-00',
    checkIn: '2025-06-15',
    checkOut: '2025-06-18',
    totalPrice: 989.70,
    days: 3,
    status: 'confirmed'
  },
  {
    id: '2',
    roomId: 'B15C',
    roomName: 'Quarto B15C',
    userId: '1',
    guestName: 'Usuário Teste',
    guestDocument: '123.456.789-00',
    checkIn: '2025-07-20',
    checkOut: '2025-07-25',
    totalPrice: 2149.50,
    days: 5,
    status: 'pending'
  }
];
