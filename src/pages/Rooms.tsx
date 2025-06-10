
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Room } from "@/types";
import { filterRooms, FilterRoomsParams } from "@/services/api/rooms";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import SearchFilters from "@/components/rooms/SearchFilters";
import DateFilters from "@/components/rooms/DateFilters";
import PriceFilters from "@/components/rooms/PriceFilters";
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
      const response = await filterRooms(filters, user.token);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">Lista de quartos</h1>
        </div>

        {/* Filtros */}
        <div className="space-y-4 mb-8">
          <SearchFilters
            searchTerm={searchTerm}
            availabilityFilter={availabilityFilter}
            onSearchChange={setSearchTerm}
            onAvailabilityChange={setAvailabilityFilter}
          />

          <DateFilters
            checkInDate={dateFilter.check_in}
            checkOutDate={dateFilter.check_out}
            onCheckInChange={handleCheckInChange}
            onCheckOutChange={handleCheckOutChange}
          />

          <PriceFilters
            minPrice={priceFilter.min_price}
            maxPrice={priceFilter.max_price}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
          />
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
    </Layout>
  );
};

export default Rooms;
