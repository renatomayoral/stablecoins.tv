import { Coins } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className=" justify-center top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-center py-5 m-8">
        <div className="flex items-center justify-center p-16"></div>
      </div>
    </header>
  );
}
