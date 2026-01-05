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
import { caseStudiesApi } from "@/lib/api/case-studies";
import { DIVISIONS, DIVISION_LABELS } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    division: "CENTRAL_AC",
    client: "",
    location: "",
    completionDate: "",
  });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: caseStudiesApi.create,
    onSuccess: () => {
      router.push("/dashboard/case-studies");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to create case study");
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
        <Link href="/dashboard/case-studies">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Case Study</CardTitle>
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(base64) => setFormData({ ...formData, image: base64 })}
            />

            <div className="space-y-2">
              <Label htmlFor="division">Division *</Label>
              <select
                id="division"
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
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
              <Label htmlFor="client">Client *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date *</Label>
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={mutation.isPending} className="flex-1">
                {mutation.isPending ? "Creating..." : "Create Case Study"}
              </Button>
              <Link href="/dashboard/case-studies" className="flex-1">
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
