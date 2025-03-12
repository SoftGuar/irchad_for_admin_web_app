"use client";
import MetricCards from "@/components/cards/MetricCards";
import SalesChart from "@/components/cards/SalesCostChart";
import NotificationList from "@/components/cards/NotificationList"; // Import NotificationList
import Image from "next/image";

// Define the card data type
interface CardData {
  title: string;
  value: number | string;
  unit?: string;
  percentage: number;
  iconColor: string;
}

// Sample Data for Metric Cards
const cardData: CardData[] = [
  { title: "Total Sales", value: "185K", unit: "D.A", percentage: 75, iconColor: "#f97316" }, // Orange
  { title: "Total Cost", value: "120K", unit: "D.A", percentage: 60, iconColor: "#0ea5e9" }, // Blue
  { title: "Total Users", value: "100K", percentage: 60, iconColor: "#facc15" }, // Yellow
  { title: "Total Devices", value: 12, unit: "Device", percentage: 85, iconColor: "#3b82f6" }, // Blue
  { title: "Warnings", value: 2, percentage: 40, iconColor: "#ef4444" }, // Red
];

// Sample Data for the Chart
const chartData = [
  { month: "Jan", sales: 90, cost: 70 },
  { month: "Feb", sales: 85, cost: 65 },
  { month: "Mar", sales: 95, cost: 75 },
  { month: "Apr", sales: 88, cost: 68 },
  { month: "May", sales: 92, cost: 72 },
  { month: "Jun", sales: 87, cost: 67 },
  { month: "Jul", sales: 94, cost: 74 },
  { month: "Aug", sales: 96, cost: 76 },
];
const notifications = [
  { message: "Device #AGYDGYW32 is down!", time: "11 JUL 8:10 PM" },
  { message: "New order #8744152", time: "11 JUL 11 PM" },
  { message: 'User "Aouinine Lylia" needs help', time: "11 JUL 7:54 PM" },
  { message: 'New user added by admin "Djedjig Nada"', time: "11 JUL 1:21 AM" },
  { message: "Device added", time: "11 JUL 4:50 AM" },
];

export default function Dashboard() {
  return (
    <div className="relative min-h-screen text-white bg-black w-full overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
        <Image
          src="/images/login_image.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Devices</h1>
          <p className="text-lg drop-shadow-md">Where you manage your devices</p>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-0 w-full mt-60">
        <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {cardData.map((card, index) => (
              <MetricCards key={index} {...card} />
            ))}
          </div>

          {/* Sales Chart & Notifications Container */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Notification Panel (Left) */}
            <div className="w-full lg:w-1/3 bg-[#2E2E2E] p-6 rounded-xl shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Notifications</h2>
              <NotificationList notifications={notifications} />
            </div>

            {/* Sales & Cost Chart (Right) */}
            <div className="w-full lg:w-2/3 bg-[#2E2E2E] p-6 rounded-xl shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Sales & Cost Chart</h2>
              <SalesChart data={chartData} />
            </div>
          </div>
        </div>
        </div>
      </div>
    
  );
}
 

            {/* Sales & Cost Chart (Right) */}
      