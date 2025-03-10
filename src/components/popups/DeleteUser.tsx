"use client";
import { X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  addingDate: string;
  lastEdited: string;
}
  
interface DeleteUserProps {
    user: User;
    closePopup: () => void;
}
  
const DeleteUser: React.FC<DeleteUserProps> = ({ user, closePopup }) => {
  
    const handleDelete = () => {
      console.log("deleted user:", user.name);
      closePopup();
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Do you confirm deleting this user?</p>

        <p className="text-xl text-irchad-gray-light font-roboto">{user.name}</p>

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
  

export default DeleteUser;