"use server";

import { revalidatePath } from "next/cache";

const API_KEY = process.env.WEATHER_BIT_API_KEY;

interface WeatherFunction {
  city?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
}

interface ForecastWeatherFunction extends WeatherFunction {
  unit: string;
}

export async function getCurrentWeather({
  unit,
  city,
  zipCode,
  lat,
  lng,
}: ForecastWeatherFunction) {
  let res;
  if (city) {
    console.log('city log', city)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}&units=${unit}`
    );
  } else if (zipCode) {
    console.log('zipCode log', zipCode)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/current?postal_code=${zipCode}&key=${API_KEY}&units=${unit}`
    );
  } else {
    console.log('lat log', lat)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${API_KEY}&units=${unit}`
    );
  }
  const weather = await res.json()
  console.log('weather log', weather)
  revalidatePath("/current");
  return weather;
}

interface HistoricWeatherFunction extends ForecastWeatherFunction {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export async function getHistoricWeather({
  unit,
  city,
  zipCode,
  lat,
  lng,
  startDate,
  endDate
}: HistoricWeatherFunction) {
  if (!startDate || !endDate) throw new Error('Start and end date must be defined')
  const startingDate = `${startDate?.getFullYear()}-${startDate?.getMonth() + 1}-${startDate?.getDate()}`
  const endingDate = `${endDate?.getFullYear()}-${endDate?.getMonth() + 1}-${endDate?.getDate()}`
  let res;
  if (city) {
    console.log('city log', city)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/history/daily?city=${city}&key=${API_KEY}&units=${unit}&start_date=${startingDate}&end_date=${endingDate}`
    );
  } else if (zipCode) {
    console.log('zipCode log', zipCode)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/history/daily?postal_code=${zipCode}&key=${API_KEY}&units=${unit}&start_date=${startingDate}&end_date=${endingDate}`
    );
  } else {
    console.log('lat log', lat)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lng}&key=${API_KEY}&units=${unit}&start_date=${startingDate}&end_date=${endingDate}`
    );
  }
  const weather = await res.json()
  console.log('weather log', weather)
  revalidatePath("/historic");
  return weather;
}

export async function getWeatherAlerts ({
  city,
  zipCode,
  lat,
  lng,
}: WeatherFunction) {
  let res;
  if (city) {
    console.log('city log', city)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/alerts?city=${city}&key=${API_KEY}`
    );
  } else if (zipCode) {
    console.log('zipCode log', zipCode)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/alerts?postal_code=${zipCode}&key=${API_KEY}`
    );
  } else {
    console.log('lat log', lat)
    res = await fetch(
      `https://api.weatherbit.io/v2.0/alerts?lat=${lat}&lon=${lng}&key=${API_KEY}`
    );
  }
  const weather = await res.json()
  console.log('weather log', weather)
  revalidatePath("/alerts");
  return weather;
}
