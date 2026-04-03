"use client"; // クライアント側で動くコンポーネントであることを宣言

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color: string;
  onChange: (newColor: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 現在の色を表示するボタン（前回のColorPreviewの代わり） */}
      <div
        className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* パレット本体（開いている時だけ表示） */}
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 p-2 bg-white rounded-xl shadow-xl">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative">
            <HexColorPicker color={color} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
