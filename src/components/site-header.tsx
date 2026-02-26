"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Church } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/records", label: "Records" },
  { href: "/cemetery-plan", label: "Cemetery Plan" },
  { href: "/add-record", label: "Add Record" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-church-blue text-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center gap-2.5">
          <Church className="h-6 w-6 text-white/90" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight">
              Lydbrook Baptist Church
            </p>
            <p className="text-[11px] text-white/60 leading-tight">
              Cemetery Records
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm rounded transition-colors",
                pathname === item.href
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/75 hover:text-white hover:bg-white/10",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <a
          href="https://www.lydbrookbaptist.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1 text-[11px] text-white/50 hover:text-white/80 transition-colors"
        >
          Church Website
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-church-blue border-white/10">
            <div className="flex items-center gap-2 mb-8 mt-4">
              <Church className="h-5 w-5 text-white/90" />
              <span className="text-sm font-semibold text-white">
                Lydbrook Cemetery
              </span>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm rounded transition-colors",
                    pathname === item.href
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/75 hover:text-white hover:bg-white/10",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
