import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard"



  const notifications = [
    { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
    { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
    { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
    { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },



  ];



const NotificationsPage = () => {
    return (
      <div className="p-0">
         <div className="w-full rounded-lg">
          <img src="/images/headers/notifications_header.svg" />
        </div>

        <div className="w-full ml-8 mt-8">
        <ActivityHistoryCard title="Notifictions" activities={notifications} />

        </div>
      </div>
    )
  }
  
  export default NotificationsPage
  