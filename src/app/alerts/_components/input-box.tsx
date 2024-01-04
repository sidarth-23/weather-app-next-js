"use client";

import { useEffect, useState } from "react";
import { weatherAlertData } from "@/lib/store/weather-alerts";
import { getWeatherAlerts } from "@/lib/actions/weather";
import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function InputBox() {
  let latlng = { lat: 0, lng: 0 };
  const [filter, setFilter] = useState("city");
  const { updateDataLoading, updateData, inputValue, updateInputValue } =
    weatherAlertData();
  const value = inputValue;

  const handleInputValueChange = (e: any) => {
    updateInputValue(e.target.value);
  };

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

  useEffect(() => {
    // Clear the previous timer if there is any
    let timer: NodeJS.Timeout | null = null;
    console.log("logging filter", filter);
    // Function to be debounced
    const fetchWeather = () => {
      if (filter === "latlng") {
        console.log("logging latlng", latlng);
        getWeatherAlerts({
          lat: latlng.lat,
          lng: latlng.lng,
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
          getWeatherAlerts({ city: value })
            .then((res) => {
              updateData(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => updateDataLoading(false));
        } else if (filter === "zipCode") {
          getWeatherAlerts({ zipCode: value })
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
  }, [value, filter]);

  return (
    <div className="grid md:flex gap-4 items-center">
      <Button onClick={handleLocationClick}>
        <LocateFixed />
      </Button>
      <div className="flex flex-col md:grid md:grid-cols-3 border border-input p-2 rounded-md">
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="border-0 focus:ring-0">
            <SelectValue
              placeholder="City"
              className="col-span-1 border-none focus-visible:ring-0 active:ring-0 "
            />
          </SelectTrigger>
          <SelectContent defaultValue={filter}>
            <SelectItem className="focus-visible:ring-0" value="city">
              City
            </SelectItem>
            <SelectItem className="focus-visible:ring-0" value="zipCode">
              Zip Code
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          type={filter === "city" ? "text" : "number"}
          placeholder="Enter Text"
          className="col-span-2 border-none focus-visible:ring-0 active:border-none"
          value={inputValue}
          onChange={handleInputValueChange}
        />
      </div>
    </div>
  );
}
