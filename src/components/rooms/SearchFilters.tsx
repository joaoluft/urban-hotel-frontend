
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  availabilityFilter: string;
  onSearchChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
}

const SearchFilters = ({
  searchTerm,
  availabilityFilter,
  onSearchChange,
  onAvailabilityChange,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Buscar quartos
        </Label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Quarto com vista para o mar..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 rounded-lg"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="w-full sm:w-40">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
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
    </div>
  );
};

export default SearchFilters;
