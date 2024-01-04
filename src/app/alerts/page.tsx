import DataBox from "./_components/data-box";
import InputBox from "./_components/input-box";

export default function WeatherAlertsPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-10 pt-4">
            <InputBox />
            <DataBox />
        </div>
    )
}