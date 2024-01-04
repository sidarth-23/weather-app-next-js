"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function SidebarButton({ href, children }: SidebarButtonProps) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li
      className={cn(
        active ? "bg-accent" : "bg-accent-foreground/15 text-accent",
        "rounded-md p-1"
      )}
    >
      <Button size="sm" variant="ghost" className="hover:bg-transparent px-1 lg:px-4" asChild>
        <Link className="max-w-full" href={href}>
          {children}
        </Link>
      </Button>
    </li>
  );
}
