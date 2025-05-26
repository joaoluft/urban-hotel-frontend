
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Bed } from 'lucide-react';
import { mockRooms } from '@/data/mockData';
import Layout from '@/components/Layout';

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = mockRooms.find(r => r.id === id);

  if (!room) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Quarto não encontrado</h1>
            <Button onClick={() => navigate('/rooms')} className="mt-4">
              Voltar para lista de quartos
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Detalhes do quarto</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/rooms')}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={20} />
                </Button>
                <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                <Bed size={32} className="text-gray-600" />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{amenity}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  R$ {room.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-lg text-gray-500 ml-1">/Noite</span>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="px-8">
                  Quantidade de diárias
                </Button>
                {room.isAvailable ? (
                  <Link to={`/reservation/${room.id}`}>
                    <Button className="px-8 bg-gray-800 hover:bg-gray-900">
                      Reservar
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="px-8">
                    Indisponível
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RoomDetails;
