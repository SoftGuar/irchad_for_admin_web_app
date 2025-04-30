import { X } from "lucide-react";
import { useState } from "react";
import { ConfirmHelperRecommandation } from "@/services/AssistanceService";
interface ConfirmHelperProps {
    id: string;
    closePopup: () => void;
    onChange: () => void;
}
  
const ConfirmHelper: React.FC<ConfirmHelperProps> = ({ id, closePopup, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)

    const [formData, setFormData] = useState({
        password: ""

      });

    
      const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };

      const handleSubmit = async () => {
        try {
          const payload: Record<string, any> = {
            password: formData.password

          };

          setLoading(true);
          
          const response = await ConfirmHelperRecommandation(id, payload);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
             setLoading(false);
             setError(`Failed to Confirm Helper`)
          }

        } catch (error) {
          setError(`Failed to Confirm Helper`)
          console.error(`Failed to Confirm Helper: `, error);
        }
      };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Confirm Helper</p>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Password</p>
            <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>


        

        <div className="flex w-full">
          <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
            {loading ? `Confirming Helper` : `Confirm Helper`}
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
  
export default ConfirmHelper;
  