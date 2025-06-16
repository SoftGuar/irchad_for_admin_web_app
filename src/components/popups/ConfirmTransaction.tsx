"use client";
import { X } from "lucide-react";
import { confirmTransaction } from "@/services/transactionsService";
import { useState , useContext} from "react";
import {ReloadContext} from "../../utils/ReloadContext"

interface ConfirmTransactionProps {
    transaction_id: string;
    dispositive_id: string;
    closePopup: () => void;
}
  
const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ transaction_id, dispositive_id, closePopup}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)
    const { triggerReload } = useContext(ReloadContext);

    const ReloadList = () => {
      triggerReload(); 
    };
    const handleConfirm = async () => {
      try {
          setLoading(true);
          const response = await confirmTransaction(transaction_id, dispositive_id);
          if (response.success){
            setLoading(false);
            closePopup();
            ReloadList()
          }else{
            setLoading(false);
            setError(response.message || `Failed to confirm transaction`)
          }

        } catch (error) {
          setError(`Failed to confirm transaction`)
          console.error(`Failed to confirm transaction: `, error);
        }
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Do you want to confirm this transaction?</p>

        <p className="text-xl text-irchad-gray-light font-roboto">Transaction ID: {transaction_id}</p>

        <div className="flex space-x-4">
          <button onClick={closePopup} className="bg-irchad-gray border border-irchad-orange text-irchad-orange font-roboto px-4 py-2 rounded-[10px] outline-none">
            Cancel
          </button>

          <button onClick={handleConfirm} className="bg-irchad-orange text-irchad-gray px-4 py-2 rounded-[10px] font-roboto outline-none">
          {loading ? `Confirming Transaction...` : `Confirm Transaction`}
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
  

export default ConfirmTransaction;