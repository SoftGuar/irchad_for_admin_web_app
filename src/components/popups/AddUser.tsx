import Image from "next/image";
import { X } from "lucide-react";

interface AddUserProps {
    closePopup: () => void;
}
  
const AddUser: React.FC<AddUserProps> = ({ closePopup }) => {
    const handleSubmit = () => {
      closePopup();
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[80px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Add User</p>

        <div className="flex flex-col space-y-3 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">First name</p>
            <input
                type="text"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-3 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Last name</p>
            <input
                type="text"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-3 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Password</p>
            <input
                type="password"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-3 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">E-mail</p>
            <input
                type="email"
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex w-full">
          <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
            Add User
          </button>
        </div>
      </div>
    );
};
  
export default AddUser;
  