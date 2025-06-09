
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Bed } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const Reservation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //const room = mockRooms.find(r => r.id === id);

  const [formData, setFormData] = useState({
    name: 'Usuário Teste',
    document: '',
    checkIn: '12/06/2025',
    checkOut: '12/05/2025',
    acceptTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);

  // if (!room) {
  //   return (
  //     <Layout>
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //         <div className="text-center">
  //           <h1 className="text-2xl font-bold text-gray-900">Quarto não encontrado</h1>
  //           <Button onClick={() => navigate('/rooms')} className="mt-4">
  //             Voltar para lista de quartos
  //           </Button>
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.error('Aceite os termos de reserva para continuar');
      return;
    }

    setIsLoading(true);
    
    // Simulação de API call para criar reserva
    setTimeout(() => {
      toast.success('Dados da reserva salvos com sucesso!');
      navigate(`/payment/${id}`);
    }, 2000);
  };

  // const calculateTotal = () => {
  //   const checkInDate = new Date('2025-06-12');
  //   const checkOutDate = new Date('2025-05-12');
  //   const days = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
  //   return {
  //     days: Math.abs(days),
  //     total: room.price * Math.abs(days)
  //   };
  // };

  //const { days, total } = calculateTotal();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Fazer reserva</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{"teste"}</h2>
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                <Bed size={32} className="text-gray-600" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-12 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documento CPF
                </label>
                <Input
                  placeholder="CPF"
                  value={formData.document}
                  onChange={(e) => setFormData({...formData, document: e.target.value})}
                  className="h-12 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de check-in
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.checkIn}
                      onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                      className="h-12 rounded-lg pr-10"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de check-out
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.checkOut}
                      onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                      className="h-12 rounded-lg pr-10"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Aceitar os termos de reserva
                </label>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-baseline space-x-2">
                  <span className="text-sm text-gray-600">1</span>
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      R$ {Number(100).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-lg text-gray-500 ml-1">/ {2} Diárias</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/rooms')}
                    className="px-8"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 bg-gray-800 hover:bg-gray-900"
                  >
                    {isLoading ? 'Processando...' : 'Ir para o pagamento'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reservation;
