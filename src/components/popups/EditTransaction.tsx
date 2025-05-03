"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Transaction } from "@/types/transaction";
import { editTransaction, getTransactionById } from "@/services/transactionsService";
  
interface EditTransactionProps {
    transaction: Transaction;
    closePopup: () => void;
    onChange : () =>void
}
  
const EditTransaction: React.FC<EditTransactionProps> = ({ transaction, closePopup, onChange }) => {
    const [editedTransaction, setEditedTransaction] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);
    const [error, setError] = useState<string|null>(null)

    useEffect(() => {
      const fetchTransaction = async () => {
        try {
          const response = await getTransactionById(transaction.id);
          if (response.success) {
            setEditedTransaction(response.data);
            setFirstLoading(false)
          }else{
            setError(response.message || "Failed to fetch transaction:")
            setFirstLoading(false)
          }
        } catch (error) {
          console.error("Failed to fetch transaction:", error);
        }
      };
    
      fetchTransaction();
    }, []);

    if (firstLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-irchad-orange"></div>
        </div>
      );
    }
    
  

      const handleSubmit = async () => {
        try {
          const payload: Record<string, any> = {
            user_id: editedTransaction.user_id,
            commercial_id: editedTransaction.commercial_id,
            processed: editedTransaction.processed,
            date: new Date().toISOString()
          };


          setLoading(true);         
          const response = await editTransaction(transaction.id, payload);
          if (response.success){
            setLoading(false);
            closePopup();
            onChange();
          }else{
            setLoading(false);
            setError(response.message || `Failed to edit transaction`)
          }

        } catch (error) {
          setError(`Failed to edit transaction`)
          console.error(`Failed to edit transaction: `, error);
        }
      };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-4 w-1/3">
              <div className="absolute top-10 right-10">
                <X className="cursor-pointer text-red-700" onClick={closePopup}/>
              </div>        
      
              <p className="text-xl text-irchad-white font-roboto-bold">Edit Transaction</p>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Client Id</p>
                  <input
                    type="number"
                    value={editedTransaction.user_id}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, user_id: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>

              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Commercial Id</p>
                  <input
                    type="number"
                    value={editedTransaction.commercial_id}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, commercial_id: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>


      
              <div className="flex w-full">
                <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
                {loading ? `Editing Transaction ...` : `Edit Transaction `}
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
  
export default EditTransaction;
  