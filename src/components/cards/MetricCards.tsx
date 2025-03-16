"use client";

import { ArrowUpRight } from "lucide-react";
import { Circle } from "rc-progress";

interface MetricCardsProps {
  title: string;
  value: string | number;
  unit?: string;
  percentage: number;  
  iconColor: string;
}

const MetricCards: React.FC<MetricCardsProps> = ({ title, value, unit, percentage, iconColor }) => {
  return (
    <div className="bg-[#2E2E2E] p-4 rounded-xl border border-gray-700 flex items-center gap-4 shadow-lg w-full">
      <div className="relative w-12 h-12">
        <Circle 
          percent={percentage} 
          strokeWidth={6} 
          strokeColor={iconColor} 
          trailColor="#333"
        />
        <ArrowUpRight className="absolute inset-0 m-auto text-white w-5 h-5" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-white text-xl font-semibold">
          {value} {unit}
        </h2>
      </div>
    </div>
  );
};

export default MetricCards;
