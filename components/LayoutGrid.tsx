import LayoutCard from "./LayoutCard";

interface LayoutGridProps {
  items: string[];
}

const LayoutGrid: React.FC<LayoutGridProps> = ({ items }) => {
  return (
    <div className="bg-[#2a0bb1]/40 backdrop-blur-md p-10 md:p-16 rounded-4xl shadow-2xl border border-white/10 max-w-5xl w-full mx-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {items.map((item) => (
          <LayoutCard key={item} title={item} />
        ))}
      </div>
    </div>
  );
};

export default LayoutGrid;
