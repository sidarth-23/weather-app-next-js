import { HistoricWeatherData } from "@/lib/interface";
import { create } from "zustand";

interface HistoricWeatherStore {
  inputValue: string;
  updateInputValue: (inputValue: string) => void;
  data: HistoricWeatherData;
  updateData: (data: HistoricWeatherData) => void;
  unit: string;
  updateUnit: (unit: string) => void;
  dataLoading: boolean;
  updateDataLoading: (dataLoading: boolean) => void;
}

export const historicWeatherData = create<HistoricWeatherStore>((set) => ({
  inputValue: "",
  updateInputValue: (inputValue) => set(() => ({ inputValue })),
  data: new HistoricWeatherData(),
  updateData: (data) => set(() => ({ data })),
  unit: "°C",
  updateUnit: (unit) => set(() => ({ unit })),
  dataLoading: false,
  updateDataLoading: (dataLoading) => set(() => ({ dataLoading })),
}));