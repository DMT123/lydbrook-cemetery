"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  Hash,
  Home,
  Users,
  BookOpen,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function RecordDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const record = useQuery(api.burials.getById, {
    id: id as Id<"burials">,
  });

  const plotBurials = useQuery(
    api.burials.getByPlot,
    record?.plot ? { plot: record.plot } : "skip",
  );

  const familyRecords = useQuery(
    api.burials.getBySurname,
    record?.surname ? { surname: record.surname } : "skip",
  );

  if (record === undefined) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (record === null) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Record Not Found</h1>
        <p className="text-muted-foreground mb-4">
          This burial record could not be found.
        </p>
        <Link href="/records">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Records
          </Button>
        </Link>
      </div>
    );
  }

  const fullName = [record.givenName, record.middleNames, record.surname]
    .filter(Boolean)
    .join(" ");

  const otherInPlot =
    plotBurials?.filter((b) => b._id !== record._id) ?? [];
  const otherFamily =
    familyRecords?.filter((b) => b._id !== record._id) ?? [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/records"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Records
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-1">{fullName}</CardTitle>
                  {record.ageAtDeath && (
                    <p className="text-muted-foreground">
                      Aged {record.ageAtDeath}{" "}
                      {record.agePeriod || "years"}
                    </p>
                  )}
                </div>
                {record.plot && (
                  <Link href={`/cemetery-plan?plot=${record.plot}`}>
                    <Badge
                      variant="outline"
                      className="text-base px-3 py-1 cursor-pointer hover:bg-accent"
                    >
                      <LayoutGrid className="mr-1 h-3.5 w-3.5" />
                      Plot {record.plot}
                    </Badge>
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              <Separator />
              <DetailRow
                icon={Calendar}
                label="Date of Death"
                value={
                  record.dateOfDeath ||
                  (record.yearOfDeath ? `${record.yearOfDeath}` : null)
                }
              />
              <Separator />
              <DetailRow
                icon={MapPin}
                label="Place of Death"
                value={record.placeOfDeath}
              />
              <Separator />
              <DetailRow
                icon={Home}
                label="Home Address"
                value={record.homeAddress}
              />
              <Separator />
              <DetailRow
                icon={FileText}
                label="Source of Evidence"
                value={record.sourceOfEvidence}
              />
              <Separator />
              <DetailRow
                icon={Calendar}
                label="Record Date"
                value={record.recordDate}
              />
              <Separator />
              <DetailRow
                icon={Hash}
                label="Certificate Number"
                value={record.certificateNumber}
              />
              {record.notes && (
                <>
                  <Separator />
                  <div className="py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Notes
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed bg-accent/30 rounded-md p-3 mt-1">
                      {record.notes}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-stone-50">
            <CardContent className="p-4 text-xs text-muted-foreground">
              <p>
                Source: {record.sourceDatabase === "access_db"
                  ? "Parish Records Database"
                  : record.sourceDatabase === "excel_plan"
                    ? "Cemetery Plan / Headstone Survey"
                    : "User Contributed"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {otherInPlot.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Also in Plot {record.plot}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherInPlot.map((b) => (
                  <Link
                    key={b._id}
                    href={`/records/${b._id}`}
                    className="block p-2 rounded-md hover:bg-accent transition-colors"
                  >
                    <p className="text-sm font-medium">
                      {b.givenName} {b.middleNames} {b.surname}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.yearOfDeath
                        ? `d. ${b.yearOfDeath}`
                        : "Date unknown"}
                      {b.ageAtDeath
                        ? `, aged ${b.ageAtDeath}`
                        : ""}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {otherFamily.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Other {record.surname} Records
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherFamily.map((b) => (
                  <Link
                    key={b._id}
                    href={`/records/${b._id}`}
                    className="block p-2 rounded-md hover:bg-accent transition-colors"
                  >
                    <p className="text-sm font-medium">
                      {b.givenName} {b.middleNames} {b.surname}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.yearOfDeath
                        ? `d. ${b.yearOfDeath}`
                        : "Date unknown"}
                      {b.plot ? ` | Plot ${b.plot}` : ""}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {record.plot && (
            <Link href={`/cemetery-plan?section=${record.section}`}>
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                View on Cemetery Plan
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
