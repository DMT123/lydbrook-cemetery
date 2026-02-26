import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lydbrook Baptist Church Cemetery | Burial Records",
  description:
    "Burial records and cemetery plan for the burial ground behind Lydbrook Baptist Church, Lower Lydbrook, Forest of Dean, Gloucestershire. Search over 200 records spanning 1853 to 2011.",
  keywords: [
    "Lydbrook",
    "Baptist church",
    "cemetery",
    "burial records",
    "burial ground",
    "Forest of Dean",
    "Gloucestershire",
    "genealogy",
    "graveyard",
    "Lower Lydbrook",
    "GL17 9NA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ConvexClientProvider>
          <TooltipProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
