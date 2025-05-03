import { X, Upload } from "lucide-react";
import { useState } from "react";
import { addTransaction } from "@/services/transactionsService";

interface AddTransactionProps {
    closePopup: () => void;
    onChange: () => void;
}
  
const AddTransaction: React.FC<AddTransactionProps> = ({ closePopup, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)

    const [formData, setFormData] = useState({
        user_id: 0,
        commercial_id: 0
      });

    
      const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };

      const handleSubmit = async () => {
        try {
          const payload: Record<string, any> = {
            user_id: formData.user_id,
            commercial_id: formData.commercial_id,
            date: new Date().toISOString()
          };

          setLoading(true);
         
          const response = await addTransaction(payload);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
             setLoading(false);
             setError(response.message || `Failed to add transaction`)
          }

        } catch (error) {
          setError(`Failed to add transaction`)
          console.error(`Failed to add transaction `, error);
        }
      };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] space-y-2 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Add Transaction</p>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Client Id</p>
            <input
                type="number"
                value={formData.user_id}
                onChange={(e) => handleChange("user_id", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex flex-col space-y-2 w-full">
            <p className="text-[16px] text-irchad-gray-light font-roboto">Commercial Id</p>
            <input
                type="number"
                value={formData.commercial_id}
                onChange={(e) => handleChange("commercial_id", e.target.value)}
                className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
            />
        </div>

        <div className="flex w-full">
          <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
             {loading ? `Adding Transaction...` : `Add Transaction`}
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
  
export default AddTransaction;
  