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
  title: "Lydbrook War Graves | Baptist Church Cemetery",
  description:
    "Burial records and cemetery plan for the war graves behind Lower Lydbrook Baptist Church, Forest of Dean, Gloucestershire. Search and explore over 200 historic records spanning 1853 to present.",
  keywords: [
    "Lydbrook",
    "war graves",
    "CWGC",
    "Commonwealth War Graves",
    "Baptist church",
    "burial records",
    "Forest of Dean",
    "Gloucestershire",
    "genealogy",
    "cemetery",
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
