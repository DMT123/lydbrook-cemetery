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
  AlertTriangle,
  Footprints,
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
    <Card className="border shadow-md bg-white/90 backdrop-blur">
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
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lydbrook-chapel-path.png"
          alt="Lydbrook Baptist Church with the burial ground on the hillside behind"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/45 to-slate-900/20" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-blue-200 text-xs tracking-[0.25em] uppercase mb-3 font-medium">
            Forest of Dean &middot; Gloucestershire
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
            Lydbrook Baptist Church
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-light mb-1">
            Cemetery Records
          </p>
          <p className="text-slate-300 text-sm md:text-base mb-8 max-w-lg mx-auto">
            Explore over {stats?.totalBurials ?? 200} burial records from the
            burial ground behind Lydbrook Baptist Church, spanning from 1853 to
            the present day.
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

      {/* Safety Warning */}
      <section className="container mx-auto px-4 mt-8">
        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">
                Visitor Safety &mdash; Please Read Before Visiting
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed mb-2">
                The burial ground is at the rear of Lydbrook Baptist Church and
                is accessed via a <strong>steep, narrow path</strong> that leads
                up around the side of the church on the side of a{" "}
                <strong>steep hill</strong>. The ground within the cemetery is{" "}
                <strong>very uneven</strong> with exposed roots, sunken areas,
                and some memorial stones that may be unstable.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-amber-900">
                <Footprints className="h-4 w-4" />
                Please take care and wear sturdy footwear when visiting.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Cemetery */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Burial Ground</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The burial ground is situated behind Lydbrook Baptist Church on
              the B4234 in Lower Lydbrook, nestled in the steep wooded valley of
              the Forest of Dean. The Baptist Chapel was founded in 1812 and
              moved to its present site in 1864, built from Forest and
              Monmouthshire stone.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The cemetery, now closed for new burials, is organised into nine
              sections (A through I), each containing 27 individual plots. The
              records span from 1853 to 2011, documenting the lives of local
              families &mdash; miners, farmers, and tradespeople of the Forest of
              Dean.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              There is open access for anyone who wishes to visit a family grave.
              This digital archive was created to preserve the burial records
              and make them accessible to family historians and genealogists.
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
              src="/images/burial-ground-interior.png"
              alt="The burial ground behind Lydbrook Baptist Church, showing old headstones on the steep hillside"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-church-blue py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">
              The Cemetery &amp; Surroundings
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/images/lydbrook-valley-view.png"
                alt="View down the steep path towards Lydbrook village and the Baptist Church"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                The Steep Path to the Cemetery
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/images/old-headstones-detail.png"
                alt="Weathered Victorian headstones in the burial ground"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                Historic Headstones
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/images/burial-ground-interior.png"
                alt="Inside the burial ground with Forest of Dean views"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                Burial Ground &amp; Valley Views
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Explore the Archives</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Search burial records, explore the interactive cemetery plan, and
              help preserve the history of this Forest of Dean community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              href="/records"
              icon={Search}
              title="Search Records"
              description="Find burial records by surname, year, or section with full-text search."
              image="/images/old-headstones-detail.png"
            />
            <FeatureCard
              href="/cemetery-plan"
              icon={MapPin}
              title="Cemetery Plan"
              description="Interactive layout of all 9 sections (A–I) and 243 plots."
              image="/images/burial-ground-interior.png"
            />
            <FeatureCard
              href="/add-record"
              icon={Plus}
              title="Submit Record"
              description="Request a record addition from family knowledge or headstone surveys."
              image="/images/lydbrook-chapel-path.png"
            />
            <FeatureCard
              href="/about"
              icon={BookOpen}
              title="About"
              description="History of Lydbrook Baptist Church and this preservation project."
              image="/images/lydbrook-valley-view.png"
            />
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="bg-church-warm py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Find Us</h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  The burial ground is at the rear of{" "}
                  <strong>Lydbrook Baptist Church</strong> in Lower Lydbrook.
                  Access is via a steep path around the side of the church.
                </p>
                <address className="not-italic bg-white rounded-lg p-4 border">
                  <p className="font-semibold text-foreground">
                    Lydbrook Baptist Church
                  </p>
                  <p>Lower Lydbrook</p>
                  <p>Gloucestershire, GL17 9NA</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    On the B4234 (Main Road)
                  </p>
                </address>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-amber-800 text-xs">
                      <strong>Access warning:</strong> The path to the cemetery
                      is steep and the ground is very uneven. Please wear sturdy
                      footwear and take care. Some memorial stones may be unstable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lydbrook+Baptist+Church+GL17+9NA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Google Maps
                  </Button>
                </a>
                <a
                  href="https://www.lydbrookbaptist.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Church Website
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.2!2d-2.5773!3d51.8282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871a3e8d6f03e99%3A0x2a4b5c6d7e8f9012!2sLydbrook+Baptist+Church!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location of Lydbrook Baptist Church"
              />
            </div>
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
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
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
