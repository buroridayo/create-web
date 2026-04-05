"use client";

import { use, useState } from "react";
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
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontWeight, setFontWeight] = useState(400);
  const [borderRadius, setBorderRadius] = useState(16);
  const [panelOpen, setPanelOpen] = useState(true);

  const PreviewComponent = PREVIEW_MAP[id];

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
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="text-white font-mono text-xs px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20 cursor-pointer"
        >
          {panelOpen ? "Hide Panel" : "CSS Design ⚙"}
        </button>
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
          className="flex-1 overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          {PreviewComponent ? (
            <PreviewComponent
              borderRadius={borderRadius}
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
