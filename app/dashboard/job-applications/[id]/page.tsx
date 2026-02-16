"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobApplicationsApi } from "@/lib/api/job-applications";
import { formatDateTime } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  Download,
  X,
  Mail,
  Briefcase,
  User,
  Clock,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";

export default function JobApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const [pdfFullScreen, setPdfFullScreen] = useState(false);

  const { data: application, isLoading } = useQuery({
    queryKey: ["job-application", id],
    queryFn: () => jobApplicationsApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-primary" />
          <p className="text-sm text-gray-500 font-medium">Loading application…</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center space-y-3">
          <FileText className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-600 font-medium">Job application not found</p>
          <Link href="/dashboard/job-applications">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Applications
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Full-screen PDF overlay */}
      {pdfFullScreen && application.resumePdf && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 bg-gray-900/90 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-white/70" />
              <span className="text-white font-medium text-sm">
                Resume — {application.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={application.resumePdf}
                download="resume.pdf"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
              <button
                onClick={() => setPdfFullScreen(false)}
                className="inline-flex items-center justify-center h-8 w-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Close full screen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* PDF Viewer */}
          <div className="flex-1 p-4">
            <iframe
              src={`${application.resumePdf}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="w-full h-full rounded-lg bg-white shadow-2xl"
              title="Resume PDF — Full Screen"
            />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50/50 p-4 lg:p-6 xl:p-10">
        {/* Back link */}
        <div className="mb-6">
          <Link href="/dashboard/job-applications">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900 -ml-3"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Applications
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Application
                  </p>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {application.name}
                  </CardTitle>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1.5 pt-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDateTime(application.createdAt)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {/* Email */}
{/* Email Section */}
<div className=" my-6">
  <a
    href={`mailto:isira.20230530@iit.ac.lk`}
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full"
  >
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
      
      {/* Icon */}
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-100 text-blue-600 shrink-0">
        <Mail className="h-4 w-4" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
          Email
        </p>
        <p className="text-sm text-gray-800 truncate">
          isira.20230530@iit.ac.lk
        </p>
      </div>

      {/* Optional "Send Email" badge on the right */}
      <div className="ml-auto hidden sm:flex items-center justify-center px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
        Send Email
      </div>
    </div>
  </a>
</div>


                {/* Position */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Position
                    </p>
                    <p className="text-sm text-gray-800 truncate">
                      {application.position}
                    </p>
                  </div>
                </div>

                {/* Portfolio */}
                {application.portfolioUrl && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 sm:col-span-2">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-violet-100 text-violet-600 shrink-0">
                      <LinkIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                        Portfolio
                      </p>
                      <a
                        href={application.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <span className="truncate">
                          {application.portfolioUrl}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">
                Cover Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px]">
                {application.coverLetter}
              </p>
            </CardContent>
          </Card>

          {/* Resume PDF */}
          {application.resumePdf && (
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-800">
                    Resume / CV
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <a
                      href={application.resumePdf}
                      download="resume.pdf"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                    <button
                      onClick={() => setPdfFullScreen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-md transition-colors"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      View Full Screen
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  <iframe
                    src={`${application.resumePdf}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                    className="w-full h-[700px]"
                    title="Resume PDF"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}