import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Room } from "@/types";
import { getRoomDetails } from "@/services/api/rooms";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const roomData = await getRoomDetails(id);
        setRoom(roomData);
      } catch (error) {
        console.error('Erro ao carregar detalhes do quarto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div>Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (!room) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div>Quarto não encontrado</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{room.name}</h1>
        {/* Adicionar mais detalhes do quarto aqui */}
      </div>
    </Layout>
  );
};

export default RoomDetails;
