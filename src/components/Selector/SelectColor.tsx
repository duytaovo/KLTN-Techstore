import { useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";

interface Props {
  colors?: string[];
  onChange: (value: string) => void;
}
function SelectColor({ colors = [], onChange }: Props) {
  const [colorSelect, setColorSelect] = useState(colors[0]);

  return (
    <ul className="flex gap-4">
      {colors.map((color) => {
        const checked = color === colorSelect;
        return (
          <li key={color}>
            <input
              type="radio"
              id={color}
              className="w-6 h-6 mr-2"
              checked={checked}
              onChange={() => {
                onChange(color);
                setColorSelect(color);
              }}
            />
            <label htmlFor={color}>{color}</label>
          </li>
        );
      })}
    </ul>
  );
}

export default SelectColor;
