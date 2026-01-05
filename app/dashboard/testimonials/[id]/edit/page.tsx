"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonialsApi } from "@/lib/api/testimonials";
import { DIVISIONS, DIVISION_LABELS } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = parseInt(params.id);
  const [formData, setFormData] = useState({
    content: "",
    author: "",
    role: "",
    division: "CENTRAL_AC",
  });
  const [error, setError] = useState("");

  const { data: testimonial, isLoading } = useQuery({
    queryKey: ["testimonial", id],
    queryFn: () => testimonialsApi.getById(id),
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        content: testimonial.content,
        author: testimonial.author,
        role: testimonial.role,
        division: testimonial.division,
      });
    }
  }, [testimonial]);

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => testimonialsApi.update(id, data),
    onSuccess: () => {
      router.push("/dashboard/testimonials");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to update testimonial");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/dashboard/testimonials">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Testimonials
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

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

            <div className="flex gap-4">
              <Button type="submit" disabled={mutation.isPending} className="flex-1">
                {mutation.isPending ? "Updating..." : "Update Testimonial"}
              </Button>
              <Link href="/dashboard/testimonials" className="flex-1">
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
