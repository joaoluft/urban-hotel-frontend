
export interface User {
  id: string;
  name: string;
  email: string;
  document: string;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  amenities: string[];
  description: string;
}

export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  guestName: string;
  guestDocument: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  days: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}
