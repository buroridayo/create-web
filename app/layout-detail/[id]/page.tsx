"use client";

import { use, useState } from "react";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { LAYOUT_TITLES } from "@/constants/layouts";

export default function LayoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const currentLayout = LAYOUT_TITLES.find((layout) => layout.id === id);

  // 2. もし見つかればその title を、なければ id を表示するようにする
  const displayTitle = currentLayout ? currentLayout.title : id;
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontWeight, setFontWeight] = useState(400);
  const [borderRadius, setBorderRadius] = useState(32);

  return (
    <main className="min-h-screen bg-linear-to-br from-[#1e00ff] via-[#7000ff] to-[#f000ff] flex items-center justify-center p-8 gap-12">
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

      <section className="flex-1 max-w-4xl h-150 flex flex-col gap-6">
        <div className="bg-linear-to-r from-[#1e00ff] via-[#7000ff]  h-20 rounded-[2.5rem] shadow-lg flex items-center justify-center px-10">
          <h1 className="text-white font-mono text-3xl uppercase font-bold ">
            {displayTitle}
          </h1>
        </div>

        {/* ★ここが Preview Area です */}
        <div
          className="flex-1 shadow-inner p-10 flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <div className="text-center">
            <p className="text-4xl font-black uppercase tracking-tighter">
              Preview Content
            </p>
            <p className="mt-2 opacity-70">
              The styles from the left panel are applied here!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
