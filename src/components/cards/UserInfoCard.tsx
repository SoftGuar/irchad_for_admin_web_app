"use client";
import React, { useState, useEffect } from "react";

interface UserInfoCardProps {
    user: {
      userName: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      id: string;
      privilegeLvl: number;
      avatar: string;
      role: string;
      joinedAt: string;
      accountState: string;
      deviceId: string;
    };
  }
  
  const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
    const [userSinceLabel, setUserSinceLabel] = useState("User since:");

    useEffect(() => {
      switch (user.role) {
        case "admin":
          setUserSinceLabel("Admin");
          break;
        case "maintainer":
          setUserSinceLabel("Maintainer");
          break;
        case "commercial":
          setUserSinceLabel("Commercial");
          break;
        case "decisionmaker":
          setUserSinceLabel("Desicion Maker");
          break;
        case "helper":
          setUserSinceLabel("Helper");
          break;
        default:
          setUserSinceLabel("User");
          break;
      }
    }, []);


    return (
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white">

        <ul className="space-y-3 pl-16">
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">Username:</span> {user.userName}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">E-mail address:</span> {user.email}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">Phone number:</span> {user.phone}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">First name:</span> {user.firstName}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">Last name:</span> {user.lastName}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">{userSinceLabel} since:</span> {user.joinedAt}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">{userSinceLabel} ID:</span> {user.id}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">Account state:</span> {user.accountState}</li>
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">Privilege level:</span> {user.privilegeLvl}</li>
          {user.role === "user" ? (
          <li className="flex"><span className="text-white text-lg font-semibold min-w-[180px]">Device ID:</span> {user.deviceId}</li>
        ) : null}
        </ul>
      </div>
    );
  };
  
  export default UserInfoCard;