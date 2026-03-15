"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin-provider";
import { Plus, Check, ArrowLeft, Loader2, LogIn, Upload, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export default function AdminAddRecordPage() {
  const { isAuthenticated, isLoading } = useAdmin();
  const createBurial = useMutation(api.burials.create);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const linkDocument = useMutation(api.documents.linkDocumentToBurial);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [middleNames, setMiddleNames] = useState("");
  const [ageAtDeath, setAgeAtDeath] = useState("");
  const [agePeriod, setAgePeriod] = useState("Years");
  const [dayOfDeath, setDayOfDeath] = useState("");
  const [monthOfDeath, setMonthOfDeath] = useState("");
  const [yearOfDeath, setYearOfDeath] = useState("");
  const [placeOfDeath, setPlaceOfDeath] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [sourceOfEvidence, setSourceOfEvidence] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [section, setSection] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumentFile(file);
    const url = URL.createObjectURL(file);
    setDocumentPreview(url);
  };

  const clearFile = () => {
    setDocumentFile(null);
    if (documentPreview) URL.revokeObjectURL(documentPreview);
    setDocumentPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="pt-8 pb-6">
            <LogIn className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold mb-1">Admin Access Required</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please sign in to add burial records.
            </p>
            <Link href="/admin">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surname.trim() || !givenName.trim()) return;

    setIsSubmitting(true);
    try {
      const plot = section && plotNumber ? `${section}${plotNumber}` : undefined;
      const id = await createBurial({
        surname: surname.trim(),
        givenName: givenName.trim(),
        middleNames: middleNames.trim() || undefined,
        ageAtDeath: ageAtDeath ? parseInt(ageAtDeath, 10) : undefined,
        agePeriod: agePeriod || undefined,
        dayOfDeath: dayOfDeath ? parseInt(dayOfDeath, 10) : undefined,
        monthOfDeath: monthOfDeath || undefined,
        yearOfDeath: yearOfDeath ? parseInt(yearOfDeath, 10) : undefined,
        placeOfDeath: placeOfDeath.trim() || undefined,
        homeAddress: homeAddress.trim() || undefined,
        sourceOfEvidence: sourceOfEvidence.trim() || undefined,
        certificateNumber: certificateNumber.trim() || undefined,
        notes: notes.trim() || undefined,
        plot,
      });

      if (documentFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": documentFile.type },
          body: documentFile,
        });
        const { storageId } = await result.json();
        await linkDocument({
          burialId: id,
          storageId,
          filename: documentFile.name,
        });
      }

      setIsSuccess(true);
      setTimeout(() => router.push(`/records/${id}`), 1500);
    } catch (error) {
      console.error("Failed to create record:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Record Added</h2>
        <p className="text-muted-foreground">Redirecting to the record...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/admin"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-6">Add Burial Record</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="givenName">Given Name <span className="text-destructive">*</span></Label>
                <Input id="givenName" value={givenName} onChange={(e) => setGivenName(e.target.value)} placeholder="e.g. William" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleNames">Middle Name(s)</Label>
                <Input id="middleNames" value={middleNames} onChange={(e) => setMiddleNames(e.target.value)} placeholder="e.g. Arthur" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname <span className="text-destructive">*</span></Label>
                <Input id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="e.g. Harding" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ageAtDeath">Age at Death</Label>
                <Input id="ageAtDeath" type="number" min="0" max="120" value={ageAtDeath} onChange={(e) => setAgeAtDeath(e.target.value)} placeholder="e.g. 72" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agePeriod">Period</Label>
                <Select value={agePeriod} onValueChange={setAgePeriod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Years">Years</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Death Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dayOfDeath">Day</Label>
                <Input id="dayOfDeath" type="number" min="1" max="31" value={dayOfDeath} onChange={(e) => setDayOfDeath(e.target.value)} placeholder="e.g. 15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthOfDeath">Month</Label>
                <Select value={monthOfDeath} onValueChange={setMonthOfDeath}>
                  <SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearOfDeath">Year</Label>
                <Input id="yearOfDeath" type="number" min="1800" max={new Date().getFullYear()} value={yearOfDeath} onChange={(e) => setYearOfDeath(e.target.value)} placeholder="e.g. 1946" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeOfDeath">Place of Death</Label>
              <Input id="placeOfDeath" value={placeOfDeath} onChange={(e) => setPlaceOfDeath(e.target.value)} placeholder="e.g. Dilke Memorial Hospital" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeAddress">Home Address</Label>
              <Input id="homeAddress" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder="e.g. 30 Greenfield Road, Lydbrook" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Plot Location</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select value={section} onValueChange={setSection}>
                <SelectTrigger><SelectValue placeholder="Select section" /></SelectTrigger>
                <SelectContent>
                  {SECTIONS.map((s) => (<SelectItem key={s} value={s}>Section {s}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plotNumber">Plot Number</Label>
              <Input id="plotNumber" type="number" min="1" max="27" value={plotNumber} onChange={(e) => setPlotNumber(e.target.value)} placeholder="e.g. 14" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="sourceOfEvidence">Source of Evidence</Label>
              <Select value={sourceOfEvidence} onValueChange={setSourceOfEvidence}>
                <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Certificate for Burial or Cremation">Certificate for Burial or Cremation</SelectItem>
                  <SelectItem value="Certificate for Disposal">Certificate for Disposal</SelectItem>
                  <SelectItem value="Certificate of Registry of Death">Certificate of Registry of Death</SelectItem>
                  <SelectItem value="Coroner's Order for Burial">Coroner&apos;s Order for Burial</SelectItem>
                  <SelectItem value="Commonwealth War Graves Citation">Commonwealth War Graves Citation</SelectItem>
                  <SelectItem value="Headstone Engraving">Headstone Engraving</SelectItem>
                  <SelectItem value="Headstone Photograph">Headstone Photograph</SelectItem>
                  <SelectItem value="Parish Records">Parish Records</SelectItem>
                  <SelectItem value="Family Records">Family Records</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificateNumber">Certificate Number</Label>
              <Input id="certificateNumber" value={certificateNumber} onChange={(e) => setCertificateNumber(e.target.value)} placeholder="e.g. 280" />
            </div>
            <div className="space-y-2">
              <Label>Scanned Document / Photograph</Label>
              <p className="text-xs text-muted-foreground">
                Upload a scanned certificate, headstone photograph, or other supporting document.
              </p>
              {documentPreview ? (
                <div className="relative rounded-lg border overflow-hidden bg-stone-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={documentPreview}
                    alt="Document preview"
                    className="w-full h-48 object-contain"
                  />
                  <div className="absolute top-2 right-2">
                    <Button type="button" variant="destructive" size="icon" className="h-7 w-7" onClick={clearFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-2 border-t bg-white/80 text-xs text-muted-foreground flex items-center gap-1.5">
                    <FileImage className="h-3.5 w-3.5" />
                    {documentFile?.name} ({((documentFile?.size ?? 0) / 1024).toFixed(0)} KB)
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to select an image file
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG — max 15 MB
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Upload scanned document"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional notes..." rows={3} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Link href="/admin">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || !surname.trim() || !givenName.trim()}>
            {isSubmitting ? "Adding..." : <><Plus className="mr-2 h-4 w-4" /> Add Record</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
