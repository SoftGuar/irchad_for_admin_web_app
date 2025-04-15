import { X } from "lucide-react";
import { useState } from "react";
import { addUser } from "@/services/UserManagementService";
interface AddUserProps {
    type: string
    closePopup: () => void;
    onChange: () => void;
}
  
const AddUser: React.FC<AddUserProps> = ({ type, closePopup, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        email: "",
      });

    
      const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };

      const handleSubmit = async () => {
        try {
          const payload: Record<string, any> = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            password: formData.password,
            phone: formData.phoneNumber,
            email: formData.email
          };

          setLoading(true);
          let requestType: string;

          switch (type.toLowerCase()) {
            case "decision-maker":
              requestType = "decider";
              break;
            default:
              requestType = type.toLowerCase();
              break;
          }          
          const response = await addUser(requestType, payload);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
             setLoading(false);
             setError(`Failed to add user ${type}`)
          }

        } catch (error) {
          setError(`Failed to add user ${type}`)
          console.error(`Failed to add user ${type}: `, error);
        }
      };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Add {type}</p>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">First name</p>
            <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Last name</p>
            <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Password</p>
            <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        {type === "Admin" && (
            <div className="flex flex-col space-y-2 w-full">
                <p className="text-[16px] text-irchad-gray-light font-roboto">Privilege level</p>
                <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
                />
            </div>
        )}

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Phone number</p>
            <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">E-mail</p>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex w-full">
          <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
            {loading ? `Adding ${type}...` : `Add ${type}`}
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
  
export default AddUser;
  