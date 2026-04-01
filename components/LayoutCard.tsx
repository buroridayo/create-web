import React from "react";

interface LayoutCardProps {
  title: string;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center aspect-square w-full max-w-40 bg-[#bc4da3] rounded-[2.5rem] shadow-lg hover:scale-105 transition-transform cursor-pointer group">
      <span className="text-white font-mono text-lg text-center px-4 leading-tight uppercase group-hover:text-white/90">
        {title}
      </span>
    </div>
  );
};
export default LayoutCard;
