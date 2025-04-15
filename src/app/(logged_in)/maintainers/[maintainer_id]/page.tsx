"use client";
import UserHeaderBar from "@/components/cards/UserHeaderBar";
import UserInfoCard from "@/components/cards/UserInfoCard";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/UserManagementService";
import { useParams } from "next/navigation";
import { editUser } from "@/services/UserManagementService";
import Image from "next/image";

const UserPage = () => {
  const { maintainer_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)
  const [user, setUser] = useState(
    {
      id: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      joinedAt: '', 
      avatar: '',
      role: '',
    }
  )

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const getPersonalInfos = async () => {
      try {
        const response = await getUserById("maintainer", String(maintainer_id)); 
        if(response.success){
          const user = response.data;
          const userData = {
            id: user.id.toString(),
            userName: `${user.first_name} ${user.last_name}`.trim(),
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            joinedAt: new Date().toISOString().split('T')[0], 
            avatar: "/images/ProfilePic.png",
            role: "maintainer",
            
          };
          setUser(userData); 
        }else {
          setError('Failed to get personal informations');
        }

      } catch (error) {
        setError('An error occurred while getting personal informations.');
        console.error("Failed to get personal informations:", error);
      } finally {
        setLoading(false);
      }
    };

    getPersonalInfos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-irchad-orange"></div>
      </div>
    );
  }

  const  activities = [
    { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
    { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
    { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
    { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
  ]


      const onSave = async () => {
        try {
          const payload: Record<string, any> = {
            first_name: user.firstName,
            last_name: user.lastName,
            phone: user.phone,
            email: user.email
          };

          setLoading(true);
         
          const response = await editUser(user.role, user.id, payload);
          if (response.success){
            setLoading(false);
            setIsEditing(false);
          }else{
            setLoading(false);
            setIsEditing(false);
            setError('Failed to save changes')
          }

        } catch (error) {
          setError('Failed to save changes')
          console.error('Failed to save changes: ', error);
        }
      };


    return (
      <div className="p-0">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Maintainers
          <p className="text-[20px] font-roboto-light">Where you manage your system maintainers</p>
        </div>
      </div>

      <UserHeaderBar user={user} onEdit={() => setIsEditing(true)} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 px-7">
        <div className="lg:col-span-2">
          <UserInfoCard user={user} isEditing={isEditing} onSave={onSave} setUser={setUser} />
        </div>
        <ActivityHistoryCard title="Activity History" activities={activities} />
      </div>
      {error && 
              <p className='w-1/2 text-center mt-4 text-sm text-red-500 bg-red-100 bg-opacity-10 border border-red-500 px-4 py-2 rounded-lg animate-shake'>
                {error}
              </p>
              }
    </div>
    )
  }
  
  export default UserPage
  