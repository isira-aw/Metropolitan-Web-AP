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
  ClipboardList,
  Mail,
  LogOut,
  ArrowBigDownIcon,
  Menu,
  X,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
    {
    title: "—— Update section ——",
    href: "#",
    icon: ArrowBigDownIcon,
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
    title: "Job Positions",
    href: "/dashboard/job-positions",
    icon: ClipboardList,
  },
    {
    title: "—— Inbox section ——",
    href: "#",
    icon: ArrowBigDownIcon,
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
  {
    title: "—— Chatbot ——",
    href: "#",
    icon: ArrowBigDownIcon,
  },
  {
    title: "Knowledge Base",
    href: "/dashboard/chatbot",
    icon: Bot,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center px-4 z-50 border-b border-gray-800">
        <Button
          variant="ghost"
          className="p-2 mr-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Metropolitan Admin</h1>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex h-16 items-center border-b border-gray-800 px-6 lg:h-16">
          <h1 className="text-xl font-bold lg:block hidden">Metropolitan Admin</h1>
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
                onClick={() => setIsMobileMenuOpen(false)}
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

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
