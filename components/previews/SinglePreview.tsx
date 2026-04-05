"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heart, Bookmark, Share2, ArrowUp } from "lucide-react";

interface SinglePreviewProps {
  borderRadius: number;
  borderColor: string;
  fontFamily: string;
  fontWeight: number;
}

type NavPage = "Reading" | "Library" | "Following" | "Profile";
const NAV_PAGES: NavPage[] = ["Reading", "Library", "Following", "Profile"];

const SECTIONS = [
  { id: "intro", heading: "Introduction", content: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing. A single-column layout lets typography be the hero — no competing sidebars, no distracting widgets." },
  { id: "history", heading: "A Brief History", content: "The single-column layout has roots in print journalism and book design. Long before screens, readers were trained to follow a single vertical flow. The web adapted this pattern — think Medium, Substack, and every great editorial publication." },
  { id: "usage", heading: "When to Use It", content: "This layout excels for long-form content: articles, documentation, essays. The lack of distractions keeps the reader focused. The key is getting the measure right — line lengths of 60–80 characters are optimal for readability." },
  { id: "tips", heading: "Practical Tips", content: "Use generous line-height (1.6–1.8), limit your type scale to 3–4 sizes, and let whitespace do the heavy lifting. A pull-quote can add visual rhythm without breaking the column structure." },
];

const LIBRARY_ARTICLES = [
  { title: "The Power of Single Column Layouts", tag: "Typography", date: "Apr 5", time: "6 min", reading: true },
  { title: "Mastering CSS Flexbox", tag: "CSS", date: "Apr 2", time: "9 min", reading: false },
  { title: "Type Scales and Modular Typography", tag: "Design", date: "Mar 28", time: "7 min", reading: false },
  { title: "Reading Experience on the Web", tag: "UX", date: "Mar 20", time: "5 min", reading: false },
  { title: "Variable Fonts: A Complete Guide", tag: "Typography", date: "Mar 14", time: "11 min", reading: false },
];

const FOLLOWING_AUTHORS = [
  { name: "Alex Kim", role: "Design Lead", initial: "A", color: "bg-indigo-400/30", latest: "The Future of Component-Driven Design", latestDate: "Apr 5" },
  { name: "Sam Park", role: "Engineer", initial: "S", color: "bg-emerald-400/30", latest: "Why TypeScript Is Worth the Investment", latestDate: "Apr 4" },
  { name: "Jordan Lee", role: "UX Researcher", initial: "J", color: "bg-rose-400/30", latest: "Designing for Zero UI", latestDate: "Apr 3" },
];

const SinglePreview: React.FC<SinglePreviewProps> = ({ borderRadius, borderColor, fontFamily, fontWeight }) => {
  const [navPage, setNavPage] = useState<NavPage>("Reading");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const r = `${borderRadius}px`;
  const rSm = `${Math.max(borderRadius / 2, 4)}px`;
  const rXs = `${Math.max(borderRadius / 3, 3)}px`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setScrollProgress(max > 0 ? Math.round((scrollTop / max) * 100) : 0);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setScrollProgress(0);
  }, [navPage]);

  return (
    <div ref={containerRef} className="preview-single w-full h-full overflow-y-auto relative" style={{ '--bc': borderColor, fontFamily, fontWeight } as React.CSSProperties}>
      <style>{`.preview-single [class*="border"] { border-color: var(--bc) !important; }`}</style>
      {/* Reading progress bar */}
      <div className="sticky top-0 z-10 h-1 bg-black/5">
        <div className="h-full bg-indigo-500/50 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Site header with nav */}
      <div className="sticky top-1 z-10 flex justify-between items-center px-6 py-3 backdrop-blur-sm bg-inherit border-b border-black/5">
        <button
          className="font-black text-sm uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => setNavPage("Reading")}
        >
          Longform
        </button>
        <nav className="flex gap-1">
          {NAV_PAGES.map((page) => (
            <button
              key={page}
              data-preview-nav={page}
              onClick={() => setNavPage(page)}
              className={`text-xs px-3 py-1.5 font-medium transition-all cursor-pointer ${
                navPage === page ? "bg-black/10 font-bold opacity-100" : "opacity-40 hover:opacity-70 hover:bg-black/5"
              }`}
              style={{ borderRadius: rXs }}
            >
              {page}
            </button>
          ))}
        </nav>
        <button className="text-xs font-bold px-3 py-1.5 bg-black text-white hover:opacity-75 transition-opacity cursor-pointer" style={{ borderRadius: rXs }}>
          Subscribe
        </button>
      </div>

      {/* ── Reading ── */}
      <div data-preview-page="Reading" style={{ display: navPage === "Reading" ? "contents" : "none" }}>
        <div className="max-w-xl mx-auto px-6 py-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {["Typography", "CSS", "Layout"].map((tag) => (
                <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black/5 border border-black/10 hover:bg-black/10 transition-colors cursor-pointer" style={{ borderRadius: rXs }}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              The Power of Single Column Layouts
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-400/30 flex items-center justify-center text-xs font-black shrink-0">A</div>
              <div>
                <p className="text-sm font-bold">Author Name</p>
                <p className="text-xs opacity-40">April 5, 2026 · 6 min read</p>
              </div>
            </div>
          </div>

          <div className="w-full h-48 bg-linear-to-br from-indigo-400/20 to-purple-400/20 border border-black/5 flex items-center justify-center" style={{ borderRadius: r }}>
            <span className="text-5xl opacity-15">▤</span>
          </div>

          {/* TOC */}
          <div className="bg-black/3 border border-black/5 p-4" style={{ borderRadius: r }}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Contents</p>
            <ol className="flex flex-col gap-1">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    className="text-xs opacity-50 hover:opacity-90 transition-opacity cursor-pointer text-left"
                    onClick={() => {
                      const el = document.getElementById(s.id);
                      if (el && containerRef.current) {
                        containerRef.current.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                      }
                    }}
                  >
                    {i + 1}. {s.heading}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="flex flex-col gap-3">
              <h2 className="text-xl font-black">{section.heading}</h2>
              <p className="text-sm opacity-60 leading-relaxed">{section.content}</p>
            </section>
          ))}

          {/* Actions */}
          <div className="flex items-center justify-between py-4 border-t border-b border-black/5">
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 transition-all cursor-pointer hover:scale-105 ${liked ? "bg-rose-500/10 text-rose-600" : "bg-black/5 hover:bg-black/10"}`}
                style={{ borderRadius: rSm }}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-500" : ""}`} />
                {liked ? "Liked" : "Like"}
              </button>
              <button
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 transition-all cursor-pointer hover:scale-105 ${bookmarked ? "bg-indigo-500/10 text-indigo-600" : "bg-black/5 hover:bg-black/10"}`}
                style={{ borderRadius: rSm }}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-indigo-500" : ""}`} />
                {bookmarked ? "Saved" : "Save"}
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-black/5 hover:bg-black/10 transition-colors cursor-pointer hover:scale-105" style={{ borderRadius: rSm }}>
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>

          {/* Related */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-25 mb-3">Related</p>
            <div className="flex flex-col gap-2">
              {LIBRARY_ARTICLES.slice(1, 4).map((a) => (
                <div
                  key={a.title}
                  className="flex items-center justify-between py-2.5 px-3 border border-black/5 hover:bg-black/3 hover:scale-[1.005] transition-all cursor-pointer"
                  style={{ borderRadius: r }}
                  onClick={() => setNavPage("Library")}
                >
                  <span className="text-sm font-bold opacity-70">{a.title}</span>
                  <span className="text-xs opacity-25 shrink-0">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Library ── */}
      <div data-preview-page="Library" style={{ display: navPage === "Library" ? "contents" : "none" }}>
        <div className="max-w-xl mx-auto px-6 py-10 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-black">Library</h1>
            <p className="text-xs opacity-40 mt-1">Your reading list</p>
          </div>
          <div className="flex flex-col gap-3">
            {LIBRARY_ARTICLES.map((article) => (
              <div
                key={article.title}
                className={`border border-black/5 p-4 flex gap-4 items-start hover:shadow-sm hover:scale-[1.005] transition-all cursor-pointer ${article.reading ? "bg-indigo-500/5" : "hover:bg-black/3"}`}
                style={{ borderRadius: r }}
                onClick={() => article.reading && setNavPage("Reading")}
              >
                <div className="flex-1">
                  {article.reading && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block mb-1">Currently Reading</span>
                  )}
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-30 block mb-1">{article.tag}</span>
                  <h3 className="font-black text-sm leading-snug">{article.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] opacity-30">{article.time} read</p>
                  <p className="text-[10px] opacity-25 mt-1">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Following ── */}
      <div data-preview-page="Following" style={{ display: navPage === "Following" ? "contents" : "none" }}>
        <div className="max-w-xl mx-auto px-6 py-10 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-black">Following</h1>
            <p className="text-xs opacity-40 mt-1">Authors you follow</p>
          </div>
          <div className="flex flex-col gap-4">
            {FOLLOWING_AUTHORS.map((author) => (
              <div key={author.name} className="border border-black/5 p-4 hover:bg-black/3 hover:scale-[1.005] transition-all cursor-pointer" style={{ borderRadius: r }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${author.color} flex items-center justify-center font-black shrink-0`}>{author.initial}</div>
                  <div>
                    <p className="font-black text-sm">{author.name}</p>
                    <p className="text-xs opacity-40">{author.role}</p>
                  </div>
                  <button className="ml-auto text-[10px] font-bold px-3 py-1 border border-black/10 hover:bg-black/5 cursor-pointer transition-colors" style={{ borderRadius: rXs }}>
                    Following
                  </button>
                </div>
                <div className="bg-black/3 p-3" style={{ borderRadius: rSm }}>
                  <p className="text-[10px] opacity-30 mb-0.5">Latest · {author.latestDate}</p>
                  <p className="text-xs font-bold opacity-70">{author.latest}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Profile ── */}
      <div data-preview-page="Profile" style={{ display: navPage === "Profile" ? "contents" : "none" }}>
        <div className="max-w-xl mx-auto px-6 py-10 flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-indigo-400/30 flex items-center justify-center text-2xl font-black shrink-0">U</div>
            <div>
              <h1 className="text-2xl font-black">User Name</h1>
              <p className="text-xs opacity-40 mt-0.5">user@example.com</p>
              <button className="mt-2 text-[10px] font-bold px-3 py-1 border border-black/10 hover:bg-black/5 cursor-pointer transition-colors" style={{ borderRadius: rXs }}>
                Edit profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Articles Read", value: "47" },
              { label: "Following", value: "3" },
              { label: "Bookmarks", value: "12" },
            ].map((s) => (
              <div key={s.label} className="bg-black/3 border border-black/5 p-4 text-center" style={{ borderRadius: r }}>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-xs opacity-40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-black/3 border border-black/5 p-4" style={{ borderRadius: r }}>
            <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-3">Reading History</p>
            <div className="flex flex-col gap-2">
              {LIBRARY_ARTICLES.map((a) => (
                <div key={a.title} className="flex justify-between items-center py-1.5 border-b border-black/5 last:border-0 hover:opacity-70 cursor-pointer transition-opacity">
                  <span className="text-xs font-medium opacity-60 truncate mr-2">{a.title}</span>
                  <span className="text-[10px] opacity-30 shrink-0">{a.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      {scrollProgress > 20 && navPage === "Reading" && (
        <button
          className="fixed bottom-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110 shadow-md backdrop-blur-sm"
          style={{ borderRadius: rSm }}
          onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="w-4 h-4 opacity-50" />
        </button>
      )}
    </div>
  );
};

export default SinglePreview;
