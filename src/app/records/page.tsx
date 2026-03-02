"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  FileImage,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function RecordsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"surname" | "year">("surname");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [view, setView] = useState<"table" | "cards">("table");

  const allBurials = useQuery(api.burials.list, {});
  const searchResults = useQuery(
    api.burials.searchAll,
    searchTerm.trim().length >= 2 ? { term: searchTerm.trim() } : "skip",
  );

  const records = useMemo(() => {
    const source =
      searchTerm.trim().length >= 2 ? searchResults : allBurials;
    if (!source) return undefined;

    let filtered = [...source];

    if (sectionFilter !== "all") {
      filtered = filtered.filter((r) => r.section === sectionFilter);
    }

    filtered.sort((a, b) => {
      if (sortField === "surname") {
        const cmp = (a.surname || "").localeCompare(b.surname || "");
        return sortDir === "asc" ? cmp : -cmp;
      }
      const aYear = a.yearOfDeath ?? 0;
      const bYear = b.yearOfDeath ?? 0;
      return sortDir === "asc" ? aYear - bYear : bYear - aYear;
    });

    return filtered;
  }, [allBurials, searchResults, searchTerm, sectionFilter, sortField, sortDir]);

  const sections = useMemo(() => {
    if (!allBurials) return [];
    const s = new Set(allBurials.map((b) => b.section).filter(Boolean));
    return Array.from(s).sort() as string[];
  }, [allBurials]);

  const toggleSort = (field: "surname" | "year") => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = sortDir === "asc" ? SortAsc : SortDesc;

  return (
    <div>
      {/* Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/images/old-headstones-detail.png"
          alt="Headstones in the burial ground"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-slate-900/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Burial Records
            </h1>
            <p className="text-slate-300">
              {records ? `${records.length} records found` : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by surname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sectionFilter} onValueChange={setSectionFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {sections.map((s) => (
                <SelectItem key={s} value={s}>
                  Section {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button
              variant={sortField === "surname" ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSort("surname")}
              className="gap-1"
            >
              Name
              {sortField === "surname" && <SortIcon className="h-3 w-3" />}
            </Button>
            <Button
              variant={sortField === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSort("year")}
              className="gap-1"
            >
              Year
              {sortField === "year" && <SortIcon className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        <Tabs
          value={view}
          onValueChange={(v) => setView(v as "table" | "cards")}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            {records === undefined ? (
              <LoadingSkeleton />
            ) : records.length === 0 ? (
              <EmptyState searchTerm={searchTerm} />
            ) : (
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-stone-50">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold hidden sm:table-cell">Age</TableHead>
                      <TableHead className="font-semibold">
                        Year
                      </TableHead>
                      <TableHead className="font-semibold">Plot</TableHead>
                      <TableHead className="font-semibold hidden lg:table-cell">
                        Place of Death
                      </TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow
                        key={record._id}
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => router.push(`/records/${record._id}`)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-1.5">
                            <span>
                              <span className="hidden sm:inline">
                                {record.givenName}{" "}
                                {record.middleNames && `${record.middleNames} `}
                              </span>
                              <span className="sm:hidden">
                                {record.givenName?.[0]}.{" "}
                              </span>
                              <span className="font-semibold">
                                {record.surname}
                              </span>
                            </span>
                            {record.scannedDocumentStorageId && (
                              <span title="Scanned document available"><FileImage className="h-3.5 w-3.5 text-primary/60 shrink-0" /></span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">
                          {record.ageAtDeath
                            ? `${record.ageAtDeath} ${record.agePeriod || "years"}`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {record.yearOfDeath || "—"}
                        </TableCell>
                        <TableCell>
                          {record.plot ? (
                            <Badge variant="secondary">{record.plot}</Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm hidden lg:table-cell max-w-[200px] truncate">
                          {record.placeOfDeath || "—"}
                        </TableCell>
                        <TableCell>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cards">
            {records === undefined ? (
              <LoadingSkeleton />
            ) : records.length === 0 ? (
              <EmptyState searchTerm={searchTerm} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {records.map((record) => (
                  <Link key={record._id} href={`/records/${record._id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-1.5">
                              {record.givenName}{" "}
                              {record.middleNames &&
                                `${record.middleNames} `}
                              {record.surname}
                              {record.scannedDocumentStorageId && (
                                <span title="Scanned document available"><FileImage className="h-4 w-4 text-primary/60 shrink-0" /></span>
                              )}
                            </h3>
                            {record.ageAtDeath && (
                              <p className="text-sm text-muted-foreground">
                                Aged {record.ageAtDeath}{" "}
                                {record.agePeriod || "years"}
                              </p>
                            )}
                          </div>
                          {record.plot && (
                            <Badge variant="outline">{record.plot}</Badge>
                          )}
                        </div>
                        <div className="space-y-1.5 text-sm">
                          {(record.dateOfDeath || record.yearOfDeath) && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {record.dateOfDeath ||
                                `${record.yearOfDeath}`}
                            </div>
                          )}
                          {record.placeOfDeath && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="truncate">
                                {record.placeOfDeath}
                              </span>
                            </div>
                          )}
                          {record.sourceOfEvidence && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="h-3.5 w-3.5" />
                              {record.sourceOfEvidence}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="text-center py-16">
      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-1">No records found</h3>
      <p className="text-muted-foreground">
        {searchTerm
          ? `No burial records match "${searchTerm}". Try a different surname.`
          : "No burial records to display."}
      </p>
    </div>
  );
}

export default function RecordsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <RecordsContent />
    </Suspense>
  );
}
