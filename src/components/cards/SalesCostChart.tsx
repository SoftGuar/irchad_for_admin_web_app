import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define the data type
interface ChartData {
  month: string;
  sales: number;
  cost: number;
}

// Props interface
interface SalesCostChartProps {
  data: ChartData[];
}

export default function SalesCostChart({ data }: SalesCostChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="month" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="cost" stroke="#0ea5e9" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
