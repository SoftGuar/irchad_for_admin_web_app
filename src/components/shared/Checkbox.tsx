import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-[20px] h-[20px] mr-2 flex items-center justify-center rounded-md bg-irchad-gray border-[0.5px] border-irchad-gray-light ${
          checked ? "bg-irchad-orange" : ""
        }`}
      >
        <Check
          className={`w-4 h-4 text-white transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </label>
  );
};

export default Checkbox;