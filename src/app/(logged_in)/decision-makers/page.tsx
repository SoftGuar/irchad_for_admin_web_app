"use client";
import Image from "next/image";
import AccountList from "@/components/lists/AccountList";

//sample data
const decisionMakerAccounts = Array.from({ length: 95 }, (_, index) => ({
  id: index + 1,
  name: `Decision maker ${index + 1}`,
  email: `decisionmaker${index + 1}@gmail.com`,
  phone: `123-456-789${index}`,
  addingDate: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
  lastEdited: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
}));

const UserPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Decision-Makers
          <p className="text-[20px] font-roboto-light">Where you manage your system decision-makers</p>
        </div>
      </div>

      <div className="relative flex justify-center items-center w-full min-h-screen">
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-full w-[95%]">
          <AccountList title="Decision maker" accountsData={decisionMakerAccounts} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;