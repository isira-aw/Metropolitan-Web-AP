"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  MessageSquare,
  Briefcase,
  Mail,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Case Studies",
    href: "/dashboard/case-studies",
    icon: FileText,
  },
  {
    title: "News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquare,
  },
  {
    title: "Job Applications",
    href: "/dashboard/job-applications",
    icon: Briefcase,
  },
  {
    title: "Inquiries",
    href: "/dashboard/inquiries",
    icon: Mail,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <h1 className="text-xl font-bold">Metropolitan Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
