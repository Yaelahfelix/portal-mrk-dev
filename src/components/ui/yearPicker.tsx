"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/core/lib/utils";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

const YearPicker = ({
  value,
  onChange,
  startYear = 1990,
  endYear = new Date().getFullYear(),
}: {
  value?: number;
  onChange: (year: number) => void;
  startYear?: number;
  endYear?: number;
}) => {
  const [open, setOpen] = useState(false);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  return (
    <Popover isOpen={open} onOpenChange={setOpen} placement="bottom">
      <PopoverTrigger asChild>
        <Button
          variant="flat"
          role="combobox"
          className="w-full justify-between"
        >
          {value ? value : "Pilih Tahun"}
          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandGroup className="overflow-y-auto max-h-[300px]">
            {years.map((year) => (
              <CommandItem
                key={year}
                onSelect={() => {
                  onChange(year);
                  setOpen(false);
                }}
              >
                {year}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;
