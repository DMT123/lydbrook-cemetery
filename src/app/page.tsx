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
    <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold tabular-nums">
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
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-cemetery.png"
          alt="Lower Lydbrook Baptist Church Cemetery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-stone-950/20" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-stone-300 text-sm tracking-widest uppercase mb-3">
            Forest of Dean, Gloucestershire
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Lower Lydbrook
            <br />
            <span className="text-emerald-400">Baptist Church</span>
            <br />
            Cemetery
          </h1>
          <p className="text-stone-200 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Preserving the memories of those laid to rest since 1853. Search and
            explore over {stats?.totalBurials ?? 200} burial records.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-md mx-auto bg-white/95 backdrop-blur rounded-lg p-1.5 shadow-xl"
          >
            <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
            <Input
              type="text"
              placeholder="Search by surname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
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
            label="Sections"
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

      {/* About */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              A Place of Remembrance
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The Lower Lydbrook Baptist Church Cemetery is a treasured part of
              the village&apos;s heritage, nestled in the heart of the Forest of
              Dean. For over 170 years, families have laid their loved ones to
              rest in this peaceful ground overlooking the Wye Valley.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This project aims to digitise and preserve the burial records held
              in the church archives, making them accessible to family
              historians, genealogists, and anyone with a connection to Lydbrook
              and the Forest of Dean.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/records">
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Records
                </Button>
              </Link>
              <Link href="/cemetery-plan">
                <Button variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  View Cemetery Plan
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/lydbrook-village.png"
              alt="Lydbrook village in the Forest of Dean"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-stone-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Explore the Archives</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Navigate the cemetery records through multiple views and
              contribute to the ongoing preservation effort.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              href="/records"
              icon={Search}
              title="Search Records"
              description="Find burial records by name, year, or section. Full-text search across all archived records."
              image="/images/headstones-detail.png"
            />
            <FeatureCard
              href="/cemetery-plan"
              icon={MapPin}
              title="Cemetery Plan"
              description="Interactive map of the cemetery layout showing all 9 sections and 243 plots."
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
              image="/images/lydbrook-village.png"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">The Cemetery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-md md:col-span-2">
            <Image
              src="/images/cemetery-overview.png"
              alt="Overview of the cemetery grounds"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[3/2] md:aspect-auto rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/headstones-detail.png"
              alt="Historic headstones in the cemetery"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
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
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-primary shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
            {title}
            <ChevronRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
