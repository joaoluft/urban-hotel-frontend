import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { Booking } from "@/types";
import { getBookings } from "@/services/api/bookings";
import { cancelBooking } from "@/services/api/bookingCancelation";
import { toast } from "sonner";

const MyBookings = () => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar reservas:", error);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelBooking = async (externalId: string) => {
    try {
      await cancelBooking(externalId);
      toast.success("Reserva cancelada com sucesso!");
  
      const updatedBookings = await getBookings();
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      toast.error("Erro ao cancelar reserva. Tente novamente mais tarde.");
    }
  };
  

  const getStatusText = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "Confirmada";
      case "FAILED":
        return "Pendente";
      case "REFUNDED":
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  function getBookingDays(
    checkinDate: string | Date,
    checkoutDate: string | Date
  ): number {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);

    // Milissegundos em um dia
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Zera as horas para evitar erros com horários
    checkin.setHours(0, 0, 0, 0);
    checkout.setHours(0, 0, 0, 0);

    // Retorna a diferença em dias
    return Math.round((checkout.getTime() - checkin.getTime()) / MS_PER_DAY);
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas reservas</h1>
        </div>

        {bookings.length === 0 ? (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma reserva encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Você ainda não possui reservas. Que tal fazer sua primeira
                reserva?
              </p>
              <Button className="bg-gray-800 hover:bg-gray-900">
                Fazer reserva
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const days = getBookingDays(
                booking.checkin_date,
                booking.checkout_date
              );

              return (
                <Card
                  key={booking.external_id}
                  className="shadow-lg border-0 hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-8">
                        {/* Informações do quarto */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 truncate">
                              {booking.room_name}
                            </h3>
                            <Badge
                              className={getStatusColor(booking.payment_status)}
                            >
                              {getStatusText(booking.payment_status)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>
                                Check-in:{" "}
                                {new Date(
                                  booking.checkin_date
                                ).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>
                                Check-out:{" "}
                                {new Date(
                                  booking.checkout_date
                                ).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Preço e duração */}
                        <div className="text-center lg:text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            R$ {booking.amount.toFixed(2).replace(".", ",")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {days} diária{days > 1 ? "s" : ""}
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                          {booking.payment_status === "SUCCESS" && (
                            <Button onClick={() => handleCancelBooking(booking.external_id)} variant="destructive" size="sm">
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBookings;
