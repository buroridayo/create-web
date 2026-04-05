"use client";

import React, { useState } from "react";

interface HolyPreviewProps {
  borderRadius: number;
  borderColor: string;
  fontFamily: string;
  fontWeight: number;
}

type MainPage = "Home" | "Topics" | "Authors" | "About";
const HEADER_NAV: MainPage[] = ["Home", "Topics", "Authors", "About"];

const CATEGORIES = ["All", "Design", "Code", "UX", "Business"] as const;
type Category = (typeof CATEGORIES)[number];

const ARTICLES = [
  { title: "The Future of Component-Driven Design", category: "Design", time: "5 min", date: "Apr 5", author: "Alex K." },
  { title: "Why TypeScript Is Worth the Investment", category: "Code", time: "8 min", date: "Apr 4", author: "Sam P." },
  { title: "Designing for Zero UI", category: "UX", time: "4 min", date: "Apr 3", author: "Jordan L." },
  { title: "CSS Grid: The Complete Guide", category: "Code", time: "12 min", date: "Apr 2", author: "Casey M." },
  { title: "Building a Design Culture", category: "Business", time: "6 min", date: "Apr 1", author: "Morgan T." },
  { title: "Micro-interactions That Delight", category: "UX", time: "3 min", date: "Mar 30", author: "Alex K." },
];

const TOPICS_DATA = [
  { name: "Design", count: 48, color: "bg-indigo-500/10" },
  { name: "Code", count: 62, color: "bg-emerald-500/10" },
  { name: "UX", count: 31, color: "bg-amber-500/10" },
  { name: "Business", count: 27, color: "bg-rose-500/10" },
  { name: "Career", count: 19, color: "bg-purple-500/10" },
  { name: "Tools", count: 14, color: "bg-sky-500/10" },
];

const AUTHORS_DATA = [
  { name: "Alex K.", role: "Design Lead", articles: 24, initial: "A", color: "bg-indigo-400/30", bio: "Writing about design systems, typography, and visual craft." },
  { name: "Sam P.", role: "Engineer", articles: 18, initial: "S", color: "bg-emerald-400/30", bio: "Deep dives into frontend engineering and DX." },
  { name: "Jordan L.", role: "UX Researcher", articles: 12, initial: "J", color: "bg-rose-400/30", bio: "Exploring human-centered design and user psychology." },
  { name: "Casey M.", role: "Developer", articles: 15, initial: "C", color: "bg-amber-400/30", bio: "CSS architecture, web standards, and browser internals." },
  { name: "Morgan T.", role: "Strategist", articles: 9, initial: "M", color: "bg-purple-400/30", bio: "Business strategy, growth, and team building." },
];

const TRENDING = ["CSS Grid", "TypeScript 5.0", "AI Design Tools", "Headless CMS"];

const HolyPreview: React.FC<HolyPreviewProps> = ({ borderRadius, borderColor, fontFamily, fontWeight }) => {
  const [currentPage, setCurrentPage] = useState<MainPage>("Home");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const r = `${borderRadius}px`;
  const rSm = `${Math.max(borderRadius / 2, 4)}px`;
  const rXs = `${Math.max(borderRadius / 3, 3)}px`;

  const filteredArticles = activeCategory === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="preview-holy w-full h-full flex flex-col" style={{ '--bc': borderColor, fontFamily, fontWeight } as React.CSSProperties}>
      <style>{`.preview-holy [class*="border"] { border-color: var(--bc) !important; }`}</style>
      {/* Header */}
      <header className="px-6 py-4 border-b border-black/5 flex justify-between items-center shrink-0">
        <button className="font-black text-base uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setCurrentPage("Home")}>
          The Brief
        </button>
        <nav className="flex gap-1">
          {HEADER_NAV.map((item) => (
            <button
              key={item}
              data-preview-nav={item}
              onClick={() => setCurrentPage(item)}
              className={`text-xs px-3 py-1.5 font-medium transition-all cursor-pointer ${
                currentPage === item ? "bg-black/10 font-bold opacity-100" : "opacity-40 hover:opacity-80 hover:bg-black/5"
              }`}
              style={{ borderRadius: rXs }}
            >
              {item}
            </button>
          ))}
        </nav>
        <button className="text-xs font-bold px-3 py-1.5 bg-black/5 hover:bg-black/10 transition-colors cursor-pointer" style={{ borderRadius: rSm }}>
          Subscribe
        </button>
      </header>

      {/* Body — Holy Grail always keeps Left / Main / Right */}
      <div className="flex-1 flex min-h-0">
        {/* Left sidebar */}
        <aside className="w-44 shrink-0 border-r border-black/5 p-4 overflow-y-auto">
          <div data-preview-page="Home" style={{ display: currentPage === "Home" ? "contents" : "none" }}>
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Topics</p>
              <nav className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs py-2 px-3 text-left font-medium transition-all cursor-pointer ${
                      activeCategory === cat ? "bg-black/10 font-bold opacity-100" : "opacity-40 hover:opacity-70 hover:bg-black/5"
                    }`}
                    style={{ borderRadius: rXs }}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </>
          </div>
          <div data-preview-page="Topics" style={{ display: currentPage === "Topics" ? "contents" : "none" }}>
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Browse</p>
              <nav className="flex flex-col gap-1">
                {TOPICS_DATA.map((t) => (
                  <div key={t.name} className="flex justify-between items-center text-xs py-2 px-3 opacity-50 hover:opacity-80 hover:bg-black/5 cursor-pointer transition-all" style={{ borderRadius: rXs }}>
                    <span>{t.name}</span>
                    <span className="opacity-50">{t.count}</span>
                  </div>
                ))}
              </nav>
            </>
          </div>
          <div data-preview-page="Authors" style={{ display: currentPage === "Authors" ? "contents" : "none" }}>
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Filter</p>
              <nav className="flex flex-col gap-1">
                {["Most Articles", "A – Z", "Recent"].map((opt) => (
                  <button key={opt} className="text-xs py-2 px-3 text-left opacity-40 hover:opacity-70 hover:bg-black/5 cursor-pointer transition-all" style={{ borderRadius: rXs }}>
                    {opt}
                  </button>
                ))}
              </nav>
            </>
          </div>
          <div data-preview-page="About" style={{ display: currentPage === "About" ? "contents" : "none" }}>
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Jump to</p>
              <nav className="flex flex-col gap-1">
                {["Mission", "Team", "Stats", "Contact"].map((item) => (
                  <button key={item} className="text-xs py-2 px-3 text-left opacity-40 hover:opacity-70 hover:bg-black/5 cursor-pointer transition-all" style={{ borderRadius: rXs }}>
                    {item}
                  </button>
                ))}
              </nav>
            </>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-5">
          {/* Home */}
          <div data-preview-page="Home" style={{ display: currentPage === "Home" ? "contents" : "none" }}>
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-black text-sm uppercase tracking-wider">
                  {activeCategory === "All" ? "Latest" : activeCategory}
                </h2>
                <span className="text-[10px] opacity-25">{filteredArticles.length} articles</span>
              </div>
              <div className="flex flex-col gap-3">
                {filteredArticles.map((article) => (
                  <div
                    key={article.title}
                    className={`border border-black/5 p-4 hover:shadow-sm hover:scale-[1.005] transition-all cursor-pointer ${
                      selectedTitle === article.title ? "bg-black/5" : "hover:bg-black/3"
                    }`}
                    style={{ borderRadius: r }}
                    onClick={() => setSelectedTitle(selectedTitle === article.title ? null : article.title)}
                  >
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex gap-2 items-center mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-30">{article.category}</span>
                          <span className="text-[9px] opacity-20">·</span>
                          <span className="text-[9px] opacity-25">{article.date}</span>
                        </div>
                        <h3 className="font-black text-sm leading-snug">{article.title}</h3>
                        {selectedTitle === article.title && (
                          <p className="text-xs opacity-50 mt-2 leading-relaxed">
                            A deep dive by {article.author}. Explore the key concepts and practical applications shaping today&apos;s teams.
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] opacity-30">{article.time} read</p>
                        <p className="text-[10px] opacity-40 mt-1">{article.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </div>

          {/* Topics */}
          <div data-preview-page="Topics" style={{ display: currentPage === "Topics" ? "contents" : "none" }}>
            <div className="flex flex-col gap-4">
              <h2 className="font-black text-sm uppercase tracking-wider">All Topics</h2>
              <div className="grid grid-cols-2 gap-3">
                {TOPICS_DATA.map((topic) => (
                  <div
                    key={topic.name}
                    className={`${topic.color} border border-black/5 p-4 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer`}
                    style={{ borderRadius: r }}
                    onClick={() => { setCurrentPage("Home"); setActiveCategory(topic.name as Category); }}
                  >
                    <p className="font-black">{topic.name}</p>
                    <p className="text-xs opacity-40 mt-0.5">{topic.count} articles</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Authors */}
          <div data-preview-page="Authors" style={{ display: currentPage === "Authors" ? "contents" : "none" }}>
            <div className="flex flex-col gap-4">
              <h2 className="font-black text-sm uppercase tracking-wider">Contributors</h2>
              <div className="flex flex-col gap-3">
                {AUTHORS_DATA.map((author) => (
                  <div key={author.name} className="flex items-center gap-4 p-4 border border-black/5 hover:bg-black/3 hover:scale-[1.005] transition-all cursor-pointer" style={{ borderRadius: r }}>
                    <div className={`w-10 h-10 rounded-full ${author.color} flex items-center justify-center font-black shrink-0`}>
                      {author.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-sm">{author.name}</p>
                        <span className="text-[10px] opacity-30">{author.role}</span>
                      </div>
                      <p className="text-xs opacity-50 mt-0.5 truncate">{author.bio}</p>
                    </div>
                    <span className="text-xs opacity-30 shrink-0">{author.articles} articles</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <div data-preview-page="About" style={{ display: currentPage === "About" ? "contents" : "none" }}>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-black text-sm uppercase tracking-wider mb-3">Mission</h2>
                <p className="text-sm opacity-60 leading-relaxed">
                  The Brief is an independent publication for designers, engineers, and product thinkers.
                  We publish weekly essays, tutorials, and interviews that cut through the noise.
                </p>
              </div>
              <div>
                <h2 className="font-black text-sm uppercase tracking-wider mb-3">Stats</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Articles", value: "1,200+" },
                    { label: "Authors", value: "24" },
                    { label: "Subscribers", value: "52k" },
                    { label: "Years", value: "5" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 bg-black/3 border border-black/5" style={{ borderRadius: r }}>
                      <p className="text-2xl font-black">{s.value}</p>
                      <p className="text-xs opacity-40 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-black text-sm uppercase tracking-wider mb-2">Contact</h2>
                <p className="text-xs opacity-50">hello@thebrief.co · <span className="underline cursor-pointer">Twitter</span></p>
              </div>
            </div>
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="w-44 shrink-0 border-l border-black/5 p-4 overflow-y-auto">
          {(currentPage === "Home" || currentPage === "Topics") && (
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Trending</p>
              <div className="flex flex-col gap-2 mb-5">
                {TRENDING.map((item, i) => (
                  <div key={item} className="flex items-center gap-2 cursor-pointer group">
                    <span className="text-[10px] font-black opacity-20 w-4">{i + 1}</span>
                    <span className="text-xs opacity-50 group-hover:opacity-80 transition-opacity">{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          <div data-preview-page="Authors" style={{ display: currentPage === "Authors" ? "contents" : "none" }}>
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Featured</p>
              <div className="flex flex-col items-center gap-2 p-3 bg-black/3 border border-black/5" style={{ borderRadius: r }}>
                <div className="w-10 h-10 rounded-full bg-indigo-400/30 flex items-center justify-center font-black">A</div>
                <p className="text-xs font-black">Alex K.</p>
                <p className="text-[10px] opacity-40 text-center">24 articles · Design Lead</p>
              </div>
            </>
          </div>
          <div data-preview-page="About" style={{ display: currentPage === "About" ? "contents" : "none" }}>
            <>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Follow us</p>
              <div className="flex flex-col gap-1">
                {["Twitter", "LinkedIn", "RSS"].map((s) => (
                  <button key={s} className="text-xs py-1.5 px-3 opacity-40 hover:opacity-70 hover:bg-black/5 text-left cursor-pointer transition-all" style={{ borderRadius: rXs }}>{s}</button>
                ))}
              </div>
            </>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Newsletter</p>
            <p className="text-[10px] opacity-40 leading-relaxed mb-2">Weekly. No spam.</p>
            <input placeholder="Email" className="w-full text-[10px] px-2 py-1.5 border border-black/10 bg-black/3 outline-none" style={{ borderRadius: rXs }} />
            <button className="w-full mt-1.5 text-[10px] font-bold py-1.5 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer" style={{ borderRadius: rXs }}>
              Subscribe
            </button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/5 px-6 py-3 flex justify-between items-center shrink-0">
        <span className="text-[10px] opacity-20 font-black uppercase tracking-widest">The Brief © 2026</span>
        <div className="flex gap-3 text-[10px] opacity-20">
          {["Privacy", "Terms"].map((item) => (
            <span key={item} className="hover:opacity-50 cursor-pointer transition-opacity">{item}</span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default HolyPreview;
