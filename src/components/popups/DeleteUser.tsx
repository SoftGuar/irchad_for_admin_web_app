"use client";
import { X } from "lucide-react";
import { Account } from "@/types/account";
import { deleteUser } from "@/services/UserManagementService";
import { useState } from "react";

interface DeleteUserProps {
    type: string;
    account: Account;
    closePopup: () => void;
    onChange: () => void;
}
  
const DeleteUser: React.FC<DeleteUserProps> = ({ type, account, closePopup, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)
    const handleDelete = async () => {
      try {
          setLoading(true);
          let requestType: string;

          switch (type.toLowerCase()) {
            case "decision-maker":
              requestType = "decider";
              break;
            case "commercial":
              requestType = "comemrcial";
              break;
            default:
              requestType = type.toLowerCase();
              break;
          }
          const response = await deleteUser(requestType, account.id);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
            setLoading(false);
            setError(`Failed to delete ${type}`)
          }

        } catch (error) {
          setError(`Failed to delete ${type}`)
          console.error(`Failed to delete ${type}: `, error);
        }
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Do you confirm deleting this account?</p>

        <p className="text-xl text-irchad-gray-light font-roboto">{account.name}</p>

        <div className="flex space-x-4">
          <button onClick={closePopup} className="bg-irchad-gray border border-irchad-orange text-irchad-orange font-roboto px-4 py-2 rounded-[10px] outline-none">
            Cancel
          </button>

          <button onClick={handleDelete} className="bg-irchad-orange text-irchad-gray px-4 py-2 rounded-[10px] font-roboto outline-none">
          {loading ? `Deleting ${type}...` : `Delete ${type}`}
          </button>
        </div>
        {error && 
              <p className='text-center mt-4 text-sm text-red-500 bg-red-100 bg-opacity-10 border border-red-500 px-4 py-2 rounded-lg animate-shake'>
                {error}
              </p>
              }
      </div>    
    );
};
  

export default DeleteUser;