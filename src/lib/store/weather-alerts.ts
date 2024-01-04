import { WeatherAlertData } from "@/lib/interface";
import { create } from "zustand";

interface WeatherAlertStore {
  inputValue: string;
  updateInputValue: (inputValue: string) => void;
  data: WeatherAlertData;
  updateData: (data: WeatherAlertData) => void;
  dataLoading: boolean;
  updateDataLoading: (dataLoading: boolean) => void;
}

export const weatherAlertData = create<WeatherAlertStore>((set) => ({
  inputValue: "",
  updateInputValue: (inputValue) => set(() => ({ inputValue })),
  data: new WeatherAlertData(),
  updateData: (data) => set(() => ({ data })),
  dataLoading: false,
  updateDataLoading: (dataLoading) => set(() => ({ dataLoading })),
}));
