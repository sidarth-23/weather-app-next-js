"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { InputContainer } from "@/components/own-ui/input-box";
import { historicWeatherData } from "../../../lib/store/historic-data";
import { useEffect, useState } from "react";
import { getHistoricWeather } from "@/lib/actions/weather";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function InputBox() {
  const { updateDataLoading, updateData, updateUnit, unit, inputValue, updateInputValue } =
    historicWeatherData();
  const value = inputValue;
  let latlng = { lat: 0, lng: 0 };
  const [filter, setFilter] = useState("city");
  const [date, setDate] = useState<DateRange| undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });

  const handleLocationClick = () => {
    updateDataLoading(true);
    if (navigator.geolocation) {
      updateInputValue("");
      navigator.geolocation.getCurrentPosition((position) => {
        setFilter("latlng");
        latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    updateInputValue("");
  };

  const handleUnitChange = (value: string) => {
    updateDataLoading(true);
    updateUnit(value);
  };

  useEffect(() => {
    // Clear the previous timer if there is any
    let timer: NodeJS.Timeout | null = null;
    // Function to be debounced
    const fetchWeather = () => {
      const unitTemp = unit === "°C" ? "M" : unit === "°F" ? "I" : "S";
      if (filter === "latlng") {
        getHistoricWeather({
          lat: latlng.lat,
          lng: latlng.lng,
          unit: unitTemp,
          startDate: date?.from,
          endDate: date?.to,
        })
          .then((res) => {
            updateData(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setFilter("city");
            updateDataLoading(false);
          });
      } else if (value) {
        updateDataLoading(true);
        if (filter === "city") {
          getHistoricWeather({
            city: value,
            unit: unitTemp,
            startDate: date?.from,
            endDate: date?.to,
          })
            .then((res) => {
              updateData(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => updateDataLoading(false));
        } else if (filter === "zipCode") {
          getHistoricWeather({
            zipCode: value,
            unit: unitTemp,
            startDate: date?.from,
            endDate: date?.to,
          })
            .then((res) => {
              updateData(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => updateDataLoading(false));
        }
      }
    };

    // Debounce function
    const debounce = (func: () => void, delay: number) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, delay);
    };

    // Call the debounce function
    debounce(fetchWeather, 500);

    // Cleanup function to clear the timeout if the value changes before the timeout finishes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, unit, filter, date]);
  return (
    <div className="grid gap-2">
      <InputContainer
        filterHandle={handleFilterChange}
        valueChangeHandle={(e) => updateInputValue(e.target.value)}
        locationHandle={handleLocationClick}
        unitHandle={handleUnitChange}
        inputValue={value}
        filter={filter}
      />
      <div className="w-full border border-input p-2 rounded-md">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal border-none w-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            toDate={new Date()}
            
          />
        </PopoverContent>
      </Popover>
    </div>
    </div>
  );
}
