import InputBox from "./_components/input-box";
import DataBox from "./_components/data-box";

export default function CurrentWeatherPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-4">
      <h1 className="text-2xl ">Current Weather</h1>
      <InputBox />
      <DataBox />
    </div>
  );
}
