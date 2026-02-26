"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin-provider";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import {
  LogIn,
  LogOut,
  Plus,
  Inbox,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function LoginForm() {
  const { login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(username, password);
    } catch {
      setError("Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Image
            src="/images/lydbrook-baptist-church-logo.png"
            alt="Lydbrook Baptist Church"
            width={120}
            height={42}
            className="h-10 w-auto mx-auto mb-2"
          />
          <CardTitle className="text-lg">Admin Login</CardTitle>
          <p className="text-sm text-muted-foreground">
            Cemetery Records Administration
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const statusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">Pending</Badge>;
    case "reviewed":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Reviewed</Badge>;
    case "added":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Added</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

function Dashboard() {
  const { username, logout } = useAdmin();
  const submissions = useQuery(api.submissions.list, {});
  const submissionStats = useQuery(api.submissions.getStats);
  const updateStatus = useMutation(api.submissions.updateStatus);

  const handleStatusChange = async (id: Id<"submissions">, status: string) => {
    await updateStatus({ id, status });
  };

  return (
    <div>
      <div className="bg-church-blue text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-white/60 text-sm">
              Signed in as <span className="text-white/80">{username}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/add-record">
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Add Record
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={logout}
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Inbox className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{submissionStats?.total ?? 0}</p>
                <p className="text-xs text-muted-foreground">Total Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-2xl font-bold">{submissionStats?.pending ?? 0}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{submissionStats?.reviewed ?? 0}</p>
                <p className="text-xs text-muted-foreground">Reviewed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{submissionStats?.added ?? 0}</p>
                <p className="text-xs text-muted-foreground">Added</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Record Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submissions === undefined ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : submissions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No submissions yet. When visitors submit record requests, they
                will appear here.
              </p>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub._id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {sub.burialGivenName} {sub.burialSurname}
                          {sub.burialYear && (
                            <span className="text-muted-foreground font-normal ml-1">
                              (d. {sub.burialYear})
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Submitted by {sub.submitterName} &mdash;{" "}
                          <a href={`mailto:${sub.submitterEmail}`} className="text-primary hover:underline">
                            {sub.submitterEmail}
                          </a>
                        </p>
                        {sub.relationship && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Relationship: {sub.relationship}
                          </p>
                        )}
                        {sub.burialPlot && (
                          <p className="text-xs text-muted-foreground">
                            Plot: {sub.burialPlot}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {statusBadge(sub.status)}
                      </div>
                    </div>
                    <p className="text-sm bg-muted/50 rounded p-3">
                      {sub.additionalInfo}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <p className="text-xs text-muted-foreground flex-1">
                        {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {sub.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(sub._id, "reviewed")}
                        >
                          <Eye className="mr-1.5 h-3 w-3" /> Mark Reviewed
                        </Button>
                      )}
                      {sub.status !== "added" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-700 border-green-300 hover:bg-green-50"
                          onClick={() => handleStatusChange(sub._id, "added")}
                        >
                          <CheckCircle className="mr-1.5 h-3 w-3" /> Mark Added
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginForm />;
}
