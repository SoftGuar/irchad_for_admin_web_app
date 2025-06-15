"use client";

import UserHeaderBar from "@/components/cards/UserHeaderBar";
import UserInfoCard from "@/components/cards/UserInfoCard";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import { useState, useEffect } from "react";
import { getProfile, editProfile } from "@/services/UserManagementService";
import { getHistory } from "@/services/UserManagementService";
import Image from "next/image";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState({ 
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    joinedAt: '',
    avatar: '',
    role: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const getPersonalInfos = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        if (response.success) {
          const user = response.data;
          setUser({ 
            id: user.id.toString(), 
            userName: `${user.first_name} ${user.last_name}`.trim(), 
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            joinedAt: user.created_at.split("T")[0],
            avatar: "/images/ProfilePic.png",
            role: localStorage.getItem("role") || "admin",
          });
        } else {
          setError(response?.message || "Failed to get personal information.");
        }
      } catch (error) {
        setError("An error occurred while retrieving personal information.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPersonalInfos();
  }, []);

  useEffect(() => {
    const fetchActivityHistory = async () => {
      try {
        setLoading(true);
        const response = await getHistory();
        if (response.success) {
          setActivities(response.data);
        } else {
          setError("Failed to fetch activity history.");
        }
      } catch (error) {
        setError("An error occurred while retrieving activity history.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivityHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-irchad-orange"></div>
      </div>
    );
  }

  const onSave = async () => {
    try {
      setLoading(true);
      const payload = {
        first_name: user.firstName,
        last_name: user.lastName,
        phone: user.phone,
        email: user.email,
      };
      const response = await editProfile(payload);
      if (response.success) {
        setLoading(false);
        setIsEditing(false);
      } else {
        setLoading(false);
        setIsEditing(false);
        setError("Failed to save profile.");
      }
    } catch (error) {
      setError("Failed to save profile.");
      console.error(error);
    }
  };

  return (
    <div className="p-0">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg" alt="header" width={1663} height={236} />
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Profile
          <p className="text-[20px] font-roboto-light">
            Where you manage your profile
          </p>
        </div>
      </div>

      <UserHeaderBar user={user} onEdit={() => setIsEditing(true)} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 px-7">
        <div className="lg:col-span-2">
          <UserInfoCard
            user={user}
            isEditing={isEditing}
            onSave={onSave}
            setUser={setUser}
          />
        </div>
        <ActivityHistoryCard
          title="Activity History"
          activities={activities}
        />
      </div>

      {error && (
        <p className="w-1/2 text-center mt-4 text-sm text-red-500 bg-red-100 bg-opacity-10 border border-red-500 px-4 py-2 rounded-lg animate-shake">
          {error}
        </p>
      )}

    </div>
  );
};

export default UserPage;
