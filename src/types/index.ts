
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

export interface Booking {
  external_id: string;
  room_id: string;
  user_id: string;
  room_name: string;
  payment_status: "SUCCESS" | "FAILED" | "REFUNDED";
  amount: number;
  checkin_date: string;
  checkout_date: string;
}
