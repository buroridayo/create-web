import ControlItem from "./ControlItem";
import ColorPreview from "./ColorPreview";
import Slider from "./Slider";
import ColorPicker from "./ColorPicker";

interface ControlPanelProps {
  bgColor: string;
  setBgColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
}) => {
  return (
    <aside className="w-full max-w-[320px] bg-[#16c7b7] rounded-[3rem] p-10 flex flex-col gap-8 shadow-2xl">
      <h2 className="text-[#00ff55] text-2xl font-black text-center tracking-tight mb-4">
        CSS DESIGN
      </h2>

      <div className="flex flex-col gap-8">
        <ControlItem label="Background">
          <ColorPicker color={bgColor} onChange={setBgColor} />
        </ControlItem>

        <ControlItem label="Color">
          <ColorPicker color={textColor} onChange={setTextColor} />
        </ControlItem>

        <ControlItem label="Font-Family">
          <span className="text-black text-sm font-medium bg-white/20 px-3 py-1 rounded-md">
            ABeeZee ▾
          </span>
        </ControlItem>

        <ControlItem label="Font-Weight">
          <Slider />
        </ControlItem>

        <ControlItem label="Border-Radius">
          <Slider />
        </ControlItem>
      </div>
    </aside>
  );
};

export default ControlPanel;
