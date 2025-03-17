import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard"
import Image from "next/image";

  const notifications = [
    { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
    { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
    { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
    { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
  ];

const NotificationsPage = () => {
    return (
      <div className="flex flex-col w-full p-0">
        <div className="flex relative w-full">
          <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
          <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
            Notifications
            <p className="text-[20px] font-roboto-light">Receive latest updates</p>
          </div>
        </div>

        <div className="flex w-full justify-center items-center mt-8">
          <div className="flex w-[90%]">
            <ActivityHistoryCard title="Notifictions" activities={notifications} />
          </div>
        </div>
      </div>
    )
  }
  
  export default NotificationsPage
  