"use client";
import Image from "next/image";

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
      <div className="flex flex-col relative bg-gdg-white shadow-xl p-[56px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <Image src="/icons/deleteX.svg" alt="delete icon" width={11.43} height={11.43} className="cursor-pointer" onClick={closePopup}/>
        </div>        

        <p className="text-xl font-bold text-gdg-black font-product-sans">Do you confirm deleting this user?</p>

        <p className="text-xl font-semibold text-gdg-black font-product-sans">{user.name}</p>

        <div className="flex space-x-4">
          <button onClick={closePopup} className="bg-gdg-white border border-gdg-red text-gdg-red px-4 py-2 rounded-[10px] outline-none">
            Cancel
          </button>

          <button onClick={handleDelete} className="bg-gdg-red text-gdg-white px-4 py-2 rounded-[10px] outline-none">
            Confirm
          </button>
        </div>
      </div>    
    );
};
  

export default DeleteUser;