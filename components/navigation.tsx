"use client";

import Logo from "@/components/logo";
import Link from "next/link";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SquareArrowOutUpRight } from "lucide-react";

const navActions = [
  {
    label: "GitHub",
    href: "https://github.com/barebones-sh/shrtlnk",
  },
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Dashboard",
    href: "/app/dashboard",
  },
];

export default function Navigation() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full items-center justify-center px-6">
        <div className="flex w-full items-center justify-between gap-6">
          <Logo />
          <NavigationMenu className={cn("ml-auto justify-end", isMobile ? "hidden sm:flex" : "")}>
            <NavigationMenuList className="gap-2 justify-end">
              {navActions.map((item) => {
                const isExternal = item.href.startsWith("http");

                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={navigationMenuTriggerStyle()}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        <span className="inline-flex items-center gap-2">
                          <span>{item.label}</span>
                          {isExternal && (
                            <SquareArrowOutUpRight className="size-4 shrink-0" />
                          )}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
