import ControlItem from "./ControlItem";
import ColorPicker from "./ColorPicker";
import Slider from "./Slider";
import FontSelector from "./FontSelector";

interface ControlPanelProps {
  bgColor: string;
  setBgColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontWeight: number; // 追加
  setFontWeight: (weight: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  borderRadius,
  setBorderRadius,
}) => {
  return (
    <aside className="w-full max-w-[320px] bg-linear-to-b from-[#1e00ff] via-[#7000ff] rounded-[3rem] p-10 flex flex-col gap-8 shadow-2xl">
      <h2 className="text-[#ff3399] text-2xl font-black text-center mb-4">
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
          <FontSelector value={fontFamily} onChange={setFontFamily} />
        </ControlItem>

        {/* Font-WeightをSliderと連動。100〜900の間を100刻みで動かします */}
        <ControlItem label="Font-Weight">
          <Slider
            value={fontWeight}
            onChange={setFontWeight}
            min={100}
            max={900}
            step={100}
          />
        </ControlItem>

        <ControlItem label="Border-Radius">
          <Slider
            value={borderRadius}
            onChange={setBorderRadius}
            min={0}
            max={200}
          />
        </ControlItem>
      </div>
    </aside>
  );
};

export default ControlPanel;
