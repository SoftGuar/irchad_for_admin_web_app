"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isBetween);
dayjs.extend(relativeTime);

interface ActivityHistoryProps {
  title: string;
  activities: { action: string; createdAt: string }[];
}

const ActivityHistoryCard: React.FC<ActivityHistoryProps> = ({
  title,
  activities,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Time");

  const filterOptions = ["Today", "This Week", "This Month", "All Time"];

  const getFilteredActivities = () => {
    const now = dayjs();

    return activities.filter((activity) => {
      const activityDate = dayjs(activity.createdAt);

      switch (selectedFilter) {
        case "Today":
          return activityDate.isSame(now, "day");

        case "This Week":
          return activityDate.isBetween(now.startOf("week"), now.endOf("week"));

        case "This Month":
          return activityDate.isBetween(now.startOf("month"), now.endOf("month"));

        case "All Time":
        default:
          return true;
      }
    });
  };

  return (
    <div className="bg-irchad-gray lg:col-span-2 p-6 rounded-lg w-full shadow-md text-[#D3D3D3] max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        <div className="relative mb-4">
          <div
            className="bg-irchad-gray text-irchad-white text-sm outline-none cursor-pointer px-4 py-2 rounded-md border border-[#444] hover:bg-[#3A3A3A] flex items-center justify-between w-40"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedFilter}
            <ChevronDown size={16} className="text-irchad-white ml-2" />
          </div>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-irchad-gray rounded-md shadow-lg border border-[#444]">
              {filterOptions.map((option, index) => (
                <div
                    key={index}
                    className="text-gray-50 px-4 py-2 hover:bg-[#3A3A3A] cursor-pointer"
                    onClick={() => {
                    setSelectedFilter(option);
                    setIsOpen(false);
                    }}>
                    {option}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      <div className="relative w-3/4">
        <div className="absolute left-5 top-1 h-full w-[1px] bg-[#959595]"></div>

        <ul className="space-y-4 pl-6">
          {getFilteredActivities().map((activity, index) => (
            <li key={index} className="relative flex items-center gap-4">
              <div className="w-4 h-4 bg-irchad-gray border-2 border-orange-500 rounded-full absolute top-1 left-[-12px] "></div>

              <div className="border-l-4 border-transparent pl-4">
                <p className="font-semibold">{activity.action}</p>
                {/* Format the timestamp nicely */}
                <span className="text-[#959595] text-sm">
                    {dayjs(activity.createdAt).format("MMMM D, YYYY, hh:mm a")} {/* or .fromNow()*/}
                </span>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default ActivityHistoryCard;
