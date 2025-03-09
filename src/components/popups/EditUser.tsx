"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  addingDate: string;
  lastEdited: string;
}
  
interface EditUserProps {
    user: User;
    closePopup: () => void;
}
  
const EditUser: React.FC<EditUserProps> = ({ user, closePopup }) => {
    const [editedUser, setEditedUser] = useState(user);
  
    const handleSubmit = () => {
      console.log("Updated user:", editedUser);
      closePopup();
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[80px] rounded-[30px] space-y-5 w-1/3">
              <div className="absolute top-10 right-10">
                <X className="cursor-pointer text-red-700" onClick={closePopup}/>
              </div>        
      
              <p className="text-xl text-irchad-white font-roboto-bold">Edit User</p>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Username</p>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Phone number</p>
                  <input
                    type="text"
                    value={editedUser.phone}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phone: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">E-mail</p>
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex w-full">
                <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
                  Save
                </button>
              </div>
            </div>
    );
};
  
export default EditUser;
  