"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, ChevronRight, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const;
const PLOTS_PER_SECTION = 27;

function CemeteryPlanContent() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || null;
  const highlightPlot = searchParams.get("plot") || null;

  const [selectedSection, setSelectedSection] = useState<string | null>(
    initialSection,
  );
  const [selectedPlot, setSelectedPlot] = useState<string | null>(
    highlightPlot,
  );

  const allPlots = useQuery(api.plots.list, {});
  const sectionSummary = useQuery(api.plots.getSectionSummary);
  const plotBurials = useQuery(
    api.burials.getByPlot,
    selectedPlot ? { plot: selectedPlot } : "skip",
  );

  const plotMap = new Map(allPlots?.map((p) => [p.plotId, p]) ?? []);

  const getSectionData = (section: string) =>
    sectionSummary?.find((s) => s.section === section);

  return (
    <div>
      {/* Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/images/burial-ground-interior.png"
          alt="The burial ground behind Lydbrook Baptist Church"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-slate-900/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Cemetery Plan
            </h1>
            <p className="text-slate-300">
              All 9 sections and {PLOTS_PER_SECTION * 9} plots
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Plan Grid */}
          <div>
            {/* Section Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedSection === null ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedSection(null);
                  setSelectedPlot(null);
                }}
              >
                All Sections
              </Button>
              {SECTIONS.map((s) => {
                const data = getSectionData(s);
                return (
                  <Button
                    key={s}
                    variant={selectedSection === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedSection(s);
                      setSelectedPlot(null);
                    }}
                    className="gap-1"
                  >
                    Section {s}
                    {data && (
                      <Badge
                        variant="secondary"
                        className="ml-1 text-[10px] px-1 py-0"
                      >
                        {data.totalOccupants}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 mb-6">
              <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p>
                  The cemetery is divided into <strong>9 sections</strong>{" "}
                  (A&ndash;I), each containing <strong>27 plots</strong>.
                  Click on a plot to view burial details. Plots with recorded
                  burials are highlighted in green.
                </p>
              </div>
            </div>

            {/* Grid */}
            {selectedSection ? (
              <SectionGrid
                section={selectedSection}
                plotMap={plotMap}
                selectedPlot={selectedPlot}
                highlightPlot={highlightPlot}
                onSelectPlot={setSelectedPlot}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {SECTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSection(s)}
                    className="group"
                  >
                    <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary/30">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                          {s}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Section {s}
                        </p>
                        {getSectionData(s) && (
                          <div className="mt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {getSectionData(s)!.totalPlots} plots
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {getSectionData(s)!.totalOccupants} burials
                            </span>
                          </div>
                        )}
                        <div className="mt-3 grid grid-cols-9 gap-0.5">
                          {Array.from(
                            { length: PLOTS_PER_SECTION },
                            (_, i) => {
                              const plotId = `${s}${i + 1}`;
                              const plot = plotMap.get(plotId);
                              return (
                                <div
                                  key={i}
                                  className={cn(
                                    "h-2 rounded-[1px]",
                                    plot && plot.occupants > 0
                                      ? "bg-primary/60"
                                      : "bg-stone-200",
                                  )}
                                />
                              );
                            },
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail Sidebar */}
          <div>
            {selectedPlot && plotBurials ? (
              <Card className="sticky top-20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Plot {selectedPlot}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {plotBurials.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No burial records for this plot.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {plotBurials.map((burial) => (
                        <Link
                          key={burial._id}
                          href={`/records/${burial._id}`}
                          className="block p-3 rounded-md border hover:bg-accent transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">
                              {burial.givenName} {burial.middleNames}{" "}
                              {burial.surname}
                            </p>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                            {burial.yearOfDeath && (
                              <span>d. {burial.yearOfDeath}</span>
                            )}
                            {burial.ageAtDeath && (
                              <span>
                                aged {burial.ageAtDeath}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-20">
                <CardContent className="p-8 text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    {selectedSection
                      ? "Click on a plot to view burial details"
                      : "Select a section to begin exploring"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionGrid({
  section,
  plotMap,
  selectedPlot,
  highlightPlot,
  onSelectPlot,
}: {
  section: string;
  plotMap: Map<string, { plotId: string; occupants: number; summaryText?: string }>;
  selectedPlot: string | null;
  highlightPlot: string | null;
  onSelectPlot: (plotId: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Section {section}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
        {Array.from({ length: PLOTS_PER_SECTION }, (_, i) => {
          const plotId = `${section}${i + 1}`;
          const plot = plotMap.get(plotId);
          const hasData = plot && plot.occupants > 0;
          const isSelected = selectedPlot === plotId;
          const isHighlighted = highlightPlot === plotId;

          return (
            <Tooltip key={plotId}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSelectPlot(plotId)}
                  className={cn(
                    "aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-sm transition-all",
                    "hover:scale-105 hover:shadow-md",
                    hasData
                      ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                      : "bg-stone-100 border-stone-200 text-stone-400 hover:bg-stone-150",
                    isSelected &&
                      "ring-2 ring-primary ring-offset-2 scale-105 shadow-md",
                    isHighlighted &&
                      !isSelected &&
                      "ring-2 ring-amber-500 ring-offset-1 animate-pulse",
                  )}
                >
                  <span className="font-bold text-base">{i + 1}</span>
                  {hasData && (
                    <span className="text-[10px] mt-0.5">
                      {plot.occupants} {plot.occupants === 1 ? "burial" : "burials"}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="font-semibold">Plot {plotId}</p>
                {plot?.summaryText ? (
                  <p className="text-xs mt-1">{plot.summaryText}</p>
                ) : (
                  <p className="text-xs mt-1 text-muted-foreground">
                    No recorded burials
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default function CemeteryPlanPage() {
  return (
    <Suspense>
      <CemeteryPlanContent />
    </Suspense>
  );
}
