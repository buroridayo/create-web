import React from "react";

// 選択肢となるフォントのリスト（将来増やしやすくするために配列にしておきます）
const FONT_OPTIONS = [
  { label: "Sans-Serif", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
];

interface FontSelectorProps {
  value: string;
  onChange: (newFont: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-black text-sm font-medium bg-white/60 hover:bg-white/80 px-3 py-1.5 rounded-md outline-none cursor-pointer transition-colors shadow-sm focus:ring-2 focus:ring-[#ff3399]"
    >
      {FONT_OPTIONS.map((font) => (
        <option key={font.value} value={font.value}>
          {font.label}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;
