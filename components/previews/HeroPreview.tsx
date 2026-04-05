"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Check, Zap, Shield, Globe, BookOpen, ChevronRight } from "lucide-react";

interface HeroPreviewProps {
  borderRadius: number;
  borderColor: string;
  fontFamily: string;
  fontWeight: number;
}

type Page = "Product" | "Pricing" | "Docs" | "Blog";
const NAV_ITEMS: Page[] = ["Product", "Pricing", "Docs", "Blog"];

const FEATURES = [
  { icon: Zap, title: "Blazing Fast", desc: "Sub-50ms response times on all API calls, powered by edge computing globally.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Shield, title: "Secure by Default", desc: "End-to-end encryption, SOC 2 compliant, and zero-trust architecture.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Globe, title: "Global Scale", desc: "Deploy to 35+ regions worldwide with automatic failover and replication.", color: "text-blue-500", bg: "bg-blue-500/10" },
];

const PLANS = [
  { name: "Starter", price: "$0", features: ["Up to 5 projects", "1 GB storage", "Community support"], highlight: false },
  { name: "Pro", price: "$29", features: ["Unlimited projects", "50 GB storage", "Priority support", "Analytics"], highlight: true },
  { name: "Enterprise", price: "Custom", features: ["Custom SLA", "Unlimited everything", "Dedicated support", "SSO"], highlight: false },
];

const DOCS_SECTIONS = ["Getting Started", "Authentication", "API Reference", "Webhooks", "SDKs", "Changelog"];

const BLOG_POSTS = [
  { title: "Announcing Nexus 3.0: The Edge-First Platform", date: "Apr 5, 2026", tag: "Announcement", author: "Nexus Team", featured: true },
  { title: "How We Achieved 99.999% Uptime Last Quarter", date: "Apr 1, 2026", tag: "Engineering", author: "Sam P." },
  { title: "Building Multi-Region Deployments with Nexus", date: "Mar 25, 2026", tag: "Tutorial", author: "Alex K." },
  { title: "Security Best Practices for API-First Teams", date: "Mar 18, 2026", tag: "Security", author: "Jordan L." },
];

const FAQ = [
  { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
  { q: "Is there a free trial?", a: "The Starter plan is free forever. Pro and Enterprise plans have a 14-day trial." },
  { q: "Do you offer discounts for startups?", a: "Yes — apply to our Startup Program for 50% off your first year." },
];

const HeroPreview: React.FC<HeroPreviewProps> = ({ borderRadius, borderColor, fontFamily, fontWeight }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("Product");
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeDoc, setActiveDoc] = useState("Getting Started");
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
    <div ref={containerRef} className="preview-hero w-full h-full overflow-y-auto flex flex-col" style={{ '--bc': borderColor, fontFamily, fontWeight } as React.CSSProperties}>
      <style>{`.preview-hero [class*="border"] { border-color: var(--bc) !important; }`}</style>
      {/* Navbar */}
      <nav className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 backdrop-blur-sm bg-inherit border-b border-black/5">
        <button
          className="font-black text-base uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => handleNav("Product")}
        >
          Nexus
        </button>
        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              data-preview-nav={item}
              onClick={() => handleNav(item)}
              className={`text-xs px-4 py-1.5 font-medium uppercase tracking-wider transition-all cursor-pointer ${
                currentPage === item
                  ? "bg-black/10 font-bold opacity-100"
                  : "opacity-40 hover:opacity-80 hover:bg-black/5"
              }`}
              style={{ borderRadius: rSm }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden md:block text-xs font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer px-3 py-1.5">
            Log in
          </button>
          <button
            className="text-xs font-bold px-4 py-2 bg-black text-white hover:opacity-75 transition-opacity cursor-pointer"
            style={{ borderRadius: rSm }}
            onClick={() => setModalOpen(true)}
          >
            Get Started
          </button>
          <button className="md:hidden p-1.5 cursor-pointer" style={{ borderRadius: rSm }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-1 px-8 py-4 border-b border-black/5 bg-inherit">
          {NAV_ITEMS.map((item) => (
            <button key={item} onClick={() => handleNav(item)}
              className={`text-sm py-2 text-left cursor-pointer transition-opacity ${currentPage === item ? "font-bold opacity-100" : "opacity-60 hover:opacity-100"}`}>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ── Product ── */}
      <div data-preview-page="Product" style={{ display: currentPage === "Product" ? "contents" : "none" }}>
        <>
          <div className="px-8 py-20 flex flex-col items-center text-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 px-4 py-1.5 bg-black/5 rounded-full">Now in public beta</span>
            <h1 className="text-5xl font-black leading-tight tracking-tight max-w-lg">Ship faster.<br />Scale further.</h1>
            <p className="text-sm opacity-50 max-w-sm leading-relaxed">The infrastructure platform that lets you focus on building, not managing servers.</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <button className="px-6 py-2.5 bg-black text-white text-sm font-bold hover:opacity-75 transition-opacity cursor-pointer" style={{ borderRadius: rSm }} onClick={() => setModalOpen(true)}>
                Start for free
              </button>
              <button className="px-6 py-2.5 border border-black/20 text-sm font-bold hover:bg-black/5 transition-colors cursor-pointer" style={{ borderRadius: rSm }} onClick={() => handleNav("Docs")}>
                View docs →
              </button>
            </div>
          </div>
          <div className="px-8 pb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-25 text-center mb-8">Why Nexus</p>
            <div className="grid grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className={`${f.bg} border border-black/5 p-6 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer`} style={{ borderRadius: r }}>
                  <div className={`w-8 h-8 ${f.bg} rounded-lg flex items-center justify-center mb-3`}>
                    <f.icon className={`w-4 h-4 ${f.color}`} />
                  </div>
                  <h3 className="font-black mb-1">{f.title}</h3>
                  <p className="text-xs opacity-50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-8 pb-12 flex flex-col items-center text-center gap-4 bg-black/3 mx-8 mb-8" style={{ borderRadius: r }}>
            <div className="py-10 flex flex-col items-center gap-4">
              <h2 className="text-2xl font-black">Ready to ship faster?</h2>
              <p className="text-sm opacity-50">Join 10,000+ teams already building on Nexus.</p>
              <button className="px-6 py-2.5 bg-black text-white text-sm font-bold hover:opacity-75 transition-opacity cursor-pointer" style={{ borderRadius: rSm }} onClick={() => handleNav("Pricing")}>
                See pricing →
              </button>
            </div>
          </div>
        </>
      </div>

      {/* ── Pricing ── */}
      <div data-preview-page="Pricing" style={{ display: currentPage === "Pricing" ? "contents" : "none" }}>
        <div className="px-8 py-16 flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-25">Pricing</p>
            <h1 className="text-4xl font-black tracking-tight">Simple, transparent pricing.</h1>
            <p className="text-sm opacity-50">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div key={plan.name}
                className={`border p-6 flex flex-col gap-4 transition-all ${plan.highlight ? "border-black/20 bg-black/5 scale-[1.02] shadow-md" : "border-black/5 hover:shadow-md hover:scale-[1.01]"}`}
                style={{ borderRadius: r }}
              >
                {plan.highlight && <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Most Popular</span>}
                <div>
                  <p className="text-xs opacity-40 uppercase tracking-wider font-bold">{plan.name}</p>
                  <p className="text-3xl font-black mt-1">{plan.price}<span className="text-sm font-normal opacity-40">{plan.price !== "Custom" ? "/mo" : ""}</span></p>
                </div>
                <ul className="flex flex-col gap-1.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs opacity-60">
                      <Check className="w-3 h-3 opacity-50 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`text-xs font-bold py-2.5 transition-all cursor-pointer ${plan.highlight ? "bg-black text-white hover:opacity-75" : "border border-black/20 hover:bg-black/5"}`}
                  style={{ borderRadius: rSm }}
                  onClick={() => setModalOpen(true)}
                >
                  {plan.price === "Custom" ? "Contact us" : "Get started"}
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-black uppercase tracking-widest opacity-25 mb-1">FAQ</p>
            {FAQ.map((item, i) => (
              <div key={i} className="border border-black/5 overflow-hidden" style={{ borderRadius: r }}>
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-bold hover:bg-black/3 transition-colors cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                  <ChevronRight className={`w-4 h-4 opacity-30 shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm opacity-50 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Docs ── */}
      <div data-preview-page="Docs" style={{ display: currentPage === "Docs" ? "contents" : "none" }}>
        <div className="flex flex-1 min-h-0 overflow-hidden" style={{ height: "calc(100% - 57px)" }}>
          {/* Sidebar */}
          <aside className="w-48 shrink-0 border-r border-black/5 p-4 overflow-y-auto">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Documentation</p>
            <nav className="flex flex-col gap-1">
              {DOCS_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveDoc(section)}
                  className={`text-xs py-2 px-3 text-left font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeDoc === section ? "bg-black/10 font-bold opacity-100" : "opacity-40 hover:opacity-70 hover:bg-black/5"
                  }`}
                  style={{ borderRadius: rXs }}
                >
                  <BookOpen className="w-3 h-3 shrink-0" />
                  {section}
                </button>
              ))}
            </nav>
          </aside>
          {/* Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-25 mb-2">Nexus Docs</p>
            <h1 className="text-3xl font-black mb-4">{activeDoc}</h1>
            {activeDoc === "Getting Started" && (
              <div className="flex flex-col gap-5">
                <p className="text-sm opacity-60 leading-relaxed">Get up and running with Nexus in under 5 minutes. This guide walks you through installation, authentication, and your first deployment.</p>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-2">Install</p>
                  <div className="bg-black/5 border border-black/5 p-4 font-mono text-xs" style={{ borderRadius: r }}>
                    <span className="opacity-40">$</span>{" "}
                    <span>npm install @nexus/cli -g</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-2">Initialize</p>
                  <div className="bg-black/5 border border-black/5 p-4 font-mono text-xs" style={{ borderRadius: r }}>
                    <span className="opacity-40">$</span>{" "}
                    <span>nexus init my-project</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-2">Deploy</p>
                  <div className="bg-black/5 border border-black/5 p-4 font-mono text-xs" style={{ borderRadius: r }}>
                    <span className="opacity-40">$</span>{" "}
                    <span>nexus deploy --env production</span>
                  </div>
                </div>
                <p className="text-sm opacity-50 leading-relaxed">That&apos;s it. Your project is live. Next, set up <button className="underline opacity-80 cursor-pointer" onClick={() => setActiveDoc("Authentication")}>Authentication</button> to secure your endpoints.</p>
              </div>
            )}
            {activeDoc !== "Getting Started" && (
              <div className="flex flex-col gap-4">
                <p className="text-sm opacity-60 leading-relaxed">
                  Comprehensive reference for the {activeDoc} module. Choose a topic from the sidebar to explore specific features.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Quick Start", "Configuration", "Examples", "Troubleshooting"].map((item) => (
                    <div key={item} className="p-4 bg-black/3 border border-black/5 hover:bg-black/5 hover:scale-[1.01] transition-all cursor-pointer" style={{ borderRadius: r }}>
                      <p className="font-black text-sm">{item}</p>
                      <p className="text-xs opacity-40 mt-0.5">{activeDoc} · Guide</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Blog ── */}
      <div data-preview-page="Blog" style={{ display: currentPage === "Blog" ? "contents" : "none" }}>
        <div className="px-8 py-12 flex flex-col gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-25 mb-2">Blog</p>
            <h1 className="text-4xl font-black tracking-tight">From the team</h1>
          </div>
          {/* Featured */}
          {BLOG_POSTS.filter((p) => p.featured).map((post) => (
            <div key={post.title}
              className="p-6 bg-indigo-500/10 border border-black/5 hover:shadow-md hover:scale-[1.005] transition-all cursor-pointer"
              style={{ borderRadius: r }}
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{post.tag}</span>
              <h2 className="text-2xl font-black mt-2 mb-2">{post.title}</h2>
              <div className="flex gap-2 text-xs opacity-40">
                <span>{post.author}</span><span>·</span><span>{post.date}</span>
              </div>
            </div>
          ))}
          {/* List */}
          <div className="flex flex-col gap-3">
            {BLOG_POSTS.filter((p) => !p.featured).map((post) => (
              <div key={post.title}
                className="flex justify-between items-center p-4 border border-black/5 hover:bg-black/3 hover:scale-[1.005] transition-all cursor-pointer"
                style={{ borderRadius: r }}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30">{post.tag}</span>
                  <h3 className="font-black text-sm mt-0.5">{post.title}</h3>
                  <div className="flex gap-2 text-xs opacity-30 mt-1">
                    <span>{post.author}</span><span>·</span><span>{post.date}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-20 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-8 py-5 border-t border-black/5 flex justify-between items-center">
        <span className="font-black text-sm uppercase tracking-widest opacity-30">Nexus</span>
        <div className="flex gap-4 text-xs opacity-25">
          {["Privacy", "Terms", "Status"].map((item) => (
            <span key={item} className="hover:opacity-60 cursor-pointer transition-opacity">{item}</span>
          ))}
        </div>
      </div>

      {/* Signup modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center p-8" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-md p-8 bg-white flex flex-col gap-5 shadow-2xl" style={{ borderRadius: r }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black">Create account</h2>
                <p className="text-xs opacity-40 mt-1">Start free, upgrade anytime.</p>
              </div>
              <button className="p-1.5 hover:bg-black/5 cursor-pointer transition-colors" style={{ borderRadius: rSm }} onClick={() => setModalOpen(false)}>
                <X className="w-4 h-4 opacity-40" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input placeholder="Email address" className="w-full px-4 py-2.5 text-sm border border-black/10 outline-none focus:border-black/30 transition-colors bg-black/3" style={{ borderRadius: rSm }} />
              <input type="password" placeholder="Password" className="w-full px-4 py-2.5 text-sm border border-black/10 outline-none focus:border-black/30 transition-colors bg-black/3" style={{ borderRadius: rSm }} />
              <button className="w-full py-2.5 bg-black text-white text-sm font-bold hover:opacity-75 transition-opacity cursor-pointer mt-1" style={{ borderRadius: rSm }}>
                Create account →
              </button>
            </div>
            <p className="text-[10px] opacity-25 text-center">By signing up you agree to our Terms of Service.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroPreview;
