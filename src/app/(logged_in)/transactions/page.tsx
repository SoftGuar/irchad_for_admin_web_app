"use client";
import Image from "next/image";
import TransactionsList from "@/components/lists/TransactionsList";
import { useState, useEffect } from "react";
import { getTransactions } from "@/services/transactionsService";
import { TransactionRes } from "@/types/transaction";


const TransactionsPage = () => {
      const [transactions, setTransactions] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string|null>(null)
    
      const fetchTransactions = async () => {
        try {
          setLoading(true)
          const response = await getTransactions();  
          if(response.success){
            const transactions = response.data;
            const displayData = transactions.map((transaction:TransactionRes) => ({
              id: transaction.transactionId.toString(),
              clientName: `${transaction.userName}`.trim(),
              commercial: transaction.commercialName,
              dispositifID: transaction.dispositiveId,
              status: transaction.Status,
              addingDate: transaction.date.split("T")[0]
            }));
            setTransactions(displayData); 
          }else {
            setError(response?.message || 'Failed to fetch transactions');
          }
  
        } catch (error) {
          setError('An error occurred while fetching transactions');
          console.error("Failed to fetch transactions:", error);
        } finally {
          setLoading(false);
        }
      };
  
      useEffect(() => { 
        fetchTransactions();
      }, []);
    
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-irchad-orange"></div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="flex justify-center items-center min-h-screen">
              <p className='text-center mt-4 text-sm text-red-500 bg-red-100 bg-opacity-10 border border-red-500 px-4 py-2 rounded-lg animate-shake'>
                {error}
              </p>
          </div>
        );
      }

  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Transactions
          <p className="text-[20px] font-roboto-light">Where you manage your transactions</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <TransactionsList title="Transaction" transactionsData={transactions} onChange={fetchTransactions}/>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;