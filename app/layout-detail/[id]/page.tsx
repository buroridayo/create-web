"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { LAYOUT_TITLES } from "@/constants/layouts";
import BentoPreview from "@/components/previews/BentoPreview";
import BrokenPreview from "@/components/previews/BrokenPreview";
import HeroPreview from "@/components/previews/HeroPreview";
import HolyPreview from "@/components/previews/HolyPreview";
import SidePreview from "@/components/previews/SidePreview";
import SinglePreview from "@/components/previews/SinglePreview";

interface PreviewProps {
  borderRadius: number;
  borderColor: string;
  fontFamily: string;
  fontWeight: number;
}

const PREVIEW_MAP: Record<string, React.FC<PreviewProps>> = {
  bento: BentoPreview,
  broken: BrokenPreview,
  hero: HeroPreview,
  holy: HolyPreview,
  side: SidePreview,
  single: SinglePreview,
};

export default function LayoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const currentLayout = LAYOUT_TITLES.find((layout) => layout.id === id);
  const displayTitle = currentLayout ? currentLayout.title : id;

  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#e2e8f0");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontWeight, setFontWeight] = useState(400);
  const [borderRadius, setBorderRadius] = useState(16);
  const [panelOpen, setPanelOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const PreviewComponent = PREVIEW_MAP[id];

  const handleCopy = async () => {
    if (!previewRef.current) return;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${displayTitle} — lati CSS</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; }
    body {
      background-color: ${bgColor};
      color: ${textColor};
      font-family: ${fontFamily};
      font-weight: ${fontWeight};
    }
  </style>
</head>
<body>
  <div style="width:100vw;height:100vh;overflow:hidden;">
    ${previewRef.current.innerHTML}
  </div>
  <script>
    (function () {
      function switchPage(target) {
        document.querySelectorAll('[data-preview-page]').forEach(function (el) {
          el.style.display = el.dataset.previewPage === target ? 'contents' : 'none';
        });
        document.querySelectorAll('[data-preview-nav]').forEach(function (btn) {
          var active = btn.dataset.previewNav === target;
          btn.style.opacity = active ? '1' : '0.4';
          btn.style.background = active ? 'rgba(0,0,0,0.1)' : '';
          btn.style.fontWeight = active ? 'bold' : '';
        });
      }
      function switchTab(target) {
        document.querySelectorAll('[data-preview-tab-page]').forEach(function (el) {
          el.style.display = el.dataset.previewTabPage === target ? 'contents' : 'none';
        });
        document.querySelectorAll('[data-preview-tab]').forEach(function (btn) {
          var active = btn.dataset.previewTab === target;
          btn.style.opacity = active ? '1' : '0.4';
          btn.style.background = active ? 'rgba(0,0,0,0.1)' : '';
          btn.style.fontWeight = active ? 'bold' : '';
        });
      }
      document.querySelectorAll('[data-preview-nav]').forEach(function (btn) {
        btn.addEventListener('click', function () { switchPage(btn.dataset.previewNav); });
      });
      document.querySelectorAll('[data-preview-tab]').forEach(function (btn) {
        btn.addEventListener('click', function () { switchTab(btn.dataset.previewTab); });
      });
    })();
  <\/script>
</body>
</html>`;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  };

  return (
    <main className="h-screen flex flex-col bg-linear-to-br from-[#1e00ff] via-[#7000ff] to-[#f000ff] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 h-14 shrink-0">
        <Link
          href="/"
          className="text-white/50 font-mono text-xs hover:text-white transition-colors tracking-wider"
        >
          ← lati CSS
        </Link>
        <h1 className="text-white font-mono text-sm uppercase font-bold tracking-[0.3em]">
          {displayTitle}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all border cursor-pointer ${
              copied
                ? "bg-emerald-400/30 border-emerald-400/50 text-emerald-200"
                : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy HTML"}
          </button>
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="text-white font-mono text-xs px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20 cursor-pointer"
          >
            {panelOpen ? "Hide Panel" : "CSS Design ⚙"}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex gap-3 px-3 pb-3 min-h-0">
        {/* ControlPanel - collapsible */}
        <div
          className={`transition-all duration-300 overflow-hidden shrink-0 ${
            panelOpen ? "w-[320px] opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="w-[320px] h-full overflow-y-auto">
            <ControlPanel
              bgColor={bgColor}
              setBgColor={setBgColor}
              textColor={textColor}
              setTextColor={setTextColor}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              fontWeight={fontWeight}
              setFontWeight={setFontWeight}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
            />
          </div>
        </div>

        {/* Preview area */}
        <div
          ref={previewRef}
          className="flex-1 overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          {PreviewComponent ? (
            <PreviewComponent
              borderRadius={borderRadius}
              borderColor={borderColor}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-4xl font-black uppercase tracking-tighter opacity-20">
                {displayTitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
