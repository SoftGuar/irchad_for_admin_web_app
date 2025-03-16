import { X, Upload } from "lucide-react";

interface AddUserProps {
    closePopup: () => void;
}
  
const AddEnv: React.FC<AddUserProps> = ({ closePopup }) => {
    const handleSubmit = () => {
      closePopup();
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Add Environment</p>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Name</p>
            <input
                type="text"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Address</p>
            <input
                type="text"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Type</p>
            <input
                type="text"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Description</p>
            <input
                type="text"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Map (.png, .jpeg ..)</p>
            <label className="relative w-full cursor-pointer">
                <input
                    type="file"
                    className="hidden"
                />
                <div className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto w-full flex items-center justify-end">
                    <Upload className="text-irchad-gray-light" size={20} />
                </div>
            </label>
        </div>

        <div className="flex w-full">
          <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
            Add Environment
          </button>
        </div>
      </div>
    );
};
  
export default AddEnv;
  