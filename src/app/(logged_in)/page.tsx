"use client";
import { useEffect, useState } from "react";
import MetricCards from "@/components/cards/MetricCards";
import SalesChart from "@/components/cards/SalesCostChart";
import Image from "next/image";
import {
  fetchTotalSales,
  fetchRevenueData,
  fetchTotalDevices,
  fetchTotalUsers,
  fetchWarnings
} from "@/services/deviceApi";

interface CardData {
  title: string;
  value: number | string;
  unit?: string;
  percentage: number;
  iconColor: string;
}

interface RevenueData {
  sale_period: string;
  devices_sold: number;
  total_revenue: number;
  avg_device_price: number;
}

export default function Dashboard() {
  const [cardData, setCardData] = useState<CardData[]>([
    { title: "Total Sales", value: "Loading...", unit: "", percentage: 0, iconColor: "#f97316" },
    { title: "Total Cost", value: "120", unit: "D.A", percentage: 60, iconColor: "#0ea5e9" },
    { title: "Total Users", value: "Loading...", percentage: 0, iconColor: "#facc15" },
    { title: "Total Devices", value: "Loading...", unit: "Device", percentage: 0, iconColor: "#3b82f6" },
    { title: "Warnings", value: "Loading...", percentage: 0, iconColor: "#ef4444" },
  ]);

  const [chartData, setChartData] = useState<{ month: string; sales: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [
        salesResult,
        revenueResult,
        devicesResult,
        usersResult,
        warningsResult
      ] = await Promise.allSettled([
        fetchTotalSales(),
        fetchRevenueData(),
        fetchTotalDevices(),
        fetchTotalUsers(),
        fetchWarnings()
      ]);

      const salesData = salesResult.status === "fulfilled" ? salesResult.value : [];
      const revenueData = revenueResult.status === "fulfilled" ? revenueResult.value : [];
      const devicesData = devicesResult.status === "fulfilled" ? devicesResult.value : { total_devices: 0 };
      const usersData = usersResult.status === "fulfilled" ? usersResult.value : { total_users: 0 };
      const warningsData = warningsResult.status === "fulfilled" ? warningsResult.value : [];

      // Process revenue data for chart
      if (Array.isArray(revenueData)) {
        const processedChartData = revenueData
          .filter((item: RevenueData) => item.sale_period !== "Total")
          .map((item: RevenueData) => ({
            month: new Date(item.sale_period).toLocaleString("default", { month: "short" }),
            sales: item.total_revenue,
          }));
        setChartData(processedChartData);
      }

      // Process Warnings
      let latestMonth = "";
      let totalWarnings = 0;
      if (Array.isArray(warningsData)) {
        warningsData.forEach((warning: { month: string; issue_count: number }) => {
          if (warning.month > latestMonth) {
            latestMonth = warning.month;
            totalWarnings = warning.issue_count;
          } else if (warning.month === latestMonth) {
            totalWarnings += warning.issue_count;
          }
        });
      }

      // Update card data
      setCardData(prev =>
        prev.map(card => {
          if (card.title === "Total Sales" && Array.isArray(salesData) && salesData.length > 0) {
            return {
              ...card,
              value: `${salesData[0]?.total_revenue ?? 0} D.A`,
              percentage: (salesData[0]?.total_revenue ?? 0) / 250 * 100
            };
          }
          if (card.title === "Warnings") {
            return {
              ...card,
              value: totalWarnings,
              percentage: (totalWarnings / 10) * 100
            };
          }
          if (card.title === "Total Devices") {
            return {
              ...card,
              value: devicesData.total_devices,
              percentage: (devicesData.total_devices / 20) * 100
            };
          }
          if (card.title === "Total Users") {
            return {
              ...card,
              value: usersData.total_users,
              percentage: (usersData.total_users / 150000) * 100
            };
          }
          return card;
        })
      );
    }

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-irchad-gray-dark w-full overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute h-1/4 w-full rounded-b-lg overflow-hidden">
        <Image
          src="/images/headers/header.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Hello Admin!</h1>
          <p className="text-lg drop-shadow-md">Discover what's new in Irchad</p>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-0 w-full mt-40">
        <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cardData.map((card, index) => (
              <MetricCards key={index} {...card} />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="w-full lg:w-2/3 bg-[#2E2E2E] p-6 rounded-xl shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Sales & Cost Chart</h2>
              <SalesChart data={chartData} />
            </div>

            <div className="w-full lg:w-1/3 bg-[#2E2E2E] p-6 rounded-xl shadow-lg">
              <h2 className="text-white text-lg font-semibold mb-4">Notifications</h2>
              {/* <NotificationList notifications={notifications} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
