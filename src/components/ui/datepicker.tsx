import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ActiveModifiers, SelectSingleEventHandler } from "react-day-picker"; // Import ActiveModifiers type

// Define the props for DatePicker
type Props = {
  selected: Date | undefined; // Allow for undefined if no date is selected
  onSelect: SelectSingleEventHandler;
};

export function DatePicker({ selected, onSelect }: Props): JSX.Element {
  const [date, setDate] = React.useState<Date | undefined>(selected);

  // Handle date selection
  const handleDateSelect = (
    day: Date | undefined,
    modifiers: ActiveModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    setDate(day);
    if (day) {
      onSelect(day, day, modifiers, e);
    } else {
      onSelect(undefined, day!, modifiers, e);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect as unknown as SelectSingleEventHandler}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
