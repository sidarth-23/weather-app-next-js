import DataBox from "./_components/data-box";
import InputBox from "./_components/input-box";

export default function WeatherAlertsPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-10 pt-4">
            <h1 className="text-2xl ">Weather Alerts</h1>
            <InputBox />
            <DataBox />
        </div>
    )
}