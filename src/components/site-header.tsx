"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-cwgc-gold/20 bg-cwgc-green text-cwgc-stone">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 24 32"
              className="h-8 w-6 text-cwgc-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2 L12 28" />
              <path d="M5 10 L19 10" />
              <path d="M12 28 L8 32 L16 32 Z" fill="currentColor" strokeWidth="0" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight tracking-wide text-cwgc-gold">
              Lydbrook War Graves
            </p>
            <p className="text-[11px] text-cwgc-stone/70 leading-tight tracking-wider uppercase">
              Baptist Church Cemetery
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
                  ? "bg-cwgc-gold/20 text-cwgc-gold font-medium"
                  : "text-cwgc-stone/80 hover:text-cwgc-gold hover:bg-cwgc-gold/10",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <a
          href="https://www.cwgc.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1.5 text-[11px] text-cwgc-stone/50 hover:text-cwgc-gold/80 transition-colors tracking-wide uppercase"
        >
          CWGC
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-cwgc-stone hover:bg-cwgc-gold/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-cwgc-green border-cwgc-gold/20">
            <div className="flex items-center gap-2 mb-8 mt-4">
              <svg
                viewBox="0 0 24 32"
                className="h-6 w-4 text-cwgc-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2 L12 28" />
                <path d="M5 10 L19 10" />
              </svg>
              <span className="text-sm font-semibold text-cwgc-gold">
                Lydbrook War Graves
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
                      ? "bg-cwgc-gold/20 text-cwgc-gold font-medium"
                      : "text-cwgc-stone/80 hover:text-cwgc-gold hover:bg-cwgc-gold/10",
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
