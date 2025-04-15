"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Account } from "@/types/account";
import { editUser } from "@/services/UserManagementService";
  
interface EditUserProps {
    type: string
    user: Account;
    closePopup: () => void;
    onChange: () => void;
}
  
const EditUser: React.FC<EditUserProps> = ({ type, user, closePopup, onChange }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)
  

      const handleSubmit = async () => {
        try {
          const payload: Record<string, any> = {
            first_name: editedUser.firstName,
            last_name: editedUser.lastName,
            phone: editedUser.phone,
            email: editedUser.email
          };

          if (password.trim() !== '') {
            payload.password = password;
          }

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
          const response = await editUser(requestType, editedUser.id, payload);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
            setLoading(false);
            setError(`Failed to edit ${type}`)
          }

        } catch (error) {
          setError(`Failed to edit ${type}`)
          console.error(`Failed to edit ${type}: `, error);
        }
      };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-4 w-1/3">
              <div className="absolute top-10 right-10">
                <X className="cursor-pointer text-red-700" onClick={closePopup}/>
              </div>        
      
              <p className="text-xl text-irchad-white font-roboto-bold">Edit {type}</p>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">First name</p>
                  <input
                    type="text"
                    value={editedUser.firstName}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, firstName: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>

              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Last name</p>
                  <input
                    type="text"
                    value={editedUser.lastName}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, lastName: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>

              {type === "Admin" && (
                  <div className="flex flex-col space-y-2 w-full">
                      <p className="text-[16px] text-irchad-gray-light font-roboto">Privilege level</p>
                      <input
                        type="text"
                        value={editedUser.previlegeLevel}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, previlegeLevel: e.target.value })
                        }
                        className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                      />
                  </div>
              )}
      
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

              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Password</p>
                  <input
                    type="email"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex w-full">
                <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
                {loading ? `Editing ${type}...` : `Edit ${type}`}
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
  
export default EditUser;
  