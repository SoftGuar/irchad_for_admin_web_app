"use client";
import Image from "next/image";
import AccountList from "@/components/lists/AccountList";

//sample data
const maintainerAccounts = Array.from({ length: 95 }, (_, index) => ({
  id: index + 1,
  name: `Maintainer ${index + 1}`,
  email: `maintainer${index + 1}@gmail.com`,
  phone: `123-456-789${index}`,
  addingDate: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
  lastEdited: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
}));

const UserPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex w-full">
        <Image src="/images/headers/maintainers_header.svg"  alt="maintainers header" width={1663} height={236}/>
      </div>

      <div className="relative flex justify-center items-center w-full min-h-screen">
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-full w-[95%]">
          <AccountList title="Maintainer" accountsData={maintainerAccounts} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;