"use client";

import { use, useState } from "react";
import ControlPanel from "@/components/control-panel/ControlPanel";

export default function LayoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(32);

  return (
    <main className="min-h-screen bg-[#005a8d] flex items-center justify-center p-8 gap-12">
      <ControlPanel
        bgColor={bgColor}
        setBgColor={setBgColor}
        textColor={textColor}
        setTextColor={setTextColor}
        // borderRadius={borderRadius} setBorderRadius={setBorderRadius} // スライダー連動用
      />

      <section className="flex-1 max-w-4xl h-150 flex flex-col gap-6">
        {/* ヘッダー部分は元の色（画像のような紫）に戻します */}
        <div className="bg-[#8a00ff] h-20 rounded-[2.5rem] shadow-lg flex items-center px-10">
          <h1 className="text-white font-mono text-2xl uppercase font-bold">
            {id}
          </h1>
        </div>

        {/* ★ここが Preview Area です */}
        <div
          className="flex-1 shadow-inner p-10 flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: bgColor,
            color: textColor,
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
