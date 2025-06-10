
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceFiltersProps {
  minPrice?: number;
  maxPrice?: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const PriceFilters = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-32">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Preço mínimo
        </Label>
        <Input
          type="number"
          placeholder="0"
          min={0}
          value={minPrice ?? ""}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
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
          value={maxPrice ?? ""}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="h-11 rounded-lg"
        />
      </div>
    </div>
  );
};

export default PriceFilters;
