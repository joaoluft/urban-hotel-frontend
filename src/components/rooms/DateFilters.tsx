
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateFiltersProps {
  checkInDate?: Date;
  checkOutDate?: Date;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

const DateFilters = ({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}: DateFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Data de Check-in
        </Label>
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
              {checkInDate ? format(checkInDate, "dd/MM/yyyy") : <span>Selecione a data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={onCheckInChange}
              disabled={(date) => date < new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Data de Check-out
        </Label>
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
              {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : <span>Selecione a data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={onCheckOutChange}
              disabled={(date) => !checkInDate || date <= checkInDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateFilters;
