"use client";
import Image from "next/image";
import { currentWeatherData } from "@/lib/store/current-weather";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightFromLine, Sunrise, Sunset, WindIcon } from "lucide-react";

export default function DataBox() {
  const { data, unit, dataLoading } = currentWeatherData();
  const tempUnit = unit;
  if (!data.count || !data.data[0].clouds)
    return <div>No Data to be displayed</div>;
  if (dataLoading)
    return (
      <div className="w-full min-h-[300px] grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div className="h-full w-full" key={i}>
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );

  const today = new Date();
  const dateString = today.toISOString().split("T")[0];

  const sunriseTime = new Date(`${dateString}T${data.data[0].sunrise}Z`);
  const sunriseLocalTime = sunriseTime
    .toLocaleString("en-US", {
      timeZone: data.data[0].timezone,
      hour: "2-digit",
      minute: "2-digit",
    })
    ;

  const sunsetTime = new Date(`${dateString}T${data.data[0].sunset}Z`);
  const sunsetLocalTime = sunsetTime
    .toLocaleString("en-US", {
      timeZone: data.data[0].timezone,
      hour: "2-digit",
      minute: "2-digit",
    })
    ;
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="box-border min-h-56 w-11/12 bg-gray-200 dark:bg-gray-800 p-3 lg:px-8 flex flex-col items-center justify-center rounded-md gap-6">
          <div className="w-full border-b-[1px] border-muted-foreground">
            <p className="text-2xl pb-2 font-semibold">
              {data.data[0].city_name}
            </p>
          </div>
          <p className="text-6xl font-bold ">
            {data.data[0].temp}
            {tempUnit}
          </p>
          <div className="w-full">
            <div className="w-full flex gap-1">
              <Image
                width={30}
                height={30}
                src={`/icons/${data.data[0].weather.icon}.png`}
                alt={data.data[0].weather.description}
              />
              <p>{data.data[0].weather.description}</p>
            </div>
            <div className="w-full text-md text-muted-foreground">
              <p>
                Feels Like {data.data[0].app_temp}
                {tempUnit}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border min-h-56 w-11/12 bg-gray-200 dark:bg-gray-800 p-3 lg:px-8 flex flex-col items-center rounded-md gap-6">
          <div className="w-full border-b-[1px] border-muted-foreground">
            <p className="text-center text-2xl pb-2 font-semibold">UV Index</p>
          </div>
          <p className="text-6xl font-bold ">{data.data[0].uv}</p>
        </div>
        <div className="box-border min-h-56 w-11/12 bg-gray-200 dark:bg-gray-800 p-3 lg:px-8 flex flex-col items-center rounded-md gap-6">
          <div className="w-full border-b-[1px] border-muted-foreground">
            <p className="text-center text-2xl pb-2 font-semibold">Wind</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className=" flex gap-1 capitalize">
              <ArrowRightFromLine className="text-muted-foreground" />
              <p className="text-muted-foreground font-bold">direction: </p>
              <p>{data.data[0].wind_cdir_full.replace("-", " ")}</p>
            </div>

            <div className=" flex gap-1 capitalize">
              <WindIcon className="text-muted-foreground" />
              <p className="text-muted-foreground font-bold">Speed: </p>
              <p>
                {data.data[0].wind_spd} {unit === "I" ? "mph" : "m/s"}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border min-h-56 w-11/12 bg-gray-200 dark:bg-gray-800 p-3 lg:px-8 flex flex-col items-center rounded-md gap-6">
          <div className="w-full border-b-[1px] border-muted-foreground">
            <p className="text-center text-2xl pb-2 font-semibold">Daylight</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className=" flex gap-1 capitalize">
              <Sunrise className="text-muted-foreground" />
              <p className="text-muted-foreground font-bold">sunrise: </p>
              <p>{sunriseLocalTime}</p>
            </div>

            <div className=" flex gap-1 capitalize">
              <Sunset className="text-muted-foreground" />
              <p className="text-muted-foreground font-bold">sunset: </p>
              <p>{sunsetLocalTime}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="rounded-md bg-gray-100 dark:bg-gray-900 text-center py-2">
        Last Observed:{" "}
        <span className="text-muted-foreground">{data.data[0].ob_time}</span>
      </p>
    </div>
  );
}
