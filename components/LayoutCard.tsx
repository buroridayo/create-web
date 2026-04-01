import Link from "next/link";
import React from "react";

interface LayoutCardProps {
  id: string;
  title: string;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ id, title }) => {
  return (
    <Link href={`/layout-detail/${id}`}>
      <div className="flex items-center justify-center w-40 h-40 bg-[#bc4da3] rounded-[2.5rem] shadow-lg hover:scale-105 transition-transform cursor-pointer group">
        <span className="text-white font-mono text-sm text-center px-4 leading-tight uppercase group-hover:text-white/90">
          {title}
        </span>
      </div>
    </Link>
  );
};
export default LayoutCard;
