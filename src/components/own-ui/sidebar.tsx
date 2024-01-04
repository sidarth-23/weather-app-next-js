import {
  AlarmSmokeIcon,
  ShipWheel,
  UtilityPole,
  Zap,
} from "lucide-react";
import SidebarButton from "./sidebar-button";
import { Button } from "../ui/button";
import Link from "next/link";
import SocialsButtons from "./socials-buttons";

export default function Sidebar() {
  const routes = [
    { href: "/current", icon: ShipWheel, label: "Current Weather" },
    { href: "/alerts", icon: AlarmSmokeIcon, label: "Weather Alerts" },
    { href: "/historic", icon: UtilityPole, label: "Historic Data" },
  ];

  return (
    <div className="bg-gray-400 w-16 lg:w-60 min-h-full flex flex-col justify-between p-3 lg:p-6">
      <ul className="flex flex-col gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-transparent px-1 lg:px-4 mb-4"
          asChild
        >
          <Link className="w-full flex gap-1 item-center" href="/">
            <Zap className="h-6 w-6" />
            <span className="hidden lg:block">Open Weather App</span>
          </Link>
        </Button>
        {routes.map(({ href, icon: Icon, label }) => (
          <SidebarButton href={href} key={href}>
            <div className="truncate flex items-center gap-2 justify-center">
              <Icon className="h-6 w-6" />
              <span className="hidden lg:block">{label}</span>
            </div>
          </SidebarButton>
        ))}
      </ul>
      <div className="fixed bottom-4">
      <SocialsButtons />
      </div>
    </div>
  );
}
