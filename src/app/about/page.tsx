import Image from "next/image";
import Link from "next/link";
import { BookOpen, MapPin, Users, Calendar, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="/images/lydbrook-village.png"
          alt="Lydbrook village"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-stone-950/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              About This Project
            </h1>
            <p className="text-stone-300 max-w-lg">
              Preserving the heritage of Lower Lydbrook Baptist Church Cemetery
              for future generations.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-stone max-w-none">
          {/* History */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              The Cemetery
            </h2>
            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Lower Lydbrook Baptist Church Cemetery has served the
                  local community for over 170 years, with the earliest recorded
                  burial dating back to 1853. Situated in the picturesque village
                  of Lydbrook in the Forest of Dean, Gloucestershire, this
                  peaceful resting place overlooks the Wye Valley.
                </p>
                <p>
                  The cemetery is organised into nine sections, labelled A
                  through I, each containing 27 individual plots. These plots
                  are home to families whose names are woven into the fabric of
                  Lydbrook&apos;s history &mdash; Harding, Freeman, Jones, Price,
                  Roberts, and many more.
                </p>
                <p>
                  Many of the interred were local miners, farmers, and tradespeople
                  who lived and worked in the Forest of Dean. Their stories
                  reflect the rich heritage of this unique part of England,
                  where ancient royal hunting forest meets the industrial
                  traditions of coal and iron.
                </p>
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/hero-cemetery.png"
                  alt="The Baptist Church Cemetery"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <Separator className="my-10" />

          {/* The Project */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              The Digital Archive
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This website was created to digitise and preserve the burial
                records held in the Lower Lydbrook Baptist Church archives. The
                records have been compiled from multiple sources including:
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
                    <strong>Parish archivist listings</strong> &mdash;
                    handwritten records maintained by the church
                  </span>
                </li>
              </ul>
              <p>
                The original records were maintained in both a Microsoft Access
                database and an Excel spreadsheet cemetery plan. This project
                brings both data sources together into a single, searchable
                online archive.
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
                    Find burial records by surname with full-text search. Filter
                    by cemetery section or sort by name or year.
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
                    Navigate the interactive cemetery layout showing all 9
                    sections and 243 plots. Click any plot to see who is buried
                    there.
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
                    Each record shows related family members buried in the same
                    plot and other records with the same surname.
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
                    family knowledge, headstone surveys, or other sources.
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
                  src="/images/cemetery-overview.png"
                  alt="The Forest of Dean"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Lydbrook is a village and civil parish in the Forest of Dean
                  district of Gloucestershire, England. It sits in a steep-sided
                  valley where the land falls towards the River Wye, which
                  forms the border with Wales.
                </p>
                <p>
                  The village has a rich industrial heritage, having been a
                  centre for iron-making and coal mining from medieval times
                  through to the 20th century. The Lydbrook Valley Tinplate
                  Works was one of the earliest tinplate works in Britain.
                </p>
                <p>
                  Today, Lydbrook is a quiet residential village popular with
                  walkers and cyclists exploring the Forest of Dean and the
                  Wye Valley Area of Outstanding Natural Beauty. The Baptist
                  Chapel and its cemetery remain an important part of the
                  village&apos;s heritage.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-stone-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              Help Preserve These Records
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              If you have information about burials in this cemetery, please
              consider contributing to the archive.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/records">
                <Button variant="outline">Browse Records</Button>
              </Link>
              <Link href="/add-record">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add a Record
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
