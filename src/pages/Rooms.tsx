import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Room } from "@/types";
import { filterRooms, FilterRoomsParams } from "@/services/api/rooms";
import { useAuth } from "@/contexts/AuthContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface priceFilter {
  min_price?: number;
  max_price?: number;
}

interface paginationFilter {
  page: number;
  per_page: number;
}

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState<priceFilter>({
    min_price: null,
    max_price: null,
  });
  const [paginationFilter, setPaginationFilter] = useState<paginationFilter>({
    page: 1,
    per_page: 4,
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const { user } = useAuth();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setPaginationFilter((prev) => ({ ...prev, page }));
    }
  };

  const queryFilteredRooms = (
    page: number,
    per_page: number,
    available: string | boolean,
    min_price?: number,
    max_price?: number,
    search?: string,
  ) => {
    const filters: FilterRoomsParams = { page, per_page };

    if (available !== "all") {
      filters.available = available == "available" ? true : false;
    }

    if (search) {
      filters.search = search;
    }

    if (min_price) {
      filters.min_price = min_price;
    }

    if (max_price) {
      filters.max_price = max_price;
    }

    filterRooms(filters, user.token).then((response) => {
      setRooms(response.items);
      setLastPage(response.last_page);
    });
  };

  useEffect(() => {
    queryFilteredRooms(
      paginationFilter.page,
      paginationFilter.per_page,
      availabilityFilter,
      priceFilter.min_price,
      priceFilter.max_price,
      searchTerm
    );
  }, [
    paginationFilter.page,
    paginationFilter.per_page,
    availabilityFilter,
    priceFilter.min_price,
    priceFilter.max_price,
    searchTerm
  ]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Lista de quartos</h1>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Buscar quartos
            </Label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Quarto com vista para o mar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-lg"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="w-full sm:w-40">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Disponibilidade
            </Label>
            <Select
              value={availabilityFilter}
              onValueChange={setAvailabilityFilter}
            >
              <SelectTrigger className="h-11 rounded-lg">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="available">Disponíveis</SelectItem>
                <SelectItem value="unavailable">Indisponíveis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Preço mínimo
              </Label>
              <Input
                type="number"
                placeholder="0"
                min={0}
                value={priceFilter.min_price ?? ""}
                onChange={(e) =>
                  setPriceFilter({
                    ...priceFilter,
                    min_price: Number(e.target.value),
                  })
                }
                className="h-11 rounded-lg"
              />
            </div>

            <div className="w-full sm:w-32">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Preço máximo
              </Label>
              <Input
                type="number"
                placeholder="0"
                min={0}
                value={priceFilter.max_price ?? ""}
                onChange={(e) =>
                  setPriceFilter({
                    ...priceFilter,
                    max_price: Number(e.target.value),
                  })
                }
                className="h-11 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Grid de quartos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
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
                  <Link to={`/room/${room.id}`}>
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

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhum quarto encontrado com os filtros aplicados.
            </p>
          </div>
        )}

        <div className="pt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => goToPage(paginationFilter.page - 1)}
                  className={
                    paginationFilter.page === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === paginationFilter.page}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => goToPage(paginationFilter.page + 1)}
                  className={
                    paginationFilter.page === lastPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;
