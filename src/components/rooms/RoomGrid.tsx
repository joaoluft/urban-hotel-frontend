
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { Room } from "@/types";

interface RoomGridProps {
  rooms: Room[];
  isLoading: boolean;
  itemsPerPage: number;
}

const RoomGrid = ({ rooms, isLoading, itemsPerPage }: RoomGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-32 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Nenhum quarto encontrado com os filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <Card
          key={room.external_id}
          className="hover:shadow-lg transition-shadow border-0 shadow-md"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {room.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {room.price.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-gray-500">/Noite</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button className="text-gray-400 hover:text-yellow-500">
                  <Star size={24} />
                </button>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    room.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {room.available ? "Disponível" : "Indisponível"}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to={`/room/${room.external_id}`}>
                <Button
                  variant="outline"
                  className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                >
                  Ver detalhes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoomGrid;
