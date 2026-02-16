"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inquiriesApi } from "@/lib/api/inquiries";
import { formatDateTime } from "@/lib/utils";
import { ArrowLeft, Mail } from "lucide-react";
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
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!inquiry) {
    return <div className="p-8 text-center text-gray-500">Inquiry not found</div>;
  }

  return (
    <div className="p-4 lg:p-6 xl:p-12 bg-gray-50 min-h-screen">

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/dashboard/inquiries">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Inquiries
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Inquiry Details</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6 space-y-4">
          
          <div>
            <p className="text-[11px] uppercase text-gray-400">Name</p>
            <p className="text-gray-800 font-medium">{inquiry.name}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase text-gray-400">Email</p>
            <p className="text-gray-800">{inquiry.email}</p>
          </div>

          {inquiry.phone && (
            <div>
              <p className="text-[11px] uppercase text-gray-400">Phone</p>
              <p className="text-gray-800">{inquiry.phone}</p>
            </div>
          )}

          <div>
            <p className="text-[11px] uppercase text-gray-400">Subject</p>
            <p className="text-gray-800">{inquiry.subject}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase text-gray-400">Division</p>
            <p className="text-gray-800">{inquiry.division}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase text-gray-400">Message</p>
            <p className="text-gray-800 whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          <div>
            <p className="text-[11px] uppercase text-gray-400">Submitted</p>
            <p className="text-gray-800">{formatDateTime(inquiry.createdAt)}</p>
          </div>

        </CardContent>
      </Card>

      {/* Send Email Button */}
      <div className="mt-6">
        <a
          href={`mailto:${inquiry.email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Mail className="h-4 w-4" />
            Reply Email
          </Button>
        </a>
      </div>

    </div>
  );
}
