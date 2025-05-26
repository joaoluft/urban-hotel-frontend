
import { Room, Reservation, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Usuário Teste',
  email: 'usuario@teste.com',
  document: '123.456.789-00'
};

export const mockRooms: Room[] = [
  {
    id: 'A20B',
    name: 'Quarto A20B',
    price: 329.90,
    isAvailable: true,
    amenities: [
      'Cama King Size com lençóis de algodão egípcio',
      'Frigobar abastecido com bebidas e snacks',
      'TV de 42 polegadas com canais a cabo e Netflix',
      'Ar-condicionado com controle de temperatura',
      'Wi-Fi gratuito de alta velocidade disponível em todo o quarto'
    ],
    description: 'Quarto executivo com vista para a cidade'
  },
  {
    id: 'B15C',
    name: 'Quarto B15C',
    price: 429.90,
    isAvailable: true,
    amenities: [
      'Cama Queen Size premium',
      'Banheira de hidromassagem',
      'Smart TV 50 polegadas',
      'Varanda com vista panorâmica',
      'Serviço de quarto 24h'
    ],
    description: 'Suíte de luxo com amenidades premium'
  },
  {
    id: 'C08A',
    name: 'Quarto C08A',
    price: 259.90,
    isAvailable: false,
    amenities: [
      'Cama Queen Size',
      'Frigobar básico',
      'TV 32 polegadas',
      'Ar-condicionado',
      'Wi-Fi gratuito'
    ],
    description: 'Quarto standard confortável'
  },
  {
    id: 'D12B',
    name: 'Quarto D12B',
    price: 389.90,
    isAvailable: true,
    amenities: [
      'Cama King Size',
      'Sala de estar separada',
      'TV 48 polegadas',
      'Cofre digital',
      'Amenities de banho premium'
    ],
    description: 'Suíte executiva com sala de estar'
  }
];

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
