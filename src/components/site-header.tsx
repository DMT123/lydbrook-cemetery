"use client";

import Link from "next/link";
import Image from "next/image";
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
  { href: "/add-record", label: "Submit Record" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center gap-3">
          <Image
            src="/images/lydbrook-baptist-church-logo.png"
            alt="Lydbrook Baptist Church"
            width={140}
            height={50}
            className="h-10 w-auto"
            priority
          />
          <div className="hidden sm:block border-l border-border pl-3">
            <p className="text-[11px] font-medium text-church-blue leading-tight">
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
                  ? "bg-church-blue/10 text-church-blue font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
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
          className="hidden lg:flex items-center gap-1 text-xs text-church-blue hover:text-church-blue-light transition-colors"
        >
          lydbrookbaptist.co.uk &rarr;
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center gap-3 mb-8 mt-4">
              <Image
                src="/images/lydbrook-baptist-church-logo.png"
                alt="Lydbrook Baptist Church"
                width={120}
                height={42}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-4 px-3">
              Cemetery Records
            </p>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm rounded transition-colors",
                    pathname === item.href
                      ? "bg-church-blue/10 text-church-blue font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t px-3">
              <a
                href="https://www.lydbrookbaptist.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-church-blue hover:text-church-blue-light"
              >
                Visit Church Website &rarr;
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
