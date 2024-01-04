import { CurrentWeatherData } from "@/lib/interface";
import { create } from "zustand";

interface CurrentWeatherStore {
  inputValue: string;
  updateInputValue: (inputValue: string) => void;
  data: CurrentWeatherData;
  updateData: (data: CurrentWeatherData) => void;
  unit: string;
  updateUnit: (unit: string) => void;
  dataLoading: boolean;
  updateDataLoading: (dataLoading: boolean) => void;
}

export const currentWeatherData = create<CurrentWeatherStore>((set) => ({
  inputValue: "",
  updateInputValue: (inputValue) => set(() => ({ inputValue })),
  data: new CurrentWeatherData(),
  updateData: (data) => set(() => ({ data })),
  unit: "°C",
  updateUnit: (unit) => set(() => ({ unit })),
  dataLoading: false,
  updateDataLoading: (dataLoading) => set(() => ({ dataLoading })),
}));
