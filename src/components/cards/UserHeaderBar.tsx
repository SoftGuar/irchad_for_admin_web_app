"use client";

import { AiTwotoneEdit } from "react-icons/ai";
import { useState } from "react";

interface UserHeaderBarProps {
  user: {
    userName: string;
    avatar: string;
    role: string;
  };
  onEdit: () => void;
  showDevice?: (tab: string) => void;
}

const UserHeaderBar: React.FC<UserHeaderBarProps> = ({
  user,
  onEdit,
  showDevice = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<"personal" | "device">("personal");

  return (
    <div className="relative flex items-center bg-[#2E2E2E] mx-8 my-8 px-12 py-2 rounded-lg shadow-md">
      <div className="relative -translate-y-5">
        <img
          src={user.avatar && user.avatar.trim() !== '' ? user.avatar : "/images/ProfilePic.png"}
          alt={`${user.userName} profile picture`}
          className="w-20 h-20 rounded-full border-2 border-secondary_color object-cover"
        />
      </div>

      <div className="ml-8">
        <h3 className="text-lg font-semibold">{user.userName}</h3>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <AiTwotoneEdit className="text-gray-100 cursor-pointer" size={18} onClick={onEdit} />

        <button
          className={`px-4 py-2 rounded-full underline underline-offset-2 ${
            activeTab === "personal" ? "bg-[#7D511F] text-gray-50" : "bg-transparent text-gray-50"
          }`}
          onClick={() => {
            setActiveTab("personal");

            showDevice("personal");

          }}>
          Personal Information
        </button>

        {/*{user.role === "user" ? (
          <button
            className={`px-4 py-2 rounded-full underline underline-offset-2 ${
              activeTab === "device" ? "bg-[#7D511F] text-gray-50" : "bg-transparent text-gray-50"
            }`}
            onClick={() => {
              setActiveTab("device");

              showDevice("device");

            }}>
            Device
          </button>
        ) : null}*/}
      </div>
    </div>
  );
};

export default UserHeaderBar;
