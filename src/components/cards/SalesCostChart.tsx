
"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface SalesChartProps {
  data: { month: string; [key: string]: number | string }[];
}

export default function SalesChart({ data }: SalesChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-white">No data available</p>;
  }
  // Extract all keys except the X-axis key (assuming the first key is the category like "month")
  const keys = Object.keys(data[0]).filter((key) => key !== "month");
  
  return (
    <div className="p-5 rounded-lg text-white h-full w-full bg-transparent">
      <h2>Sales vs Cost</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="month" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#666' }} />
            {keys.map((key, index) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={index % 2 === 0 ? "orange" : "cyan"} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}