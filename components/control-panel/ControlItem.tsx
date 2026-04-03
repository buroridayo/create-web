import React from "react";

interface ControlItemProps {
  label: string;
  children: React.ReactNode;
}

const ControlItem: React.FC<ControlItemProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-black font-bold text-lg">{label}</span>
        {/* スライダー以外の要素（色など）は右側に配置 */}
        <div className="shrink-0">
          {label !== "Font-Weight" && label !== "Border-Radius" && children}
        </div>
      </div>
      {/* スライダーなどはラベルの下に配置 */}
      {(label === "Font-Weight" || label === "Border-Radius") && children}
    </div>
  );
};

export default ControlItem;
