 
import MetricCards from "@/components/cards/MetricCards";
import SalesCostChart from "@/components/cards/SalesCostChart";

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

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardData.map((card, index) => (
          <MetricCards key={index} {...card} />
        ))}
      </div>

      {/* Sales & Cost Chart */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Sales & Cost</h2>
        <SalesCostChart data={chartData} />
      </div>
    </div>
  );
}
