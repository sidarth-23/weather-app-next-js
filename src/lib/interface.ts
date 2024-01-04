export class CurrentWeatherData {
  count!: number;
  data!: {
    lat: number;
    lon: number;
    sunrise: string;
    sunset: string;
    timezone: string;
    station: string;
    sources: string[];
    ob_time: string;
    datetime: string;
    ts: number;
    city_name: string;
    country_code: string;
    state_code: string;
    pres: number;
    slp: number;
    wind_spd: number;
    gust: number;
    wind_dir: number;
    wind_cdir: string;
    wind_cdir_full: string;
    temp: number;
    app_temp: number;
    rh: number;
    dewpt: number;
    clouds: number;
    pod: string;
    weather: {
      icon: string;
      code: number;
      description: string;
    };
    vis: number;
    precip: number;
    snow: number;
    uv: number;
    aqi: number;
    dhi: number;
    dni: number;
    ghi: number;
    solar_rad: number;
    elev_angle: number;
    h_angle: number;
  }[];
}

export class HistoricWeatherData {
  city_id!: string;
  city_name!: string;
  country_code!: string;
  data!: HistoricDatum[];
  lat!: number;
  lon!: number;
  sources!: string[];
  state_code!: string;
  station_id!: string;
  timezone!: string;
}

export interface HistoricDatum {
  clouds: number;
  datetime: string;
  dewpt: number;
  dhi: number;
  dni: number;
  ghi: number;
  max_dhi: number;
  max_dni: number;
  max_ghi: number;
  max_temp: number;
  max_temp_ts: number;
  max_uv: number;
  max_wind_dir: number;
  max_wind_spd: number;
  max_wind_spd_ts: number;
  min_temp: number;
  min_temp_ts: number;
  precip: number;
  precip_gpm: number;
  pres: number;
  revision_status: string;
  rh: number;
  slp: number;
  snow: number;
  snow_depth: null;
  solar_rad: number;
  t_dhi: number;
  t_dni: number;
  t_ghi: number;
  t_solar_rad: number;
  temp: number;
  ts: number;
  wind_dir: number;
  wind_gust_spd: number;
  wind_spd: number;
}

export class WeatherAlertData {
  lat!: number;
  lon!: number;
  timezone!: string;
  city_name!: string;
  state_code!: string;
  country_code!: string;
  alerts!: Alert[];
}

export interface Alert {
  title: string;
  description: string;
  severity: "Advisory" | "Watch" | "Warning";
  effective_utc: string;
  effective_local: string;
  expires_utc: string;
  expires_local: string;
  onset_utc?: string;
  onset_local?: string;
  ends_utc?: string;
  ends_local?: string;
  uri: string;
  regions: string[];
}
