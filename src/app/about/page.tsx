import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  MapPin,
  Users,
  FileText,
  Plus,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="/images/lydbrook-overview.png"
          alt="Lydbrook village with Baptist Church and cemetery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cwgc-green/90 to-cwgc-green/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div>
            <p className="text-cwgc-gold text-xs tracking-[0.2em] uppercase mb-1 font-medium">
              History &amp; Heritage
            </p>
            <h1 className="text-3xl font-bold text-cwgc-stone mb-2">
              About This Project
            </h1>
            <p className="text-cwgc-stone/70 max-w-lg">
              Preserving the heritage of the cemetery behind Lower Lydbrook
              Baptist Church for future generations.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* The Cemetery */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cwgc-green">
            <BookOpen className="h-6 w-6 text-cwgc-gold" />
            The Cemetery
          </h2>
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The cemetery is situated <strong>behind Lower Lydbrook Baptist
                Church</strong> on the B4234 (Main Road) in the village of
                Lydbrook, Forest of Dean, Gloucestershire. The Baptist Chapel
                was founded in 1812 and moved to its current location further
                up the valley in 1864. The grounds behind the church have served
                as a burial ground since the mid-19th century.
              </p>
              <p>
                The cemetery is organised into <strong>nine sections</strong>,
                labelled A through I, each containing <strong>27 individual
                plots</strong>. These 243 plots are home to families whose
                names are woven into the fabric of Lydbrook&apos;s history &mdash;
                Harding, Freeman, Jones, Price, Roberts, and many more.
              </p>
              <p>
                Many of the interred were local miners, farmers, and
                tradespeople who lived and worked in the Forest of Dean. Their
                stories reflect the rich heritage of this unique part of
                England, where ancient royal hunting forest meets the industrial
                traditions of coal and iron.
              </p>
              <p>
                The earliest recorded burial dates to <strong>1853</strong>, and
                records continue through to <strong>2011</strong>. Some
                headstones bear only initials, their full identities lost to
                time, while others carry detailed inscriptions recording entire
                families laid to rest together.
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-cwgc-gold/20">
              <Image
                src="/images/lydbrook-baptist-church-cemetery.png"
                alt="Lydbrook Baptist Church with the cemetery behind it"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-cwgc-gold/20" />

        {/* CWGC Context */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cwgc-green">
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
            Commonwealth War Graves
          </h2>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md border border-cwgc-gold/20">
              <Image
                src="/images/cross-of-sacrifice.png"
                alt="Cross of Sacrifice with Baptist Church behind"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The <strong>Commonwealth War Graves Commission</strong> (CWGC)
                was established by Royal Charter in 1917 to ensure that the
                1.7 million men and women of the Commonwealth forces who died
                in the two World Wars would never be forgotten. The Commission
                maintains cemeteries and memorials at over 23,000 locations in
                150 countries.
              </p>
              <p>
                In the United Kingdom, the majority of war graves are found in
                local churchyards and civilian cemeteries, scattered among
                civilian burials. These churchyard sites &mdash; including those in
                the Forest of Dean &mdash; represent a vital part of the nation&apos;s
                commemorative heritage, connecting local communities directly
                to the sacrifices of two world wars.
              </p>
              <p>
                CWGC headstones follow a distinctive design: uniform white
                Portland stone with a rounded top, engraved with the
                regimental badge, rank, name, unit, date of death, age, and
                a religious emblem or personal inscription chosen by the
                family. This uniformity embodies the principle that all who
                gave their lives should be commemorated equally, regardless
                of rank or status.
              </p>
              <p>
                The <strong>Cross of Sacrifice</strong>, designed by Sir
                Reginald Blomfield in 1918, appears in cemeteries with 40 or
                more graves. It features a bronze sword mounted on a stone
                cross, blade pointing downward, on an octagonal base.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.cwgc.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-1.5 border-cwgc-green/30 text-cwgc-green">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Visit the CWGC Website
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-cwgc-gold/20" />

        {/* The Digital Archive */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cwgc-green">
            <FileText className="h-6 w-6 text-cwgc-gold" />
            The Digital Archive
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This website was created to digitise and preserve the burial
              records held in the Lower Lydbrook Baptist Church archives. The
              records have been compiled from multiple sources:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cwgc-gold mt-2 shrink-0" />
                <span>
                  <strong>Burial and cremation certificates</strong> &mdash;
                  official documentation of interments
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cwgc-gold mt-2 shrink-0" />
                <span>
                  <strong>Headstone engravings</strong> &mdash; transcriptions
                  from memorial stones in the cemetery
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cwgc-gold mt-2 shrink-0" />
                <span>
                  <strong>Coroner&apos;s orders for burial</strong> &mdash;
                  records of deaths requiring coronial investigation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cwgc-gold mt-2 shrink-0" />
                <span>
                  <strong>Parish archivist listings</strong> &mdash;
                  handwritten records maintained by the church
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cwgc-gold mt-2 shrink-0" />
                <span>
                  <strong>Cemetery plan surveys</strong> &mdash;
                  the section-by-section plot mapping of the grounds
                </span>
              </li>
            </ul>
            <p>
              The original records were maintained in both a Microsoft Access
              database and an Excel spreadsheet cemetery plan. This project
              brings both data sources together into a single, searchable
              online archive with over 200 individual burial records.
            </p>
          </div>
        </section>

        <Separator className="my-10 bg-cwgc-gold/20" />

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cwgc-green">
            <Users className="h-6 w-6 text-cwgc-gold" />
            What You Can Do
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-cwgc-gold/15">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cwgc-green/10 text-cwgc-green mb-3">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1 text-cwgc-green">Search Records</h3>
                <p className="text-sm text-muted-foreground">
                  Find burial records by surname with full-text search. Filter
                  by cemetery section or sort by name or year.
                </p>
              </CardContent>
            </Card>
            <Card className="border-cwgc-gold/15">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cwgc-green/10 text-cwgc-green mb-3">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1 text-cwgc-green">Explore the Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Navigate the interactive cemetery layout with all 9 sections
                  and 243 plots. Click any plot to see who is buried there.
                </p>
              </CardContent>
            </Card>
            <Card className="border-cwgc-gold/15">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cwgc-green/10 text-cwgc-green mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1 text-cwgc-green">Family Connections</h3>
                <p className="text-sm text-muted-foreground">
                  Each record shows related family members buried in the same
                  plot and other records sharing the same surname.
                </p>
              </CardContent>
            </Card>
            <Card className="border-cwgc-gold/15">
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cwgc-green/10 text-cwgc-green mb-3">
                  <Plus className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1 text-cwgc-green">Contribute</h3>
                <p className="text-sm text-muted-foreground">
                  Help complete the archive by adding new burial records from
                  family knowledge, headstone surveys, or other sources.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10 bg-cwgc-gold/20" />

        {/* Lydbrook */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cwgc-green">
            <MapPin className="h-6 w-6 text-cwgc-gold" />
            About Lydbrook
          </h2>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md border border-cwgc-gold/20">
              <Image
                src="/images/lydbrook-village.png"
                alt="Lydbrook village in the Forest of Dean"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Lydbrook is a village and civil parish in the Forest of Dean
                district of Gloucestershire, England. It sits in a steep-sided
                valley where the land falls towards the River Wye, which forms
                the border with Wales.
              </p>
              <p>
                The village has a rich industrial heritage, having been a centre
                for iron-making and coal mining from medieval times through to
                the 20th century. The Lydbrook Valley Tinplate Works was one of
                the earliest tinplate works in Britain.
              </p>
              <p>
                Today, Lydbrook is a quiet residential village popular with
                walkers and cyclists exploring the Forest of Dean and the Wye
                Valley Area of Outstanding Natural Beauty. The Baptist Chapel,
                founded in 1812 and moved to its current location on the B4234
                in 1864, remains an important part of the village&apos;s heritage.
              </p>
              <p>
                The cemetery behind the chapel connects the village to its past,
                bearing witness to the lives and families that built this Forest
                of Dean community over more than 170 years.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-cwgc-green rounded-xl p-8 text-center">
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
          <h3 className="text-xl font-bold mb-2 text-cwgc-stone">
            Help Preserve These Records
          </h3>
          <p className="text-cwgc-stone/60 mb-6 max-w-md mx-auto text-sm">
            If you have information about burials in this cemetery, please
            consider contributing to the archive.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/records">
              <Button variant="outline" className="border-cwgc-gold/30 text-cwgc-gold hover:bg-cwgc-gold/10">
                Browse Records
              </Button>
            </Link>
            <Link href="/add-record">
              <Button className="bg-cwgc-gold text-cwgc-green hover:bg-cwgc-gold-light">
                <Plus className="mr-2 h-4 w-4" /> Add a Record
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
