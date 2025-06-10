import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Room } from "@/types";
import { filterRooms, FilterRoomsParams } from "@/services/api/rooms";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import RoomsFilters from "@/components/rooms/RoomsFilters";
import RoomGrid from "@/components/rooms/RoomGrid";
import RoomsPagination from "@/components/rooms/RoomsPagination";

interface priceFilter {
  min_price?: number;
  max_price?: number;
}

interface paginationFilter {
  page: number;
  per_page: number;
}

interface dateFilter {
  check_in?: Date;
  check_out?: Date;
}

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState<priceFilter>({
    min_price: null,
    max_price: null,
  });
  const [dateFilter, setDateFilter] = useState<dateFilter>({
    check_in: new Date(),
    check_out: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias à frente
  });
  const [paginationFilter, setPaginationFilter] = useState<paginationFilter>({
    page: 1,
    per_page: 4,
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setPaginationFilter((prev) => ({ ...prev, page }));
    }
  };

  const handleCheckInChange = (date: Date | undefined) => {
    if (date) {
      setDateFilter((prev) => {
        const newFilter = { ...prev, check_in: date };
        // Se a data de check-out for menor que check-in, ajustar check-out
        if (prev.check_out && date >= prev.check_out) {
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);
          newFilter.check_out = nextDay;
        }
        return newFilter;
      });
    }
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    if (date && dateFilter.check_in && date > dateFilter.check_in) {
      setDateFilter((prev) => ({ ...prev, check_out: date }));
    }
  };

  const handleMinPriceChange = (value: number) => {
    setPriceFilter((prev) => ({ ...prev, min_price: value }));
  };

  const handleMaxPriceChange = (value: number) => {
    setPriceFilter((prev) => ({ ...prev, max_price: value }));
  };

  const queryFilteredRooms = async (
    page: number,
    per_page: number,
    available: string | boolean,
    min_price?: number,
    max_price?: number,
    search?: string,
    check_in?: Date,
    check_out?: Date
  ) => {
    setIsLoading(true);

    const filters: FilterRoomsParams = { page, per_page };

    if (available !== "all") {
      filters.available = available === "available";
    }

    if (search) {
      filters.search = search;
    }

    if (min_price) filters.min_price = min_price;
    if (max_price) filters.max_price = max_price;
    
    // Adicionar filtros de data se disponíveis
    if (check_in) {
      filters.check_in = format(check_in, 'yyyy-MM-dd');
    }
    if (check_out) {
      filters.check_out = format(check_out, 'yyyy-MM-dd');
    }

    try {
      const response = await filterRooms(filters);
      setRooms(response.items);
      setLastPage(response.last_page);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queryFilteredRooms(
      paginationFilter.page,
      paginationFilter.per_page,
      availabilityFilter,
      priceFilter.min_price,
      priceFilter.max_price,
      searchTerm,
      dateFilter.check_in,
      dateFilter.check_out
    );
  }, [
    paginationFilter.page,
    paginationFilter.per_page,
    availabilityFilter,
    priceFilter.min_price,
    priceFilter.max_price,
    searchTerm,
    dateFilter.check_in,
    dateFilter.check_out
  ]);

  return (
    <Layout>
      <div className="flex min-h-screen">
        {/* Sidebar com filtros */}
        <RoomsFilters
          searchTerm={searchTerm}
          availabilityFilter={availabilityFilter}
          minPrice={priceFilter.min_price}
          maxPrice={priceFilter.max_price}
          checkInDate={dateFilter.check_in}
          checkOutDate={dateFilter.check_out}
          onSearchChange={setSearchTerm}
          onAvailabilityChange={setAvailabilityFilter}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
        />

        {/* Conteúdo principal */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">Lista de quartos</h1>
            </div>

            <RoomGrid
              rooms={rooms}
              isLoading={isLoading}
              itemsPerPage={paginationFilter.per_page}
            />

            <RoomsPagination
              currentPage={paginationFilter.page}
              lastPage={lastPage}
              onPageChange={goToPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;
