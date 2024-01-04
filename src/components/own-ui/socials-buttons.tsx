'use client';

import { GithubIcon, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

export default function SocialsButtons() {
    const socials = [
        {
          href: "https://github.com/sidarth-23",
          icon: GithubIcon,
          label: "Github",
        },
        {
          href: "https://www.linkedin.com/in/sidarth-23/",
          icon: Linkedin,
          label: "LinkedIn",
        },
      ];
    return(
        <div className="flex flex-col lg:flex-row gap-2">
        {socials.map(({ href, icon: Icon, label }) => (
          <Button size="sm" variant="ghost" className="rounded-md" asChild key={href}>
            <a href={href}>
              <Icon className="h-6 w-6" />
            
            </a>
          </Button>
        ))}
      </div>
)}