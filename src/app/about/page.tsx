import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  MapPin,
  Users,
  FileText,
  Plus,
  ExternalLink,
  AlertTriangle,
  Footprints,
  Church,
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
          src="/images/lydbrook-valley-view.png"
          alt="View from the steep path down to Lydbrook village"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-slate-900/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              About This Project
            </h1>
            <p className="text-slate-300 max-w-lg">
              Preserving the burial records of Lydbrook Baptist Church Cemetery
              for future generations.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* The Cemetery */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Church className="h-6 w-6 text-primary" />
            The Church &amp; Burial Ground
          </h2>
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The burial ground is situated at the rear of{" "}
                <strong>Lydbrook Baptist Church</strong> in Lower Lydbrook,
                Gloucestershire. The church sits on the B4234 (Main Road) in a
                steep valley in the Forest of Dean.
              </p>
              <p>
                Baptist roots in Lydbrook stretch back to 1823, when a
                schoolroom in Lower Lydbrook was licensed for worship. After a
                period of decline, twelve members separated from Leys Hill
                Baptist Church in 1857 and re-formed the Lydbrook congregation.
                The present chapel, built from Forest and Monmouthshire stone,
                opened in November 1864 at a cost of &pound;700.
              </p>
              <p>
                The burial ground behind the church has been in use since the
                mid-19th century and is now <strong>closed</strong> for new
                burials. It is organised into nine sections (A through I), each
                containing 27 plots. Records span from 1853 to 2011, documenting
                the lives of local families &mdash; miners, farmers, and
                tradespeople whose names are woven into the history of the
                Forest of Dean.
              </p>
              <p>
                As the church&apos;s own history records: &ldquo;There is open
                access for anyone who wishes to visit a family grave.&rdquo;
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/lydbrook-chapel-path.png"
                alt="Lydbrook Baptist Church with the steep path leading to the burial ground"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Visitor Safety */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            Visitor Safety Information
          </h2>
          <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-6">
            <div className="space-y-4 text-amber-900">
              <p className="leading-relaxed">
                If you are planning to visit the burial ground, please be aware
                of the following:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold">
                    1
                  </span>
                  <span>
                    <strong>Steep access path</strong> &mdash; The cemetery is
                    reached via a steep, narrow path that leads up and around the
                    side of the Baptist Church on the side of a steep hill.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold">
                    2
                  </span>
                  <span>
                    <strong>Very uneven ground</strong> &mdash; The burial ground
                    itself has very uneven terrain with exposed roots, sunken
                    ground, and sloping paths. The hillside is steep throughout.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold">
                    3
                  </span>
                  <span>
                    <strong>Unstable memorials</strong> &mdash; Some memorial
                    stones may be unstable. Please do not lean on or attempt to
                    move any headstones.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold">
                    4
                  </span>
                  <span>
                    <strong>Slippery when wet</strong> &mdash; The path and
                    ground can be slippery in wet weather. Take extra care after
                    rain.
                  </span>
                </li>
              </ul>
              <div className="flex items-center gap-2 pt-2 border-t border-amber-300">
                <Footprints className="h-5 w-5 text-amber-700" />
                <p className="font-semibold text-amber-800">
                  Please take care and wear sturdy footwear when visiting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* The Digital Archive */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            The Digital Archive
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This website was created to digitise and preserve the burial
              records held in the Lydbrook Baptist Church archives. The records
              have been compiled from multiple sources:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>
                  <strong>Burial and cremation certificates</strong> &mdash;
                  official documentation of interments
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>
                  <strong>Headstone engravings</strong> &mdash; transcriptions
                  from memorial stones in the cemetery
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>
                  <strong>Coroner&apos;s orders for burial</strong> &mdash;
                  records of deaths requiring coronial investigation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>
                  <strong>Parish archivist listings</strong> &mdash; handwritten
                  records maintained by the church
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>
                  <strong>Cemetery plan surveys</strong> &mdash; the
                  section-by-section plot mapping of the grounds
                </span>
              </li>
            </ul>
            <p>
              The original records were maintained in a Microsoft Access database
              and an Excel spreadsheet cemetery plan. This project brings both
              data sources together into a single, searchable online archive.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            What You Can Do
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Search Records</h3>
                <p className="text-sm text-muted-foreground">
                  Find burial records by surname. Filter by section or sort by
                  name or year of death.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Explore the Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Navigate the interactive cemetery layout with all 9 sections
                  and 243 plots.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Family Connections</h3>
                <p className="text-sm text-muted-foreground">
                  Each record shows related family members in the same plot and
                  others sharing the same surname.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <Plus className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Contribute</h3>
                <p className="text-sm text-muted-foreground">
                  Help complete the archive by adding new burial records from
                  family knowledge or headstone surveys.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Lydbrook */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            About Lydbrook
          </h2>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/lydbrook-valley-view.png"
                alt="The Forest of Dean valley at Lydbrook"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Lydbrook is a village and civil parish in the Forest of Dean
                district of Gloucestershire. It sits in a steep-sided valley
                where the land falls towards the River Wye, which forms the
                border with Wales.
              </p>
              <p>
                The village has a rich industrial heritage, having been a centre
                for iron-making and coal mining from medieval times through to
                the 20th century. By the mid-1800s, Lydbrook supported at least
                five different denominations &mdash; a testament to the
                independence and strength of community feeling in this remote
                Forest valley.
              </p>
              <p>
                Today Lydbrook is a quiet residential village popular with
                walkers and cyclists. The Baptist Chapel, with its burial ground
                on the hillside behind, remains an important part of the
                village&apos;s heritage, connecting the community to the
                families who built it over more than 170 years.
              </p>
              <a
                href="https://www.lydbrookbaptist.co.uk/6/Church-History"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="mt-2 gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Full Church History
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-church-blue rounded-xl p-8 text-center">
          <Church className="h-8 w-8 text-white/80 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2 text-white">
            Help Preserve These Records
          </h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto text-sm">
            If you have information about burials in this cemetery, please
            consider contributing to the archive.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/records">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Browse Records
              </Button>
            </Link>
            <Link href="/add-record">
              <Button className="bg-white text-church-blue hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" /> Add a Record
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
