"use client";

import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Zap,
  MessageSquare,
  GitBranch,
  Mail,
  Bell,
  Search,
  BarChart2,
  Activity,
  FolderOpen,
  Settings,
} from "lucide-react";

interface BentoPreviewProps {
  borderRadius: number;
  borderColor: string;
  fontFamily: string;
  fontWeight: number;
}

type NavPage = "Dashboard" | "Projects" | "Team" | "Settings";
const NAV_PAGES: NavPage[] = ["Dashboard", "Projects", "Team", "Settings"];

const TABS = ["Overview", "Analytics", "Reports"] as const;
type Tab = (typeof TABS)[number];

const STATS = [
  { label: "Total Users", value: "12,548", change: "+12%", icon: Users, color: "bg-blue-500/10", iconColor: "text-blue-500", positive: true },
  { label: "Revenue", value: "$48.2k", change: "+24%", icon: TrendingUp, color: "bg-emerald-500/10", iconColor: "text-emerald-500", positive: true },
  { label: "Active Tasks", value: "184", change: "-3%", icon: Zap, color: "bg-orange-500/10", iconColor: "text-orange-500", positive: false },
  { label: "Messages", value: "84", change: "+7%", icon: MessageSquare, color: "bg-purple-500/10", iconColor: "text-purple-500", positive: true },
];

const ACTIVITY = [
  { user: "Alex Kim", action: "deployed a new build", time: "2m ago", color: "bg-blue-400/30" },
  { user: "Sam Park", action: "merged pull request #42", time: "15m ago", color: "bg-emerald-400/30" },
  { user: "Jordan Lee", action: "opened issue #77", time: "1h ago", color: "bg-rose-400/30" },
  { user: "Casey Moon", action: "updated the README", time: "3h ago", color: "bg-amber-400/30" },
];

const ANALYTICS_BARS = [65, 48, 72, 90, 55, 80, 43, 95, 60, 78, 85, 70];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const REPORTS = [
  { title: "Q1 Performance", date: "Mar 31, 2026", size: "2.4 MB", type: "PDF" },
  { title: "User Growth Report", date: "Apr 1, 2026", size: "1.1 MB", type: "PDF" },
  { title: "Revenue Summary", date: "Apr 3, 2026", size: "0.8 MB", type: "XLSX" },
  { title: "Team Metrics", date: "Apr 5, 2026", size: "3.2 MB", type: "PDF" },
];

const QUICK_ACTIONS = [
  { label: "New Report", icon: BarChart2 },
  { label: "Invite User", icon: Users },
  { label: "Send Message", icon: Mail },
  { label: "View Branches", icon: GitBranch },
];

const PROJECTS_DATA = [
  { name: "Orbit UI", status: "Active", team: 4, progress: 72, color: "bg-indigo-500/10" },
  { name: "Pulse Analytics", status: "Active", team: 3, progress: 45, color: "bg-emerald-500/10" },
  { name: "Folio v2", status: "Review", team: 2, progress: 90, color: "bg-amber-500/10" },
  { name: "Nomad App", status: "Paused", team: 5, progress: 30, color: "bg-rose-500/10" },
];

const TEAM_DATA = [
  { name: "Alex Kim", role: "Design Lead", status: "Online", tasks: 6, initial: "A", color: "bg-indigo-400/30" },
  { name: "Sam Park", role: "Engineering", status: "Online", tasks: 9, initial: "S", color: "bg-emerald-400/30" },
  { name: "Jordan Lee", role: "Strategy", status: "Away", tasks: 3, initial: "J", color: "bg-rose-400/30" },
  { name: "Casey Moon", role: "Growth", status: "Offline", tasks: 5, initial: "C", color: "bg-amber-400/30" },
];

const BentoPreview: React.FC<BentoPreviewProps> = ({ borderRadius, borderColor, fontFamily, fontWeight }) => {
  const [navPage, setNavPage] = useState<NavPage>("Dashboard");
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [notifOpen, setNotifOpen] = useState(false);

  const r = `${borderRadius}px`;
  const rSm = `${Math.max(borderRadius / 2, 4)}px`;
  const rXs = `${Math.max(borderRadius / 3, 3)}px`;

  return (
    <div className="preview-bento w-full h-full flex flex-col overflow-hidden" style={{ '--bc': borderColor, fontFamily, fontWeight } as React.CSSProperties}>
      <style>{`.preview-bento [class*="border"] { border-color: var(--bc) !important; }`}</style>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-black/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="font-black text-sm tracking-wider uppercase">Studio</span>
        </div>

        {/* Top nav */}
        <nav className="flex gap-1">
          {NAV_PAGES.map((page) => (
            <button
              key={page}
              data-preview-nav={page}
              onClick={() => setNavPage(page)}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                navPage === page ? "bg-black/10 font-bold opacity-100" : "opacity-40 hover:opacity-70 hover:bg-black/5"
              }`}
              style={{ borderRadius: rSm }}
            >
              {page}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 rounded-full text-xs opacity-50 cursor-pointer hover:opacity-80 transition-opacity">
            <Search className="w-3 h-3" />
            <span>Search...</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-7 h-7 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer relative"
            >
              <Bell className="w-3.5 h-3.5 opacity-60" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-9 w-60 bg-white shadow-xl border border-black/5 z-10 p-3 flex flex-col gap-1" style={{ borderRadius: r }}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 px-1">Notifications</p>
                {ACTIVITY.slice(0, 3).map((a) => (
                  <div key={a.user} className="text-xs py-2 px-2 border-b border-black/5 last:border-0 hover:bg-black/3 transition-colors cursor-pointer" style={{ borderRadius: rXs }}>
                    <span className="font-bold">{a.user}</span>{" "}
                    <span className="opacity-60">{a.action}</span>
                    <div className="text-[10px] opacity-30 mt-0.5">{a.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-7 h-7 rounded-full bg-indigo-400/30 flex items-center justify-center text-xs font-black cursor-pointer hover:scale-105 transition-transform">U</div>
        </div>
      </div>

      {/* ── Dashboard ── */}
      <div data-preview-page="Dashboard" style={{ display: navPage === "Dashboard" ? "contents" : "none" }}>
        <>
          {/* Sub-tabs */}
          <div className="flex gap-1 px-6 pt-3 pb-1 shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                data-preview-tab={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab ? "bg-black/10 opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                style={{ borderRadius: rSm }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div data-preview-tab-page="Overview" style={{ display: activeTab === "Overview" ? "contents" : "none" }}>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-3">
                  {STATS.map((stat) => (
                    <div key={stat.label} className={`${stat.color} border border-black/5 p-4 flex flex-col gap-2 hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer`} style={{ borderRadius: r }}>
                      <div className="flex justify-between items-start">
                        <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                        <span className={`text-[10px] font-bold ${stat.positive ? "text-emerald-600" : "text-rose-500"}`}>{stat.change}</span>
                      </div>
                      <div>
                        <p className="text-xl font-black">{stat.value}</p>
                        <p className="text-xs opacity-50 mt-0.5">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-black/3 border border-black/5 p-5" style={{ borderRadius: r }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-black text-sm uppercase tracking-wider">Recent Activity</h3>
                      <Activity className="w-4 h-4 opacity-20" />
                    </div>
                    <div className="flex flex-col gap-1">
                      {ACTIVITY.map((item) => (
                        <div key={item.user} className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0 hover:bg-black/3 transition-colors cursor-pointer rounded">
                          <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-[10px] font-black shrink-0`}>{item.user[0]}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold">{item.user}</p>
                            <p className="text-xs opacity-50 truncate">{item.action}</p>
                          </div>
                          <span className="text-[10px] opacity-30 shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-indigo-500/10 border border-black/5 p-5 flex flex-col gap-2" style={{ borderRadius: r }}>
                    <h3 className="font-black text-sm uppercase tracking-wider mb-1">Quick Actions</h3>
                    {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
                      <button key={label} className="flex items-center gap-2 text-xs font-bold py-2 px-3 bg-white/50 hover:bg-white/80 hover:scale-[1.02] transition-all cursor-pointer" style={{ borderRadius: rSm }}>
                        <Icon className="w-3.5 h-3.5 opacity-60" />{label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div data-preview-tab-page="Analytics" style={{ display: activeTab === "Analytics" ? "contents" : "none" }}>
              <div className="flex flex-col gap-4">
                <div className="bg-black/3 border border-black/5 p-5" style={{ borderRadius: r }}>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-black text-sm uppercase tracking-wider">Monthly Traffic</h3>
                    <span className="text-xs opacity-30 font-medium">2026</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-28">
                    {ANALYTICS_BARS.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full bg-indigo-500/25 hover:bg-indigo-500/60 transition-all cursor-pointer group-hover:scale-y-110 origin-bottom" style={{ height: `${h}%`, borderRadius: `${rXs} ${rXs} 0 0` }} />
                        <span className="text-[8px] opacity-25">{MONTHS[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Avg. Session", value: "4m 32s", note: "Per user" },
                    { label: "Bounce Rate", value: "32%", note: "Below avg" },
                    { label: "Conversions", value: "8.4%", note: "+1.2% this month" },
                  ].map((item) => (
                    <div key={item.label} className="bg-black/3 border border-black/5 p-4 hover:bg-black/5 hover:scale-[1.02] transition-all cursor-pointer" style={{ borderRadius: r }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{item.label}</p>
                      <p className="text-2xl font-black mt-1">{item.value}</p>
                      <p className="text-xs opacity-40 mt-0.5">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div data-preview-tab-page="Reports" style={{ display: activeTab === "Reports" ? "contents" : "none" }}>
              <div className="flex flex-col gap-3">
                {REPORTS.map((report) => (
                  <div key={report.title} className="bg-black/3 border border-black/5 p-4 flex items-center justify-between hover:bg-black/5 hover:scale-[1.005] transition-all cursor-pointer" style={{ borderRadius: r }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-500/10 flex items-center justify-center text-[10px] font-black text-indigo-600 shrink-0" style={{ borderRadius: rSm }}>{report.type}</div>
                      <div>
                        <p className="text-sm font-bold">{report.title}</p>
                        <p className="text-xs opacity-40">{report.date} · {report.size}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold px-3 py-1.5 bg-black/5 hover:bg-black/10 transition-colors cursor-pointer" style={{ borderRadius: rSm }}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      </div>

      {/* ── Projects ── */}
      <div data-preview-page="Projects" style={{ display: navPage === "Projects" ? "contents" : "none" }}>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
              <FolderOpen className="w-4 h-4 opacity-50" /> Projects
            </h2>
            <button className="text-xs font-bold px-3 py-1.5 bg-black text-white hover:opacity-75 transition-opacity cursor-pointer" style={{ borderRadius: rSm }}>+ New</button>
          </div>
          <div className="flex flex-col gap-3">
            {PROJECTS_DATA.map((proj) => (
              <div key={proj.name} className={`${proj.color} border border-black/5 p-4 hover:shadow-md hover:scale-[1.005] transition-all cursor-pointer`} style={{ borderRadius: r }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-black">{proj.name}</h3>
                    <p className="text-xs opacity-40 mt-0.5 flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> {proj.team} members
                    </p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 ${
                    proj.status === "Active" ? "bg-emerald-500/15 text-emerald-700"
                    : proj.status === "Review" ? "bg-amber-500/15 text-amber-700"
                    : "bg-black/5 opacity-40"
                  }`} style={{ borderRadius: rXs }}>
                    {proj.status}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] opacity-40 mb-1">
                    <span>Progress</span><span>{proj.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-black/5 overflow-hidden" style={{ borderRadius: rXs }}>
                    <div className="h-full bg-black/20 transition-all" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div data-preview-page="Team" style={{ display: navPage === "Team" ? "contents" : "none" }}>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 opacity-50" /> Team
            </h2>
            <button className="text-xs font-bold px-3 py-1.5 bg-black text-white hover:opacity-75 transition-opacity cursor-pointer" style={{ borderRadius: rSm }}>Invite</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TEAM_DATA.map((member) => (
              <div key={member.name} className="bg-black/3 border border-black/5 p-4 hover:bg-black/5 hover:scale-[1.01] transition-all cursor-pointer" style={{ borderRadius: r }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center font-black shrink-0`}>{member.initial}</div>
                  <div>
                    <p className="font-black text-sm">{member.name}</p>
                    <p className="text-xs opacity-40">{member.role}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 ${
                    member.status === "Online" ? "bg-emerald-500/10 text-emerald-700"
                    : member.status === "Away" ? "bg-amber-500/10 text-amber-700"
                    : "bg-black/5 opacity-40"
                  }`} style={{ borderRadius: rXs }}>
                    {member.status}
                  </span>
                  <span className="text-xs opacity-30">{member.tasks} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Settings ── */}
      <div data-preview-page="Settings" style={{ display: navPage === "Settings" ? "contents" : "none" }}>
        <div className="flex-1 overflow-y-auto p-5">
          <h2 className="font-black text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 opacity-50" /> Settings
          </h2>
          <div className="flex flex-col gap-4">
            {/* Workspace */}
            <div className="bg-black/3 border border-black/5 p-4" style={{ borderRadius: r }}>
              <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-3">Workspace</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Workspace name", value: "Studio" },
                  { label: "Plan", value: "Pro" },
                  { label: "Region", value: "US East" },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                    <span className="text-xs opacity-40">{f.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{f.value}</span>
                      <button className="text-[10px] opacity-40 hover:opacity-80 cursor-pointer transition-opacity">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Notifications */}
            <div className="bg-black/3 border border-black/5 p-4" style={{ borderRadius: r }}>
              <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-3">Notifications</p>
              <div className="flex flex-col gap-2">
                {["Email digest", "Deployment alerts", "Team mentions"].map((item) => (
                  <div key={item} className="flex justify-between items-center py-1.5">
                    <span className="text-xs opacity-60">{item}</span>
                    <div className="w-8 h-4 bg-indigo-500/30 rounded-full cursor-pointer hover:bg-indigo-500/50 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {/* Danger zone */}
            <div className="border border-rose-500/20 p-4" style={{ borderRadius: r }}>
              <p className="text-xs font-black uppercase tracking-widest text-rose-500/60 mb-3">Danger Zone</p>
              <button className="text-xs font-bold px-3 py-1.5 border border-rose-500/20 text-rose-600/60 hover:bg-rose-500/5 transition-colors cursor-pointer" style={{ borderRadius: rSm }}>
                Delete workspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoPreview;
