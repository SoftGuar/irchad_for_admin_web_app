"use client";
import Image from "next/image";
import AccountList from "@/components/lists/AccountList";
import { getUsers } from "@/services/UserManagementService";
import { useState, useEffect } from "react";
import { User } from "@/types/user";

const UserPage = () => {
  const [adminAccounts, setAdminAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await getUsers("admin"); 
      if(response.success){
        const users = response.data;
        const displayData = users.map((user:User) => ({
          id: user.id.toString(),
          name: `${user.first_name} ${user.last_name}`.trim(),
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          previlegeLevel: user.privilege,
          addingDate: user?.created_at ? user.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          lastEdited: user?.updated_at ? user.updated_at.split('T')[0] : new Date().toISOString().split('T')[0],          
        }));
        setAdminAccounts(displayData); 
      }else {
        setError(response?.message || 'Failed to fetch admins');
      }

    } catch (error) {
      setError('An error occurred while fetching admins');
      console.error("Failed to fetch admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
          Admins
          <p className="text-[20px] font-roboto-light">Where you manage your system admins</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <AccountList title="Admin" accountsData={adminAccounts} onChange={fetchUsers}/>
        </div>
      </div>
    </div>
  );
};

export default UserPage;