import UserHeaderBar from "@/components/cards/UserHeaderBar";
import UserInfoCard from "@/components/cards/UserInfoCard";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";


const user = {
  userName: "Remache Islam",
  firstName:"Islam",
  lastName:"Remache",
  email: "isalmrmh@gmail.com",
  phone: "+213 555 123 456",
  id: "0B26ECBAXD78CCVX12V",
  privilegeLvl: 2,
  avatar: "/images/ProfilePic.png",
  role: "commercial",
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
};


const UserPage = () => {
    return (
      <div className="p-0">
        <div className="w-full rounded-lg">
          <img src="/images/headers/commercials_header.svg" />
        </div>

      <UserHeaderBar user={user} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <UserInfoCard user={user} />
        </div>
        <ActivityHistoryCard title="Activity History" activities={user.activities} />
      </div>
    </div>
    )
  }
  
  export default UserPage
  