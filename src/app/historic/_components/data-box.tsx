"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { historicWeatherData } from "@/lib/store/historic-data";

export default function DataBox() {
  const { data, unit, dataLoading } = historicWeatherData();
  if (!data.data || !data.data[0].clouds)
    return <div>No Data to be displayed</div>;
    if (dataLoading) return <div className="w-full flex flex-col gap-3">
        <Skeleton className="h-9 w-full"/>
        {[...Array(5)].map((_, i) => (
            <div className="w-full border border-input p-3  rounded-md h-14 flex gap-2 justify-between" key={i}>
                <Skeleton className="h-7 w-1/3" />
                <Skeleton className="h-7 w-1/3" />
            </div>
            ))
        }
    </div>;
  return (
    <div className="w-full flex flex-col gap-3 ">
      <h1 className="text-3xl">{data.city_name}</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-2"
      >
        {data.data.map((item, index) => (
          <AccordionItem value={item.datetime} key={index}>
            <AccordionTrigger className="w-full border border-input p-3  rounded-md ">
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-bold ">{item.datetime}</p>
                <div className="flex gap-2 text-muted-foreground">
                  <p>
                    H: {item.max_temp}
                    {unit}
                  </p>
                  <p>
                    L: {item.min_temp}
                    {unit}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full h-fit py-2">
                <ul className="list-disc list-inside">
                  <li className="capitalize">
                    Dewpoint:{" "}
                    <span className="text-muted-foreground">
                      {item.dewpt}
                      {unit}
                    </span>
                  </li>
                  <li className="capitalize">
                    Diffusion horizontal solar irradiance:{" "}
                    <span className="text-muted-foreground">
                      {item.dhi} W/m^2
                    </span>
                  </li>
                  <li className="capitalize">
                    Maximum Diffusion horizontal solar irradiance:{" "}
                    <span className="text-muted-foreground">
                      {item.max_dhi} W/m^2
                    </span>
                  </li>
                  <li className="capitalize">
                    Diffusion normal solar irradiance:{" "}
                    <span className="text-muted-foreground">
                      {item.dni} W/m^2
                    </span>
                  </li>
                  <li className="capitalize">
                    Maximum Diffusion normal solar irradiance:{" "}
                    <span className="text-muted-foreground">
                      {item.max_dni} W/m^2
                    </span>
                  </li>
                  <li className="capitalize">
                    Diffusion horizontal solar irradiance:{" "}
                    <span className="text-muted-foreground">
                      {item.ghi} W/m^2
                    </span>
                  </li>
                  <li className="capitalize">
                    Maximum temperature:{" "}
                    <span className="text-muted-foreground">
                      {item.max_temp}
                      {unit}
                    </span>
                  </li>
                  <li className="capitalize">
                    Maximum UV Index:{" "}
                    <span className="text-muted-foreground">{item.max_uv}</span>
                  </li>
                  <li className="capitalize">
                    wind direction:{" "}
                    <span className="text-muted-foreground">
                      {item.wind_dir}°
                    </span>
                  </li>
                  <li className="capitalize">
                    Maximum wind direction:{" "}
                    <span className="text-muted-foreground">
                      {item.max_wind_dir}°
                    </span>
                  </li>
                  <li className="capitalize">
                    Wind speed:{" "}
                    <span className="text-muted-foreground">
                      {item.wind_spd} {unit === "I" ? "mph" : "m/s"}
                    </span>
                  </li>
                  <li className="capitalize">
                    Maximum wind speed:{" "}
                    <span className="text-muted-foreground">
                      {item.max_wind_spd} {unit === "I" ? "mph" : "m/s"}
                    </span>
                  </li>
                  <li className="capitalize">
                    Cloud coverage:{" "}
                    <span className="text-muted-foreground">
                      {item.clouds}%
                    </span>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
