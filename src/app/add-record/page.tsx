"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Check,
  ArrowLeft,
  Mail,
  User,
  FileText,
  Info,
  Upload,
  X,
  FileImage,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RequestRecordPage() {
  const createSubmission = useMutation(api.submissions.create);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [burialSurname, setBurialSurname] = useState("");
  const [burialGivenName, setBurialGivenName] = useState("");
  const [burialYear, setBurialYear] = useState("");
  const [burialPlot, setBurialPlot] = useState("");
  const [relationship, setRelationship] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert("File must be smaller than 15 MB");
      return;
    }
    setDocumentFile(file);
    setDocumentPreview(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setDocumentFile(null);
    if (documentPreview) URL.revokeObjectURL(documentPreview);
    setDocumentPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitterName.trim() || !submitterEmail.trim() || !burialSurname.trim() || !additionalInfo.trim()) return;

    setIsSubmitting(true);
    try {
      let attachmentStorageId: string | undefined;
      let attachmentFilename: string | undefined;

      if (documentFile) {
        const uploadUrl = await generateUploadUrl({});
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": documentFile.type },
          body: documentFile,
        });
        if (!res.ok) throw new Error("File upload failed");
        const { storageId } = (await res.json()) as { storageId: string };
        attachmentStorageId = storageId;
        attachmentFilename = documentFile.name;
      }

      await createSubmission({
        submitterName: submitterName.trim(),
        submitterEmail: submitterEmail.trim(),
        burialSurname: burialSurname.trim(),
        burialGivenName: burialGivenName.trim() || undefined,
        burialYear: burialYear.trim() || undefined,
        burialPlot: burialPlot.trim() || undefined,
        relationship: relationship.trim() || undefined,
        additionalInfo: additionalInfo.trim(),
        attachmentStorageId: attachmentStorageId as any,
        attachmentFilename,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to submit request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <div className="relative h-40 overflow-hidden">
          <Image
            src="/images/old-headstones-detail.png"
            alt="Headstones in the burial ground"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-slate-900/40" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-6">
            <h1 className="text-2xl font-bold text-white">
              Request Submitted
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-2">
            Your request to add a record for{" "}
            <strong>{burialGivenName} {burialSurname}</strong> has been
            submitted successfully.
          </p>
          <p className="text-muted-foreground mb-6 text-sm">
            Our administrator will review your submission and you will receive a
            response at <strong>{submitterEmail}</strong>.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/records">
              <Button variant="outline">Browse Records</Button>
            </Link>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src="/images/old-headstones-detail.png"
          alt="Headstones in the burial ground"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-slate-900/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Request a Record Addition
            </h1>
            <p className="text-slate-300 text-sm">
              Submit information for our administrator to review
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/records"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Records
        </Link>

        {/* Info Banner */}
        <div className="rounded-lg border bg-blue-50 border-blue-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How this works</p>
              <p>
                If you have information about someone buried in Lydbrook Baptist
                Church Cemetery that isn&apos;t in our records, please fill in
                this form with as much detail as you can. Our administrator will
                review your submission, verify the information, and add it to
                the archive. You will receive a confirmation at the email
                address you provide.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="submitterName">
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="submitterName"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="e.g. Jane Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submitterEmail">
                    Your Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="submitterEmail"
                    type="email"
                    value={submitterEmail}
                    onChange={(e) => setSubmitterEmail(e.target.value)}
                    placeholder="e.g. jane@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">
                  Your Relationship to the Deceased
                </Label>
                <Input
                  id="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Granddaughter, Local historian, Researcher"
                />
              </div>
            </CardContent>
          </Card>

          {/* Burial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Burial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="burialSurname">
                    Surname of Deceased{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="burialSurname"
                    value={burialSurname}
                    onChange={(e) => setBurialSurname(e.target.value)}
                    placeholder="e.g. Harding"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="burialGivenName">
                    Given Name of Deceased
                  </Label>
                  <Input
                    id="burialGivenName"
                    value={burialGivenName}
                    onChange={(e) => setBurialGivenName(e.target.value)}
                    placeholder="e.g. William"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="burialYear">
                    Approximate Year of Death
                  </Label>
                  <Input
                    id="burialYear"
                    value={burialYear}
                    onChange={(e) => setBurialYear(e.target.value)}
                    placeholder="e.g. 1946 or 1940s"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="burialPlot">
                    Plot/Section (if known)
                  </Label>
                  <Input
                    id="burialPlot"
                    value={burialPlot}
                    onChange={(e) => setBurialPlot(e.target.value)}
                    placeholder="e.g. A14 or Section B"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">
                  Please describe what you know{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Please include any details you have: full name, dates, age at death, place of death, home address, family connections, source of information (family records, headstone, certificates), and any other relevant information..."
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  The more detail you can provide, the easier it will be for our
                  administrator to verify and add the record.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Supporting Document */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileImage className="h-5 w-5 text-primary" />
                Supporting Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                If you have a photograph of a headstone, a scanned certificate, or
                any other supporting document, you can attach it here. This is
                optional but helps the administrator verify the record.
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
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-2.5 border-t bg-white/80 text-xs text-muted-foreground flex items-center gap-1.5">
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
                    JPG, PNG &mdash; max 15 MB
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Upload supporting document"
              />
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-end">
            <Link href="/records">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !submitterName.trim() ||
                !submitterEmail.trim() ||
                !burialSurname.trim() ||
                !additionalInfo.trim()
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {documentFile ? "Uploading..." : "Submitting..."}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Request
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Alternative contact */}
        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Alternatively, you can email us directly:
          </p>
          <a
            href="mailto:info@lydbrookbaptist.co.uk?subject=Cemetery%20Record%20Request%20-%20Lydbrook%20Baptist%20Church&body=Name%20of%20deceased:%0AApproximate%20year%20of%20death:%0APlot%20or%20section%20(if%20known):%0AYour%20relationship%20to%20the%20deceased:%0A%0AAdditional%20information:%0A"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <Mail className="h-4 w-4" />
            info@lydbrookbaptist.co.uk
          </a>
        </div>
      </div>
    </div>
  );
}
