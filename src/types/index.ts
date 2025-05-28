
export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

// export interface Room {
//   id: string;
//   name: string;
//   price: number;
//   isAvailable: boolean;
//   amenities: string[];
//   description: string;
// }

export interface Room {
  id: string;
  external_id: string;
  name: string;
  details: string[];
  owner_id: string;
  created_at: string;
  updated_at: string;
  available: boolean;
  price: number;
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
