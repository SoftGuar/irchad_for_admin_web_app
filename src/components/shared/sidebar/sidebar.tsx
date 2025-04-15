"use client"; // Ensure this is a Client Component

import { useState } from "react";
import { ChevronDown, ChevronRight, Users, LayoutGrid, Settings, MapPin, Repeat } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedMain, setSelectedMain] = useState("dashboard"); 
 
  const handleSubmenuClick = (item: string) => {
    setSelectedItem(item);
    setSelectedMain("accounts");  
  };
  
  const handleMainClick = (item: string) => {
    setSelectedItem(item);
    setSelectedMain(item);
    setIsAccountsOpen(false);
  };

  return (
    <div
      className="w-64 min-h-screen p-4"
      style={{
        backgroundColor: "#2E2E2E",
        borderTop: "1px solid #959595",
      }}
    >
      {/* Navigation */}
      <nav className="mt-6 space-y-2">
        {/* Home Section */}
        <Link
          href="/"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            selectedMain === "dashboard" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("dashboard")}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        {/* Pages Section */}
        <h3 className="text-gray-400 text-sm mt-4">Pages</h3>

        {/* Accounts Dropdown */}
        <button
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
            selectedMain === "accounts" ? "bg-[#FF8B00]/[0.64]" : "hover:bg-gray-700"
          }`}
          onClick={() => {
            setIsAccountsOpen(!isAccountsOpen);
            setSelectedMain("accounts"); // Set "Accounts" as active
          }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>Accounts</span>
          </div>
          {isAccountsOpen ? <ChevronDown /> : <ChevronRight />}
        </button>

        {/* Sub-menu */}
        {isAccountsOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {["users", "admins", "maintainers", "helpers", "commercials", "decision-makers"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`flex items-center gap-2 px-2 py-1 text-sm rounded-md ${
                  selectedItem === item ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
                }`}
                onClick={() => handleSubmenuClick(item)}
              >
                <span className="text-lg">•</span> {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        )}

        {/* Devices Section */}
        <Link
          href="/devices"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedMain === "devices" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("devices")}
        >
          <Settings className="w-5 h-5" />
          <span>Devices</span>
        </Link>

        {/* Environments Section */}
        <Link
          href="/environments"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedMain === "environments" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("environments")}
        >
          <MapPin className="w-5 h-5" />
          <span>Environments</span>
        </Link>

          {/* Transactions Section */}
          <Link
          href="/transactions"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedMain === "transactions" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("transactions")}
        >
          <Repeat className="w-5 h-5" />
          <span>Transactions</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
