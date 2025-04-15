"use client";
import Image from "next/image";
import TransactionsList from "@/components/lists/TransactionsList";

//sample data
const transactions = Array.from({ length: 10 }, (_, index) => ({
  id: `${index + 1}`,
  clientName: `Client ${index + 1}`,
  commercial: `Commercial ${index + 1}`,
  dispositifID: `${index}`,
  status: index%2 ===0 ? 'confirmed' : 'pending',
  addingDate: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`

}));

const TransactionsPage = () => {
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
          <TransactionsList title="Transaction" transactionsData={transactions} />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;