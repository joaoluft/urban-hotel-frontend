import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Bed } from 'lucide-react';
import Layout from '@/components/Layout';
import { getRoomDetails } from '@/services/api/rooms';
import { useAuth } from '@/contexts/AuthContext';
import { Room } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<number>(1);
  const { user } = useAuth();

  const queryRoomDetails = async (external_id: string) => {
    try {
      setLoading(true);
      const room: Room = await getRoomDetails(external_id, user.token);
      setRoom(room);
    } catch (error) {
      setRoom(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      queryRoomDetails(id);
    }
  }, [id]);

  const totalPrice = room ? room.price * days : 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4" />
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
                {loading ? (
                  <Skeleton className="w-40 h-8 rounded-md" />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">{room?.name}</h2>
                )}
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                <Bed size={32} className="text-gray-600" />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-5 w-full rounded-md" />
                  ))
                : room?.details.map((amenity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{amenity}</p>
                    </div>
                  ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                {loading ? (
                  <Skeleton className="w-32 h-10 rounded-md" />
                ) : (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-lg text-gray-500 ml-1">
                      {days === 1 ? '/Noite' : `/${days} Noites`}
                    </span>
                  </>
                )}
              </div>

              <div className="flex space-x-4 items-center">
                <div className="flex items-center space-x-2">
                  <label htmlFor="days-select" className="text-sm font-medium text-gray-700">
                    Diárias:
                  </label>
                  <Select
                    value={days.toString()}
                    onValueChange={(value) => setDays(Number(value))}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-20" id="days-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {loading ? (
                  <Skeleton className="w-32 h-10 rounded-md" />
                ) : room?.available ? (
                  <Link to={`/reservation/${room.id}`}>
                    <Button className="px-8 bg-gray-800 hover:bg-gray-900">Reservar</Button>
                  </Link>
                ) : (
                  <Button disabled className="px-8">Indisponível</Button>
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