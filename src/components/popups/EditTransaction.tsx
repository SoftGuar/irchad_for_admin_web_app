"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Transaction } from "@/types/transaction";
  
interface EditTransactionProps {
    transaction: Transaction;
    closePopup: () => void
}
  
const EditTransaction: React.FC<EditTransactionProps> = ({ transaction, closePopup }) => {
    const [editedTransaction, setEditedTransaction] = useState(transaction);
  

      const handleSubmit = () => {
        
      };
  
    return (
      <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-4 w-1/3">
              <div className="absolute top-10 right-10">
                <X className="cursor-pointer text-red-700" onClick={closePopup}/>
              </div>        
      
              <p className="text-xl text-irchad-white font-roboto-bold">Edit Transaction</p>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Client</p>
                  <input
                    type="text"
                    value={editedTransaction.clientName}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, clientName: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>

              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Commercial</p>
                  <input
                    type="text"
                    value={editedTransaction.commercial}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, commercial: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Status</p>
                  <input
                    type="text"
                    value={editedTransaction.status}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, status: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>
      
              <div className="flex flex-col space-y-3 w-full">
                  <p className="text-[16px] text-irchad-gray-light font-roboto">Dispositif ID</p>
                  <input
                    type="email"
                    value={editedTransaction.dispositifID}
                    onChange={(e) =>
                      setEditedTransaction({ ...editedTransaction, dispositifID: e.target.value })
                    }
                    className="border border-irchad-gray-light bg-irchad-gray-dark text-irchad-gray-light font-roboto text-[16px] p-2 rounded-lg"
                  />
              </div>


      
              <div className="flex w-full">
                <button onClick={handleSubmit} className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none">
                Edit Transaction
                </button>
              </div>
            </div>
    );
};
  
export default EditTransaction;
  