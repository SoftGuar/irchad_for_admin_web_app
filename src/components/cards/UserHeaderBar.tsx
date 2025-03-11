"use client";
import { AiTwotoneEdit } from "react-icons/ai";
import { useState } from "react";

interface UserHeaderBarProps {
  user: {
    userName: string;
    avatar: string;
    role: string;
    status: string;
  };
}

const UserHeaderBar: React.FC<UserHeaderBarProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<"personal" | "device">("personal");

  return (
    <div className="relative flex items-center bg-[#2E2E2E] mx-8 my-8 px-12 py-2 rounded-lg shadow-md text-[]">
      <div className="relative -translate-y-5">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-secondary_color"
        />
        {user.status === "Active" && (
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2E2E2E]" />
        )}
      </div>

      <div className="ml-8">
        <h3 className="text-lg font-semibold">{user.userName}</h3>
        <p className="text-sm text-[#D1D5DB]">{user.status}</p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <AiTwotoneEdit className="text-white cursor-pointer" size={18} />

        {/* Personal Information Button */}
        <button
          className={`px-4 py-2 rounded-full underline underline-offset-2 ${
            activeTab === "personal" ? "bg-[#7D511F] text-white" : "bg-transparent text-white"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Information
        </button>

        {/* Device Button (Only for users) */}
        {user.role === "user" ? (
          <button
            className={`px-4 py-2 rounded-full underline underline-offset-2 ${
              activeTab === "device" ? "bg-[#7D511F] text-white" : "bg-transparent text-white"
            }`}
            onClick={() => setActiveTab("device")}
          >
            Device
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserHeaderBar;
