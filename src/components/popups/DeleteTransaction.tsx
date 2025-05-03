"use client";
import { X } from "lucide-react";
import { Transaction } from "@/types/transaction";
import { useState } from "react";
import { deleteTransaction } from "@/services/transactionsService";
  
interface DeleteTransactionProps {
    transaction: Transaction;
    closePopup: () => void;
    onChange: () => void;
}
  
const DeleteTransaction: React.FC<DeleteTransactionProps> = ({ transaction, closePopup, onChange }) => {
const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)
    const handleDelete = async () => {
      try {
          setLoading(true);

          const response = await deleteTransaction(transaction.id);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
            setLoading(false);
            setError(response.message || `Failed to delete transaction`)
          }

        } catch (error) {
          setError(`Failed to delete transaction`)
          console.error(`Failed to delete transaction: `, error);
        }
    };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-5 w-1/3">
        <div className="absolute top-10 right-10">
            <X className="cursor-pointer text-red-700" onClick={closePopup}/>
        </div>        

        <p className="text-xl text-irchad-white font-roboto-bold">Do you confirm deleting this transaction?</p>

        <p className="text-xl text-irchad-gray-light font-roboto">{transaction.id}</p>

        <div className="flex space-x-4">
          <button onClick={closePopup} className="bg-irchad-gray border border-irchad-orange text-irchad-orange font-roboto px-4 py-2 rounded-[10px] outline-none">
            Cancel
          </button>

          <button onClick={handleDelete} className="bg-irchad-orange text-irchad-gray px-4 py-2 rounded-[10px] font-roboto outline-none">
            {loading ? `Deleting transaction...` : `Delete transaction`}
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
  

export default DeleteTransaction;