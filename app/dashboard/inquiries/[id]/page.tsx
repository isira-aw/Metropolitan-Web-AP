"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inquiriesApi } from "@/lib/api/inquiries";
import { formatDateTime } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InquiryDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const { data: inquiry, isLoading } = useQuery({
    queryKey: ["inquiry", id],
    queryFn: () => inquiriesApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!inquiry) {
    return <div className="p-8">Inquiry not found</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/dashboard/inquiries">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inquiries
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Inquiry Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-1">Name</h3>
            <p className="text-gray-700">{inquiry.name}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Email</h3>
            <p className="text-gray-700">{inquiry.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Phone</h3>
            <p className="text-gray-700">{inquiry.phone}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Subject</h3>
            <p className="text-gray-700">{inquiry.subject}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Division</h3>
            <p className="text-gray-700">{inquiry.division}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Message</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Submitted</h3>
            <p className="text-gray-700">{formatDateTime(inquiry.createdAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
