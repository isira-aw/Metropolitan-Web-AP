"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobApplicationsApi } from "@/lib/api/job-applications";
import { formatDateTime } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function JobApplicationDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const { data: application, isLoading } = useQuery({
    queryKey: ["job-application", id],
    queryFn: () => jobApplicationsApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!application) {
    return <div className="p-8">Job application not found</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/dashboard/job-applications">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Applications
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Job Application Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-1">Name</h3>
            <p className="text-gray-700">{application.name}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Email</h3>
            <p className="text-gray-700">{application.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Position</h3>
            <p className="text-gray-700">{application.position}</p>
          </div>

          {application.portfolioUrl && (
            <div>
              <h3 className="font-semibold text-sm mb-1">Portfolio</h3>
              <a
                href={application.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                {application.portfolioUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-sm mb-1">Cover Letter</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Submitted</h3>
            <p className="text-gray-700">{formatDateTime(application.createdAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
