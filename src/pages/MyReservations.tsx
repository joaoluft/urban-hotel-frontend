
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, User, FileText } from 'lucide-react';
import { mockReservations } from '@/data/mockData';
import Layout from '@/components/Layout';

const MyReservations = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas reservas</h1>
        </div>

        {mockReservations.length === 0 ? (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma reserva encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Você ainda não possui reservas. Que tal fazer sua primeira reserva?
              </p>
              <Button className="bg-gray-800 hover:bg-gray-900">
                Fazer reserva
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockReservations.map((reservation) => (
              <Card key={reservation.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-8">
                      {/* Informações do quarto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 truncate">
                            {reservation.roomName}
                          </h3>
                          <Badge className={getStatusColor(reservation.status)}>
                            {getStatusText(reservation.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User size={16} />
                            <span>{reservation.guestName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText size={16} />
                            <span>{reservation.guestDocument}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Check-in: {new Date(reservation.checkIn).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Check-out: {new Date(reservation.checkOut).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Preço e duração */}
                      <div className="text-center lg:text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          R$ {reservation.totalPrice.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.days} diária{reservation.days > 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-400 hover:text-yellow-500"
                        >
                          <Star size={20} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-gray-700 border-gray-300"
                        >
                          Ver detalhes
                        </Button>
                        {reservation.status === 'pending' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyReservations;
