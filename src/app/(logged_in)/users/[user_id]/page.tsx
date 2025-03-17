"use client";
import UserHeaderBar from "@/components/cards/UserHeaderBar";
import UserInfoCard from "@/components/cards/UserInfoCard";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import ItemsList from "@/components/cards/ItemsList";
import { useState } from "react";
import DeviceInfoCard from "@/components/cards/UserDeviceInfoCard";
import EnvironmentCard from "@/components/cards/EnvironmentCard";
import Image from "next/image";

const UserPage = () => {

  const [user, setUser] = useState(
    {
      userName: "Remache Islam",
      firstName:"Islam",
      lastName:"Remache",
      email: "isalmrmh@gmail.com",
      phone: "+213 555 123 456",
      id: "0B26ECBAXD78CCVX12V",
      privilegeLvl: 2,
      avatar: "/images/ProfilePic.png",
      role: "user",
      status:"Active",
      accountState:"Active",
      joinedAt:"2025-03-09",
      deviceId: "AV983NF0938FDHRAAC",
      activities: [
        { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
        { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
        { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
        { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
      ],
      EmergencyContacts :[
        {name:"Ahmed Kada", phoneNumber:"+213 735 64 46 32"},
        {name:"Aissa Saouli", phoneNumber:"+213 735 64 46 32"},
      ]
    }
  )

  const ContactsItems = user.EmergencyContacts.map(contact => ({
    title: contact.name,
    description: `Phone Number: ${contact.phoneNumber}`
  }));

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal");
  
  function showDevice(n:string){
    setActiveTab(n)
  }


  const device = {
    "deviceData": {
      "id": "FTDSYGYGyqf34ry348r43guy",
      "prefGuidanceMode": "Voice",
      "status": "Connected",
      "lastKnownLocation": "ESI, Oued Smar",
      "vibrationSensitivity": "Low",
      "batteryLvl": "80%",
      "softwareVer": "4.2"
    },
    "navigationHistory": [
      {
        "message": "Device #AYGDYW32 is down!",
        "timestamp": "2025-03-11 10:30 AM"
      },
      {
        "message": "New order #9744152",
        "timestamp": "2025-03-10 03:15 PM"
      },
      {
        "message": "New user added by admin",
        "timestamp": "2025-03-09 06:45 PM"
      },
      {
        "message": "Device added",
        "timestamp": "2025-02-20 06:45 PM"
      }
    ],
    "reportedIssuesAndErrors": [
      {
        "title": "Problem1",
        "description": "gwgfiwh3rfhngorwfcbsqfuyrwe"
      },
      {
        "title": "Problem1",
        "description": "gwgfiwh3rfhngorwfcbsqfuyrwe"
      }
    ],
    "environments": [
      {
        "image":"/images/indoorMap.png",
        "name": "ESI indoor",
        "description": "gwgfiwh3rfhngorwfcbsqfuyrwe",
        "favoriteRoutes": [
          "Cyber - Door",
          "Library - Cyber"
        ],
        "favoritePOIs": [
          "Cyber",
          "Library"
        ]
      },
      {
       "image":"/images/indoorMap.png",
        "name": "ESI indoor",
        "description": "gwgfiwh3rfhngorwfcbsqfuyrwe",
        "favoriteRoutes": [
          "Cyber - Door",
          "Library - Cyber"
        ],
        "favoritePOIs": [
          "Cyber",
          "Library"
        ]
      }
    ]
  }
  

    return (
      <div className="p-0">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Users
          <p className="text-[20px] font-roboto-light">Where you manage your system users</p>
        </div>
      </div>

      <UserHeaderBar user={user} onEdit={() => setIsEditing(true)} showDevice={(tab) => setActiveTab(tab)} />
      {activeTab === "personal" ?
      <div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 px-7">
            <div className="lg:col-span-2">
              <UserInfoCard user={user} isEditing={isEditing} onSave={() => setIsEditing(false)} setUser={setUser} />
            </div>
            <ActivityHistoryCard title="Activity History" activities={user.activities} />
          </div>
          <ItemsList title="Emergency Contacts" items={ContactsItems}/>
    </div>
    : 
        <div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 px-7">
          <div className="lg:col-span-2">
            <DeviceInfoCard device={device.deviceData} />
          </div>
          <ActivityHistoryCard title="Navigation History" activities={device.navigationHistory} />
        </div>
        <ItemsList title="Reported Issues and Errors" items={device.reportedIssuesAndErrors}/>
        <div className="bg-[#2E2E2E] p-6 mx-6 rounded-md  flex flex-col gap-4 mb-4">
        <h2 className="text-lg font-semibold text-white">Environments</h2>
              {device.environments.map(({image, name, description, favoriteRoutes, favoritePOIs}, index) => (
                <EnvironmentCard 
                  key={name + index} 
                  image={image} 
                  title={name} 
                  description={description} 
                  routes={favoriteRoutes} 
                  pois={favoritePOIs} 
                />
              ))}
        </div>
    </div>
      }
    </div>
    )
  }
  
  export default UserPage
  