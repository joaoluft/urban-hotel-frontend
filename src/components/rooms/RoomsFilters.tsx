
import { CalendarIcon, Filter, Search } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RoomsFiltersProps {
  searchTerm: string;
  availabilityFilter: string;
  minPrice?: number;
  maxPrice?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  onSearchChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

const RoomsFilters = ({
  searchTerm,
  availabilityFilter,
  minPrice,
  maxPrice,
  checkInDate,
  checkOutDate,
  onSearchChange,
  onAvailabilityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onCheckInChange,
  onCheckOutChange,
}: RoomsFiltersProps) => {
  return (
    <div className="w-80 border-r bg-background p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      {/* Busca */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium text-gray-700">
          Buscar quartos
        </Label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Quarto com vista..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 rounded-lg"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Disponibilidade */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Disponibilidade
        </Label>
        <Select value={availabilityFilter} onValueChange={onAvailabilityChange}>
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

      {/* Datas */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Período da estadia
        </Label>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal rounded-lg",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, "dd/MM/yyyy") : <span>Selecione</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={onCheckInChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-xs text-gray-500 mb-1 block">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal rounded-lg",
                    !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : <span>Selecione</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={onCheckOutChange}
                  disabled={(date) => !checkInDate || date <= checkInDate}
                  initialFocus
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Preços */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Faixa de preço
        </Label>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">Preço mínimo</Label>
            <Input
              type="number"
              placeholder="0"
              min={0}
              value={minPrice ?? ""}
              onChange={(e) => onMinPriceChange(Number(e.target.value))}
              className="h-11 rounded-lg"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-500 mb-1 block">Preço máximo</Label>
            <Input
              type="number"
              placeholder="0"
              min={0}
              value={maxPrice ?? ""}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="h-11 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsFilters;
