"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Search,
  MapPin,
  BookOpen,
  Plus,
  Calendar,
  Users,
  LayoutGrid,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string | number | null;
  label: string;
}) {
  return (
    <Card className="border border-cwgc-gold/20 shadow-md bg-white/90 backdrop-blur">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cwgc-green/10 text-cwgc-green">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold tabular-nums text-cwgc-green">
            {value ?? <span className="animate-pulse">--</span>}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const stats = useQuery(api.burials.getStats);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/records?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[550px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lydbrook-baptist-church-cemetery.png"
          alt="Lydbrook Baptist Church with war graves cemetery behind"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cwgc-green/90 via-cwgc-green/50 to-cwgc-green/30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 24 32"
              className="h-10 w-8 text-cwgc-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M12 1 L12 27" />
              <path d="M4 9 L20 9" />
              <path d="M12 27 L8 31 L16 31 Z" fill="currentColor" strokeWidth="0" />
            </svg>
          </div>
          <p className="text-cwgc-gold text-xs tracking-[0.3em] uppercase mb-3 font-medium">
            Forest of Dean &middot; Gloucestershire
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
            Lydbrook War Graves
          </h1>
          <p className="text-cwgc-gold-light text-lg md:text-xl font-light mb-1">
            Baptist Church Cemetery
          </p>
          <p className="text-cwgc-stone/70 text-sm md:text-base mb-8 max-w-lg mx-auto">
            Honouring those laid to rest behind Lower Lydbrook Baptist Church.
            Search and explore over {stats?.totalBurials ?? 200} burial records
            spanning from 1853 to the present day.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-md mx-auto bg-white/95 backdrop-blur rounded-lg p-1.5 shadow-xl border border-cwgc-gold/20"
          >
            <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
            <Input
              type="text"
              placeholder="Search by surname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" size="sm" className="bg-cwgc-green hover:bg-cwgc-green-light">
              Search
            </Button>
          </form>
        </div>

        {/* Remembrance quote */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-cwgc-gold/50 text-xs tracking-widest italic">
            &ldquo;Their Name Liveth for Evermore&rdquo;
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            value={stats?.totalBurials ?? null}
            label="Burial Records"
          />
          <StatCard
            icon={LayoutGrid}
            value={stats?.totalPlots ?? null}
            label="Plots Mapped"
          />
          <StatCard
            icon={MapPin}
            value={stats?.totalSections ?? null}
            label="Sections (A–I)"
          />
          <StatCard
            icon={Calendar}
            value={
              stats?.earliestYear && stats?.latestYear
                ? `${stats.earliestYear}–${stats.latestYear}`
                : null
            }
            label="Year Range"
          />
        </div>
      </section>

      {/* About the Cemetery */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-cwgc-gold text-xs tracking-[0.2em] uppercase mb-2 font-medium">
              About the Cemetery
            </p>
            <h2 className="text-3xl font-bold mb-4 text-cwgc-green">
              A Place of Remembrance
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The cemetery is situated behind Lower Lydbrook Baptist Church on
              the B4234 (Main Road), nestled in the steep wooded valley of the
              Forest of Dean. Founded in 1812, the Baptist Chapel has served the
              community for over two centuries, and the grounds behind the church
              have been a place of burial since the mid-19th century.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The cemetery is organised into nine sections (A through I), each
              containing 27 individual plots. The burial records span from 1853
              to 2011, documenting the lives of local families &mdash; miners,
              farmers, and tradespeople of the Forest of Dean &mdash; whose names are
              woven into the fabric of Lydbrook&apos;s history.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This digital archive preserves these records, making them
              accessible to family historians, genealogists, and anyone with a
              connection to Lydbrook and the Forest of Dean.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/records">
                <Button className="bg-cwgc-green hover:bg-cwgc-green-light">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Records
                </Button>
              </Link>
              <Link href="/cemetery-plan">
                <Button variant="outline" className="border-cwgc-green/30 text-cwgc-green hover:bg-cwgc-green/5">
                  <MapPin className="mr-2 h-4 w-4" />
                  View Cemetery Plan
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-cwgc-gold/20">
            <Image
              src="/images/cross-of-sacrifice.png"
              alt="Cross of Sacrifice at the cemetery entrance with Baptist Church behind"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Image Gallery - CWGC Style */}
      <section className="bg-cwgc-green py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-cwgc-gold text-xs tracking-[0.2em] uppercase mb-2 font-medium">
              The Grounds
            </p>
            <h2 className="text-2xl font-bold text-cwgc-stone">
              Lydbrook Baptist Church Cemetery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/images/lydbrook-overview.png"
                alt="Aerial view of Lydbrook village showing the Baptist Church and cemetery"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cwgc-green/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-cwgc-stone text-sm font-medium">
                Lydbrook Village &amp; Church
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/images/cwgc-headstones.png"
                alt="Rows of Commonwealth War Graves headstones with poppies"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cwgc-green/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-cwgc-stone text-sm font-medium">
                War Graves Headstones
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/images/cemetery-overview.png"
                alt="Overview of the cemetery grounds with headstones and paths"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cwgc-green/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-cwgc-stone text-sm font-medium">
                Cemetery Grounds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-cwgc-gold text-xs tracking-[0.2em] uppercase mb-2 font-medium">
              Explore
            </p>
            <h2 className="text-3xl font-bold mb-3 text-cwgc-green">
              Navigate the Archives
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Search burial records, explore the interactive cemetery plan, and
              contribute to the ongoing preservation effort.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              href="/records"
              icon={Search}
              title="Search Records"
              description="Find burial records by name, year, or section. Full-text search across all archived records."
              image="/images/cwgc-headstones.png"
            />
            <FeatureCard
              href="/cemetery-plan"
              icon={MapPin}
              title="Cemetery Plan"
              description="Interactive layout of all 9 sections (A–I) and 243 plots. See who is buried where."
              image="/images/cemetery-overview.png"
            />
            <FeatureCard
              href="/add-record"
              icon={Plus}
              title="Add Records"
              description="Contribute new burial information to help complete the cemetery records."
              image="/images/headstones-detail.png"
            />
            <FeatureCard
              href="/about"
              icon={BookOpen}
              title="About"
              description="Learn about the history of Lydbrook Baptist Church and this preservation project."
              image="/images/lydbrook-overview.png"
            />
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="bg-cwgc-stone py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-cwgc-gold text-xs tracking-[0.2em] uppercase mb-2 font-medium">
                Find Us
              </p>
              <h2 className="text-2xl font-bold mb-4 text-cwgc-green">
                Location
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  The cemetery is located behind <strong>Lower Lydbrook
                  Baptist Church</strong> on the B4234 (Main Road), in the
                  village of Lydbrook in the Forest of Dean.
                </p>
                <address className="not-italic bg-white rounded-lg p-4 border border-cwgc-gold/20">
                  <p className="font-semibold text-foreground">Lower Lydbrook Baptist Church</p>
                  <p>Main Road (B4234)</p>
                  <p>Lydbrook, GL17 9NA</p>
                  <p>Forest of Dean, Gloucestershire</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    what3words: nest.tasks.ambushes
                  </p>
                </address>
                <p>
                  The cemetery can be accessed from the rear of the Baptist
                  Chapel. There is limited roadside parking along the B4234.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lydbrook+Baptist+Church+GL17+9NA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-1.5 border-cwgc-green/30 text-cwgc-green">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open in Google Maps
                  </Button>
                </a>
                <a
                  href="https://www.cwgc.org/find-records/find-cemeteries-memorials/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-1.5 border-cwgc-green/30 text-cwgc-green">
                    <ExternalLink className="h-3.5 w-3.5" />
                    CWGC Cemetery Search
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-cwgc-gold/20 aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.5!2d-2.5761!3d51.8331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871a3c3c4a5b8eb%3A0x4e8a7a6e5e!2sLydbrook+Baptist+Church!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location of Lydbrook Baptist Church Cemetery"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CWGC-style remembrance band */}
      <section className="bg-cwgc-burgundy py-10">
        <div className="container mx-auto px-4 text-center">
          <svg
            viewBox="0 0 24 32"
            className="h-8 w-6 text-cwgc-gold mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M12 1 L12 27" />
            <path d="M4 9 L20 9" />
          </svg>
          <p className="text-cwgc-gold-light text-lg font-light italic mb-1">
            &ldquo;We will remember them&rdquo;
          </p>
          <p className="text-white/50 text-xs tracking-widest uppercase">
            Lest we forget
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  href,
  icon: Icon,
  title,
  description,
  image,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="overflow-hidden border-cwgc-gold/15 shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cwgc-green/70 to-transparent" />
          <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-cwgc-green shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 text-cwgc-green group-hover:text-cwgc-green-light transition-colors flex items-center gap-1">
            {title}
            <ChevronRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
