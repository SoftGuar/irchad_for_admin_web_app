import { Check } from "lucide-react";

const Checkbox = () => {
  return (
    <label className="flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="hidden peer"
      />
      <div className="w-[20px] h-[20px] mr-2 flex items-center justify-center rounded-md bg-irchad-gray border-[0.5px] border-irchad-gray-light 
                      peer-checked:bg-irchad-orange">
        <Check className="w-4 h-4 text-white scale-0 peer-checked:scale-100" />
      </div>
    </label>
  );
};

export default Checkbox;
