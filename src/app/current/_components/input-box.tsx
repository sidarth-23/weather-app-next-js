"use client";

import { useEffect, useState } from "react";
import { currentWeatherData } from "@/lib/store/current-weather";
import { getCurrentWeather } from "@/lib/actions/weather";
import { InputContainer } from "@/components/own-ui/input-box";

export default function InputBox() {
  let latlng = { lat: 0, lng: 0 };
  const [filter, setFilter] = useState("city");
  const { updateDataLoading, updateData, updateUnit, unit, inputValue, updateInputValue } =
    currentWeatherData();
  const value = inputValue;

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
        getCurrentWeather({
          lat: latlng.lat,
          lng: latlng.lng,
          unit: unitTemp,
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
          getCurrentWeather({ city: value, unit: unitTemp })
            .then((res) => {
              updateData(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => updateDataLoading(false));
        } else if (filter === "zipCode") {
          getCurrentWeather({ zipCode: value, unit: unitTemp })
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
  }, [value, unit, filter]);

  return (
    <InputContainer
      filterHandle={handleFilterChange}
      valueChangeHandle={(e) => updateInputValue(e.target.value)}
      locationHandle={handleLocationClick}
      unitHandle={handleUnitChange}
      inputValue={value}
      filter={filter}
    />
  );
}
