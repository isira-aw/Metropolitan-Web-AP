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
import { newsApi } from "@/lib/api/news";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewNewsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => {
      router.push("/dashboard/news");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to create news article");
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
        <Link href="/dashboard/news">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Create New News Article</CardTitle>
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
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                required
              />
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(base64) => setFormData({ ...formData, image: base64 })}
            />

            <div className="space-y-2">
              <Label htmlFor="date">Publication Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={mutation.isPending} className="flex-1">
                {mutation.isPending ? "Creating..." : "Create News Article"}
              </Button>
              <Link href="/dashboard/news" className="flex-1">
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
