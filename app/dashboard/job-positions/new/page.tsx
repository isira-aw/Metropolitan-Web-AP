"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/shared/image-upload";
import { jobPositionsApi } from "@/lib/api/job-positions";
import { DIVISIONS, DIVISION_LABELS } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const STATUS_OPTIONS = ["Active", "Inactive", "Draft"];

export default function NewJobPositionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    category: "CENTRAL_AC",
    information: "",
    status: "Active",
    image: "",
  });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: jobPositionsApi.create,
    onSuccess: () => {
      router.push("/dashboard/job-positions");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to create job position");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate(formData);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/dashboard/job-positions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Positions
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Job Position</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detail">Detail *</Label>
              <Textarea
                id="detail"
                value={formData.detail}
                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category (Division) *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {DIVISION_LABELS[div]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="information">Information</Label>
              <Textarea
                id="information"
                value={formData.information}
                onChange={(e) => setFormData({ ...formData, information: e.target.value })}
                rows={6}
                placeholder="Additional information about the position..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(base64) => setFormData({ ...formData, image: base64 })}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={mutation.isPending} className="flex-1">
                {mutation.isPending ? "Creating..." : "Create Job Position"}
              </Button>
              <Link href="/dashboard/job-positions" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
