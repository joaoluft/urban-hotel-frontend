import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Bed } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Room } from "@/types";
import { getRoomDetails } from "@/services/api/rooms";
import DateFilters from "@/components/rooms/DateFilters";
import { format } from "date-fns";

const Booking = () => {
  const { id, days } = useParams<{ id: string; days: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);

  const queryRoomDetails = async (external_id: string) => {
    try {
      const room: Room = await getRoomDetails(external_id);
      setRoom(room);
    } catch (error) {
      setRoom(null);
    }
  };

  useEffect(() => {
    if (id) {
      queryRoomDetails(id);
    }
  }, [id]);

  const [formData, setFormData] = useState({
    name: "Usuário Teste",
    document: "",
    checkIn: "12/06/2025",
    checkOut: "12/05/2025",
    acceptTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  if (!room) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Quarto não encontrado
            </h1>
            <Button onClick={() => navigate("/rooms")} className="mt-4">
              Voltar para lista de quartos
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms || !formData.checkIn || !formData.checkOut) {
      toast.error("Aceite os termos de reserva e preencha as datas para continuar");
      return;
    }

    setIsLoading(true);
    navigate(`/payment/${id}/${formData.checkIn}/${formData.checkOut}`);
  };

  function parseDateLocal(dateString?: string): Date | undefined {
    if (!dateString) return undefined;
    const parts = dateString.split("-");
    if (parts.length !== 3) return undefined;
  
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
  
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return undefined;
  
    return date;
  }
  

  const total = room.price * Number(days);

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
              <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                <Bed size={32} className="text-gray-600" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <DateFilters
                checkInDate={parseDateLocal(formData.checkIn)}
                checkOutDate={parseDateLocal(formData.checkOut)}
                onCheckInChange={(date) =>
                  setFormData({
                    ...formData,
                    checkIn: date ? format(date, "yyyy-MM-dd") : "",
                  })
                }
                onCheckOutChange={(date) =>
                  setFormData({
                    ...formData,
                    checkOut: date ? format(date, "yyyy-MM-dd") : "",
                  })
                }
                maxNights={Number(days)}
              />

              <div className="flex items-center space-x-3 pt-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptTerms: e.target.checked })
                  }
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
                      R$ {Number(total).toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-lg text-gray-500 ml-1">
                      / {days} {Number(days) > 1 ? "diárias" : "diária"}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/rooms")}
                    className="px-8"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 bg-gray-800 hover:bg-gray-900"
                  >
                    {isLoading ? "Processando..." : "Ir para o pagamento"}
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

export default Booking;
