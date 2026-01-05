"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Newspaper, MessageSquare, Briefcase, Mail } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const stats = [
    {
      title: "Case Studies",
      icon: FileText,
      href: "/dashboard/case-studies",
      color: "bg-blue-500",
    },
    {
      title: "News Articles",
      icon: Newspaper,
      href: "/dashboard/news",
      color: "bg-green-500",
    },
    {
      title: "Testimonials",
      icon: MessageSquare,
      href: "/dashboard/testimonials",
      color: "bg-purple-500",
    },
    {
      title: "Job Applications",
      icon: Briefcase,
      href: "/dashboard/job-applications",
      color: "bg-orange-500",
    },
    {
      title: "Inquiries",
      icon: Mail,
      href: "/dashboard/inquiries",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back{user ? `, ${user.name}` : ""}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your Metropolitan website content from this dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500 mt-1">
                  Click to manage
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-2">Content Management</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Create, edit, and delete case studies, news articles, and testimonials</li>
              <li>Upload images as Base64 (no external storage needed)</li>
              <li>Filter content by date range and division</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Form Submissions</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>View and delete job applications from candidates</li>
              <li>Manage contact form inquiries from website visitors</li>
              <li>Filter submissions by date range</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
