"use client";
import { useState } from "react";
import Image from "next/image";

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
      <div className="flex flex-col relative bg-gdg-white shadow-xl p-[56px] rounded-[30px] space-y-5 w-1/3">
              <div className="absolute top-10 right-10">
                  <Image src="/icons/deleteX.svg" alt="delete icon" width={11.43} height={11.43} className="cursor-pointer" onClick={closePopup}/>
              </div>        
      
              <p className="text-xl font-bold text-gdg-black font-product-sans">Edit User</p>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-gdg-gray-text font-product-sans">Username</p>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-lg"
                  />
              </div>

              {/* add editing role for super user only, during integration (to know the how is the role declared in the backend) */}
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-gdg-gray-text font-product-sans">Password</p>
                  <input
                    type="number"
                    value={editedUser.phone}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phone: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-gdg-gray-text font-product-sans">E-mail</p>
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex space-x-4">
                <button onClick={closePopup} className="bg-gdg-white border border-gdg-blue text-gdg-blue px-4 py-2 rounded-[10px] outline-none">
                  Cancel
                </button>
      
                <button onClick={handleSubmit} className="bg-gdg-blue text-gdg-white px-4 py-2 rounded-[10px] outline-none">
                  Save
                </button>
              </div>
            </div>
    );
};
  
export default EditUser;
  