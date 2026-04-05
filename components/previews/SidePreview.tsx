"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  ChevronRight,
} from "lucide-react";

interface SidePreviewProps {
  borderRadius: number;
  fontFamily: string;
  fontWeight: number;
}

type Page = "Dashboard" | "Articles" | "Projects" | "Settings";

const NAV_ITEMS: { label: Page; icon: React.FC<{ className?: string }> }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Articles", icon: FileText },
  { label: "Projects", icon: FolderOpen },
  { label: "Settings", icon: Settings },
];

const DASHBOARD_STATS = [
  { label: "Published", value: "24", delta: "+3 this week" },
  { label: "Drafts", value: "7", delta: "2 pending review" },
  { label: "Views", value: "48.2k", delta: "+12% vs last month" },
  { label: "Comments", value: "183", delta: "14 new" },
];

const ARTICLE_DATA = [
  { title: "Getting Started with Tailwind v4", status: "Published", views: "3.2k" },
  { title: "Next.js App Router Deep Dive", status: "Published", views: "8.1k" },
  { title: "CSS Grid Complete Guide", status: "Draft", views: "—" },
  { title: "TypeScript Best Practices", status: "Published", views: "1.9k" },
  { title: "React 19 New Features", status: "Draft", views: "—" },
];

const PROJECT_DATA = [
  { name: "Personal Blog", status: "Live", tech: "Next.js + Tailwind" },
  { name: "E-commerce App", status: "In Progress", tech: "React + Supabase" },
  { name: "Portfolio v3", status: "Planning", tech: "Astro + MDX" },
];

const SidePreview: React.FC<SidePreviewProps> = ({
  borderRadius,
  fontFamily,
  fontWeight,
}) => {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const r = `${borderRadius}px`;
  const rSm = `${Math.max(borderRadius / 2, 4)}px`;
  const rXs = `${Math.max(borderRadius / 3, 3)}px`;

  return (
    <div
      className="w-full h-full flex overflow-hidden"
      style={{ fontFamily, fontWeight }}
    >
      {/* Sidebar */}
      <aside className="w-48 shrink-0 border-r border-black/5 flex flex-col">
        <div className="p-4 border-b border-black/5">
          <span className="font-black text-sm uppercase tracking-widest">
            Studio
          </span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActivePage(label)}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left transition-all cursor-pointer ${
                activePage === label
                  ? "bg-black/10 font-bold opacity-100"
                  : "opacity-40 hover:opacity-70 hover:bg-black/5"
              }`}
              style={{ borderRadius: rXs }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {activePage === label && (
                <ChevronRight className="w-3 h-3 ml-auto opacity-30" />
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-black/5 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-400/30 flex items-center justify-center text-[10px] font-black shrink-0">
            U
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate">User</p>
            <p className="text-[10px] opacity-40 truncate">user@example.com</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-black">Good morning 👋</h2>
              <p className="text-xs opacity-40 mt-1">
                Here&apos;s what&apos;s happening with your content.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {DASHBOARD_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-black/3 border border-black/5 p-4 hover:bg-black/5 hover:scale-[1.01] transition-all cursor-pointer"
                  style={{ borderRadius: r }}
                >
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs opacity-60 mt-0.5">{stat.label}</p>
                  <p className="text-[10px] opacity-30 mt-1">{stat.delta}</p>
                </div>
              ))}
            </div>
            <div
              className="bg-black/3 border border-black/5 p-4"
              style={{ borderRadius: r }}
            >
              <h3 className="font-black text-xs uppercase tracking-wider mb-3">
                Recent Articles
              </h3>
              <div className="flex flex-col gap-1">
                {ARTICLE_DATA.slice(0, 3).map((a) => (
                  <div
                    key={a.title}
                    className="flex justify-between text-xs py-2 border-b border-black/5 last:border-0 hover:opacity-70 cursor-pointer transition-opacity"
                  >
                    <span className="opacity-70 font-medium truncate mr-2">
                      {a.title}
                    </span>
                    <span
                      className={`font-bold shrink-0 ${
                        a.status === "Published"
                          ? "text-emerald-600"
                          : "opacity-30"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Articles */}
        {activePage === "Articles" && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black">Articles</h2>
              <button
                className="text-xs font-bold px-4 py-2 bg-black text-white hover:opacity-75 transition-opacity cursor-pointer"
                style={{ borderRadius: rSm }}
              >
                + New
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {ARTICLE_DATA.map((a) => (
                <div
                  key={a.title}
                  className="bg-black/3 border border-black/5 p-3 flex justify-between items-center hover:bg-black/5 hover:scale-[1.005] transition-all cursor-pointer"
                  style={{ borderRadius: r }}
                >
                  <div className="min-w-0 mr-3">
                    <p className="text-sm font-bold truncate">{a.title}</p>
                    <p className="text-[10px] opacity-40 mt-0.5">
                      {a.views} views
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-1 shrink-0 ${
                      a.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-700"
                        : "bg-black/5 opacity-40"
                    }`}
                    style={{ borderRadius: rXs }}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {activePage === "Projects" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-black">Projects</h2>
            <div className="flex flex-col gap-3">
              {PROJECT_DATA.map((p) => (
                <div
                  key={p.name}
                  className="bg-black/3 border border-black/5 p-4 hover:bg-black/5 hover:scale-[1.005] transition-all cursor-pointer"
                  style={{ borderRadius: r }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-black">{p.name}</h3>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 ${
                        p.status === "Live"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : p.status === "In Progress"
                          ? "bg-amber-500/10 text-amber-700"
                          : "bg-black/5 opacity-40"
                      }`}
                      style={{ borderRadius: rXs }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs opacity-40 mt-1">{p.tech}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {activePage === "Settings" && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-black">Settings</h2>
            {[
              { label: "Display name", value: "User" },
              { label: "Email address", value: "user@example.com" },
              { label: "Language", value: "English" },
            ].map((field) => (
              <div
                key={field.label}
                className="bg-black/3 border border-black/5 p-4 flex justify-between items-center"
                style={{ borderRadius: r }}
              >
                <div>
                  <p className="text-xs opacity-40 font-medium">{field.label}</p>
                  <p className="text-sm font-bold mt-0.5">{field.value}</p>
                </div>
                <button
                  className="text-xs font-bold px-3 py-1.5 border border-black/10 hover:bg-black/5 transition-colors cursor-pointer"
                  style={{ borderRadius: rXs }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SidePreview;
