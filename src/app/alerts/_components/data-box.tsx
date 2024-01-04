"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { weatherAlertData } from "@/lib/store/weather-alerts";
import { cn } from "@/lib/utils";

export default function DataBox() {
  const { data, dataLoading } = weatherAlertData();
  if (!data || !data.alerts) return <div>No Data to be displayed</div>;
  if (dataLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h2 className="text-2xl font-bold">Loading...</h2>
        <Skeleton className="h-10 w-full"/>
        <Skeleton className="h-16 w-full"/>
        <Skeleton className="h-5 w-full"/>
        <Skeleton className="h-5 w-full"/>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">{data.city_name}</h2>
      {data.alerts.map((alert, index) => {
        const descriptions = alert.description.split("\n");
        const englishDescription = descriptions.find((description) =>
          description.startsWith("English(en):")
        );
        englishDescription?.replace("English(en):", "");
        return (
          <div key={index} className="lg:px-4 flex flex-col gap-4 py-4">
            <h4
              className={cn(
                alert.severity === "Advisory"
                  ? "bg-gray-300"
                  : alert.severity === "Watch"
                  ? "bg-yellow-200"
                  : "bg-red-300",
                "rounded-md p-2 text-slate-900"
              )}
            >
              {alert.title} ({alert.severity})
            </h4>
            <p>{englishDescription}</p>
            <div className="text-muted-foreground text-md">
              <p>
                Effective: {alert.effective_local} ({alert.effective_utc} UTC)
              </p>
              <p>
                Expires: {alert.expires_local} ({alert.expires_utc} UTC)
              </p>
              <p>
                Onset: {alert.onset_local} ({alert.onset_utc} UTC)
              </p>
              <p>
                Ends: {alert.ends_local} ({alert.ends_utc} UTC)
              </p>
            </div>
            <a className="hover:cursor-pointer" href={alert.uri}>
              More Info
            </a>
          </div>
        );
      })}
      {data.alerts.length === 0 && (
        <div>No Warning Alerts for this location</div>
      )}
    </div>
  );
}
