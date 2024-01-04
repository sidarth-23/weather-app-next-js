"use client";

import { LocateFixed } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

interface InputBoxProps {
  filterHandle: (value: string) => void;
  unitHandle: (value: string) => void;
  valueChangeHandle: (e: any) => void;
  locationHandle: () => void;
  filter: string;
  inputValue: string;
}

export function InputContainer({
  filterHandle,
  valueChangeHandle,
  locationHandle,
  unitHandle,
  filter,
  inputValue,
}: InputBoxProps) {
  return (
    <div className="grid md:flex gap-4 items-center">
      <Button onClick={locationHandle}>
        <LocateFixed />
      </Button>
      <div className="flex flex-col md:grid md:grid-cols-3 border border-input p-2 rounded-md">
        <Select onValueChange={filterHandle}>
          <SelectTrigger className="border-0 focus:ring-0">
            <SelectValue
              placeholder="City"
              className="col-span-1 border-none focus-visible:ring-0 active:ring-0 "
            />
          </SelectTrigger>
          <SelectContent defaultValue={filter}>
            <SelectItem className="focus-visible:ring-0" value="city">
              City
            </SelectItem>
            <SelectItem className="focus-visible:ring-0" value="zipCode">
              Zip Code
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          type={filter === "city" ? "text" : "number"}
          placeholder="Enter Text"
          className="col-span-2 border-none focus-visible:ring-0 active:border-none"
          value={inputValue}
          onChange={valueChangeHandle}
        />
      </div>
      <div className="border border-input p-2 rounded-md">
        <Select onValueChange={unitHandle}>
          <SelectTrigger className="border-0 focus:ring-0">
            <SelectValue
              placeholder="Celcius"
              className="col-span-1 border-none focus-visible:ring-0 active:ring-0 "
            />
          </SelectTrigger>
          <SelectContent defaultValue={filter}>
            <SelectItem className="focus-visible:ring-0" value="°C">
              Celcius
            </SelectItem>
            <SelectItem className="focus-visible:ring-0" value="°F">
              Farenheit
            </SelectItem>
            <SelectItem className="focus-visible:ring-0" value="K">
              Kelvin
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
