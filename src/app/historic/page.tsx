import DataBox from "./_components/data-box";
import InputBox from "./_components/input-box";

export default function HistoricWeatherPage() {
    
  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-4">
      <h1 className="text-2xl ">Historic Weather</h1>
      <InputBox />
      <DataBox />
    </div>
  );
}
