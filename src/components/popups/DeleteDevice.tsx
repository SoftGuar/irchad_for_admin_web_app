"use client";
import { X } from "lucide-react";
import { Device } from "@/types/device";
  
interface DeleteUserProps {
    device: Device;
    closePopup: () => void;
}
  
const DeleteDevice: React.FC<DeleteUserProps> = ({ device, closePopup }) => {
  
    const handleDelete = () => {
      console.log("deleted user:", device.id);
      closePopup();
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Do you confirm deleting this device?</p>

        <p className="text-xl text-irchad-gray-light font-roboto">{device.id}</p>

        <div className="flex space-x-4">
          <button onClick={closePopup} className="bg-irchad-gray border border-irchad-orange text-irchad-orange font-roboto px-4 py-2 rounded-[10px] outline-none">
            Cancel
          </button>

          <button onClick={handleDelete} className="bg-irchad-orange text-irchad-gray px-4 py-2 rounded-[10px] font-roboto outline-none">
            Confirm
          </button>
        </div>
      </div>    
    );
};
  

export default DeleteDevice;