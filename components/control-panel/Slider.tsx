import React from "react";

interface SliderProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number; // 最小値（省略可能）
  max?: number; // 最大値（省略可能）
  step?: number; // 動かす刻み幅（省略可能）
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // 文字列を数値に変換して返す
        className="w-full h-2 bg-blue-700/50 rounded-lg appearance-none cursor-pointer accent-[#ff3399] outline-none focus:ring-2 focus:ring-[#ff3399]/50"
      />
      {/* 現在の数値を右側に小さく表示しておくと親切です */}
      <span className="text-black font-mono font-bold w-8 text-right">
        {value}
      </span>
    </div>
  );
};

export default Slider;
