import { Coins } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className=" justify-center top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-center">
        <div className="flex items-center justify-center pl-4 md:pl-6">
          <Link
            href="/"
            className="mr-2 flex justify-center items-center md:mr-6 md:space-x-2"
          >
            <Coins className="size-10 animate-bounce" aria-hidden="true" />
            <span className="hidden font-bold text-4xl md:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
