"use client";

import React, { useState, useEffect } from "react";


const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[time.getDay()];
  const date = `${("0" + time.getDate()).slice(-2)}/${(
    "0" +
    (time.getMonth() + 1)
  ).slice(-2)}/${time.getFullYear()}`;

  return (
    <div className="flex justify-between bg-accent rounded-md p-2 lg:justify-end gap-4 lg:px-8 flex-col md:flex-row ">
      <div className="rounded-md bg-accent-foreground text-accent px-2 py-1 text-center hidden md:block">
        {dayName}
      </div>
      <div className="rounded-md bg-accent-foreground text-accent px-2 py-1 text-center hidden md:block">
        {date}
      </div>
      <div className="rounded-md bg-accent-foreground text-accent px-2 py-1 text-center">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default TimeDisplay;
