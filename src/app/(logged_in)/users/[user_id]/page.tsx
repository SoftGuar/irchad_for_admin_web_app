"use client";
import UserHeaderBar from "@/components/cards/UserHeaderBar";
import UserInfoCard from "@/components/cards/UserInfoCard";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import ItemsList from "@/components/cards/ItemsList";
import { useState, useEffect } from "react";
import DeviceInfoCard from "@/components/cards/UserDeviceInfoCard";
import EnvironmentCard from "@/components/cards/EnvironmentCard";
import Image from "next/image";
import { getUserById } from "@/services/UserManagementService";
import { useParams } from "next/navigation";
import { editUser } from "@/services/UserManagementService";
import { getHelperRecommandations } from "@/services/AssistanceService";

const UserPage = () => {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)
  const [HelperRecommandations, setHelperRecommandations] = useState<any>([])
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
  const [activeTab, setActiveTab] = useState("personal");


    const getPersonalInfos = async () => {
      try {
        const response = await getUserById("user", String(user_id)); 
        if(response.success){
          const helpers = await getHelperRecommandations();
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
            role: "user",
            
          };
          setUser(userData); 
          setHelperRecommandations(helpers.data)
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

  


  useEffect(() => {
    getPersonalInfos();
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
          const payload: Record<string, any> = {
            first_name: user.firstName,
            last_name: user.lastName,
            phone: user.phone,
            email: user.email
          };

          setLoading(true);
         
          const response = await editUser("user", user.id, payload);
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



  const  activities = [
    { action: "Logged in", createdAt: "2025-03-11 10:30 AM" },
    { action: "Updated profile information", createdAt: "2025-03-10 03:15 PM" },
    { action: "Changed password", createdAt: "2025-03-09 06:45 PM" },
    { action: "Updated profile information", createdAt: "2025-02-20 06:45 PM" },
  ]



  const ContactsItems = HelperRecommandations
  .filter((contact:{ id: any; first_name: any; last_name: any; phone: any; email: any; status: any; user_id: any }) => contact.user_id == user.id)
  .map((contact: { id: any; first_name: any; last_name: any; phone: any; email: any; status: any }) => ({
    id: contact.id,
    title: contact.first_name + " " + contact.last_name,
    description: `Email: ${contact.email}     |     Phone Number: ${contact.phone}`,
    Status: contact.status
  }));

  
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
        "action": "Device #AYGDYW32 is down!",
        "createdAt": "2025-03-11 10:30 AM"
      },
      {
        "action": "New order #9744152",
        "createdAt": "2025-03-10 03:15 PM"
      },
      {
        "action": "New user added by admin",
        "createdAt": "2025-03-09 06:45 PM"
      },
      {
        "action": "Device added",
        "createdAt": "2025-02-20 06:45 PM"
      }
    ],
    "reportedIssuesAndErrors": [
      {
        "id":"1",
        "Status":"on",
        "title": "Problem1",
        "description": "gwgfiwh3rfhngorwfcbsqfuyrwe"
      },
      {
        "id":"2",
        "Status":"on",
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
              <UserInfoCard user={user} isEditing={isEditing} onSave={onSave} setUser={setUser} />
            </div>
            <ActivityHistoryCard title="Activity History" activities={activities} />
          </div>
          {error && 
              <p className='w-1/2 text-center mt-4 text-sm text-red-500 bg-red-100 bg-opacity-10 border border-red-500 px-4 py-2 rounded-lg animate-shake'>
                {error}
              </p>
              }
          <ItemsList title="Emergency Contacts" items={ContactsItems} onChange={getPersonalInfos}/>
    </div>
    : 
        <div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 px-7">
          <div className="lg:col-span-2">
            <DeviceInfoCard device={device.deviceData} />
          </div>
          <ActivityHistoryCard title="Navigation History" activities={device.navigationHistory} />
        </div>
        <ItemsList title="Reported Issues and Errors" items={device.reportedIssuesAndErrors} onChange={getPersonalInfos}/>
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
  