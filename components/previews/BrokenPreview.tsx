"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ExternalLink, GitBranch, Menu } from "lucide-react";

interface BrokenPreviewProps {
  borderRadius: number;
  fontFamily: string;
  fontWeight: number;
}

type Page = "Work" | "About" | "Process" | "Contact";
const NAV_LINKS: Page[] = ["Work", "About", "Process", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Orbit UI",
    category: "Design System",
    desc: "A comprehensive component library for modern web applications.",
    detail:
      "Orbit UI was built from scratch over 6 months, featuring 80+ components, dark mode, and full accessibility support. Used by 200+ teams worldwide.",
    color: "bg-indigo-500/15",
    tags: ["React", "TypeScript", "Figma"],
    year: "2026",
    span: "col-span-7",
  },
  {
    id: 2,
    title: "Pulse",
    category: "SaaS Product",
    desc: "Real-time analytics dashboard for e-commerce brands.",
    detail:
      "Pulse processes 10M+ events daily with sub-100ms latency, serving 2,000+ merchants worldwide.",
    color: "bg-rose-500/10",
    tags: ["Next.js", "Supabase", "D3"],
    year: "2025",
    span: "col-span-5",
  },
  {
    id: 3,
    title: "Folio",
    category: "Web App",
    desc: "Minimal portfolio builder for creative professionals.",
    detail:
      "Folio lets designers and developers publish beautiful portfolios in under 10 minutes, no code required. 12,000+ active portfolios.",
    color: "bg-amber-500/10",
    tags: ["Vue", "Node.js", "AWS"],
    year: "2025",
    span: "col-span-4",
  },
  {
    id: 4,
    title: "Nomad",
    category: "Mobile App",
    desc: "Travel companion app for remote workers.",
    detail:
      "Nomad aggregates co-working spaces, local events, and visa requirements for 120+ countries. Featured in Product Hunt #1 of the day.",
    color: "bg-emerald-500/10",
    tags: ["React Native", "Firebase"],
    year: "2024",
    span: "col-span-8",
  },
];

const TEAM = [
  { name: "Alex Kim", role: "Design Lead", initial: "A", color: "bg-indigo-400/30" },
  { name: "Sam Park", role: "Engineering Lead", initial: "S", color: "bg-emerald-400/30" },
  { name: "Jordan Lee", role: "Strategy", initial: "J", color: "bg-rose-400/30" },
  { name: "Casey Moon", role: "Growth", initial: "C", color: "bg-amber-400/30" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    duration: "1–2 weeks",
    desc: "We start with research: stakeholder interviews, competitive analysis, and user studies. We define the problem before touching a pixel.",
    items: ["Brief & kickoff", "User research", "Competitor audit"],
  },
  {
    num: "02",
    title: "Design",
    duration: "2–4 weeks",
    desc: "Wireframes become prototypes. We iterate fast, validate early, and refine until the direction is solid.",
    items: ["Wireframes", "Design system", "Interactive prototype"],
  },
  {
    num: "03",
    title: "Build",
    duration: "4–8 weeks",
    desc: "Clean code, tested components, and continuous delivery. We ship incrementally so you can see progress every week.",
    items: ["Component development", "QA & testing", "Performance audit"],
  },
  {
    num: "04",
    title: "Launch",
    duration: "Ongoing",
    desc: "Deployment, monitoring, and iteration. A launch is a beginning, not an end.",
    items: ["Deployment", "Analytics setup", "Post-launch support"],
  },
];

const BrokenPreview: React.FC<BrokenPreviewProps> = ({
  borderRadius,
  fontFamily,
  fontWeight,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("Work");
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const r = `${borderRadius}px`;
  const rSm = `${Math.max(borderRadius / 2, 4)}px`;
  const rXs = `${Math.max(borderRadius / 3, 3)}px`;

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto flex flex-col"
      style={{ fontFamily, fontWeight }}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 backdrop-blur-sm bg-inherit border-b border-black/5">
        <button
          className="font-black text-lg uppercase tracking-[0.2em] cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => handleNav("Work")}
        >
          Studio
        </button>
        <div className="hidden md:flex gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`text-sm px-4 py-1.5 font-medium transition-all cursor-pointer ${
                currentPage === link
                  ? "bg-black/10 font-bold opacity-100"
                  : "opacity-40 hover:opacity-80 hover:bg-black/5"
              }`}
              style={{ borderRadius: rSm }}
            >
              {link}
            </button>
          ))}
        </div>
        <button
          className="md:hidden p-2 hover:bg-black/5 transition-colors cursor-pointer"
          style={{ borderRadius: rXs }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-1 px-8 py-4 border-b border-black/5 bg-inherit">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`text-sm py-2 text-left cursor-pointer transition-opacity ${
                currentPage === link ? "font-bold opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* ── Work ── */}
      {currentPage === "Work" && (
        <>
          <div className="px-8 pt-14 pb-10">
            <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-25 mb-4">
              Selected Work
            </p>
            <h1 className="text-6xl font-black leading-none tracking-tight mb-5">
              We build
              <br />
              <span className="opacity-20">things</span> that
              <br />
              <span className="italic font-light">matter.</span>
            </h1>
            <p className="text-sm opacity-50 max-w-sm leading-relaxed">
              A small team crafting digital products with purpose and precision.
            </p>
          </div>
          <div className="px-8 pb-12">
            <div className="grid grid-cols-12 gap-4">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className={`${project.span} ${project.color} border border-black/5 p-6 flex flex-col justify-between min-h-45 hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer group`}
                  style={{ borderRadius: r }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">
                      {project.category}
                    </span>
                    <span className="text-[10px] opacity-25">{project.year}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1 group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-50 leading-relaxed">{project.desc}</p>
                    <div className="flex gap-1 mt-3 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-black/5 font-medium" style={{ borderRadius: rXs }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── About ── */}
      {currentPage === "About" && (
        <div className="px-8 py-14 flex flex-col gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-25 mb-4">About</p>
            <h1 className="text-5xl font-black leading-tight tracking-tight mb-5 max-w-md">
              Small team.<br />Big impact.
            </h1>
            <p className="text-sm opacity-50 max-w-md leading-relaxed">
              Studio is an independent design and engineering collective founded in 2019.
              We partner with ambitious startups and forward-thinking brands to build
              products that last.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-25 mb-5">Team</p>
            <div className="grid grid-cols-2 gap-4">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-4 p-4 bg-black/3 border border-black/5 hover:bg-black/5 hover:scale-[1.01] transition-all cursor-pointer"
                  style={{ borderRadius: r }}
                >
                  <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center font-black text-lg shrink-0`}>
                    {member.initial}
                  </div>
                  <div>
                    <p className="font-black">{member.name}</p>
                    <p className="text-xs opacity-40 mt-0.5">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-25 mb-5">Values</p>
            <div className="grid grid-cols-3 gap-4">
              {["Craft over speed", "Simplicity wins", "Collaboration first"].map((v) => (
                <div key={v} className="p-4 bg-black/3 border border-black/5" style={{ borderRadius: r }}>
                  <p className="font-black text-sm">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Process ── */}
      {currentPage === "Process" && (
        <div className="px-8 py-14 flex flex-col gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-25 mb-4">Process</p>
            <h1 className="text-5xl font-black leading-tight tracking-tight mb-5">
              How we work.
            </h1>
            <p className="text-sm opacity-50 max-w-md leading-relaxed">
              A repeatable process that delivers consistently great outcomes.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                className="grid grid-cols-12 gap-6 p-6 bg-black/3 border border-black/5 hover:bg-black/5 transition-colors"
                style={{ borderRadius: r }}
              >
                <div className="col-span-1">
                  <span className="text-3xl font-black opacity-15">{step.num}</span>
                </div>
                <div className="col-span-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black">{step.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-30 px-2 py-0.5 bg-black/5" style={{ borderRadius: rXs }}>
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm opacity-50 leading-relaxed">{step.desc}</p>
                </div>
                <div className="col-span-3">
                  <ul className="flex flex-col gap-1.5">
                    {step.items.map((item) => (
                      <li key={item} className="text-xs opacity-40 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-current opacity-40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="col-span-12 flex justify-center mt-2">
                    <span className="text-xl opacity-10">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Contact ── */}
      {currentPage === "Contact" && (
        <div className="px-8 py-14 flex flex-col gap-10 max-w-2xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-25 mb-4">Contact</p>
            <h1 className="text-5xl font-black leading-tight tracking-tight mb-5">
              Let&apos;s talk.
            </h1>
            <p className="text-sm opacity-50 leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it.
              Fill in the form and we&apos;ll get back within 24 hours.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold opacity-40 uppercase tracking-wider">Name</label>
                <input
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 text-sm border border-black/10 bg-black/3 outline-none focus:border-black/30 transition-colors"
                  style={{ borderRadius: rSm }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold opacity-40 uppercase tracking-wider">Email</label>
                <input
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 text-sm border border-black/10 bg-black/3 outline-none focus:border-black/30 transition-colors"
                  style={{ borderRadius: rSm }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold opacity-40 uppercase tracking-wider">Budget</label>
              <select
                className="w-full px-4 py-2.5 text-sm border border-black/10 bg-black/3 outline-none focus:border-black/30 transition-colors cursor-pointer"
                style={{ borderRadius: rSm }}
              >
                <option>Under $10k</option>
                <option>$10k – $50k</option>
                <option>$50k – $100k</option>
                <option>$100k+</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold opacity-40 uppercase tracking-wider">Message</label>
              <textarea
                placeholder="Tell us about your project..."
                rows={5}
                className="w-full px-4 py-2.5 text-sm border border-black/10 bg-black/3 outline-none focus:border-black/30 transition-colors resize-none"
                style={{ borderRadius: rSm }}
              />
            </div>
            <button
              className="px-6 py-3 bg-black text-white text-sm font-bold hover:opacity-75 transition-opacity cursor-pointer w-fit"
              style={{ borderRadius: rSm }}
            >
              Send message →
            </button>
          </div>
          <div className="flex gap-4">
            {["Instagram", "Twitter", "LinkedIn", "Dribbble"].map((s) => (
              <span key={s} className="text-xs opacity-30 hover:opacity-60 cursor-pointer transition-opacity">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto px-8 py-5 border-t border-black/5 flex justify-between items-center">
        <span className="font-black text-sm uppercase tracking-[0.2em] opacity-25">Studio</span>
        <div className="flex gap-4 text-xs opacity-20">
          {["Privacy", "Instagram", "GitHub"].map((item) => (
            <span key={item} className="hover:opacity-50 cursor-pointer transition-opacity">{item}</span>
          ))}
        </div>
      </div>

      {/* Project modal (Work page) */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-lg p-8 bg-white flex flex-col gap-4 shadow-2xl"
            style={{ borderRadius: r }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{selectedProject.category}</span>
                <h2 className="text-3xl font-black mt-1">{selectedProject.title}</h2>
              </div>
              <button className="p-2 hover:bg-black/5 transition-colors cursor-pointer" style={{ borderRadius: rXs }} onClick={() => setSelectedProject(null)}>
                <X className="w-5 h-5 opacity-40" />
              </button>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">{selectedProject.detail}</p>
            <div className="flex gap-1 flex-wrap">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-1 bg-black/5 font-bold uppercase tracking-wider" style={{ borderRadius: rXs }}>{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-black text-white hover:opacity-80 transition-opacity cursor-pointer" style={{ borderRadius: rSm }}>
                <ExternalLink className="w-3 h-3" /> View Project
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 border border-black/15 hover:bg-black/5 transition-colors cursor-pointer" style={{ borderRadius: rSm }}>
                <GitBranch className="w-3 h-3" /> Source
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrokenPreview;
