"use client"; // Ensure this is a Client Component

import { useState } from "react";
import { ChevronDown, ChevronRight, Users, LayoutGrid, Settings, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [isAccountsOpen, setIsAccountsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("users");
  const [selectedMain, setSelectedMain] = useState("accounts"); // Track the selected main menu item

 
  const handleSubmenuClick = (item: string) => {
    setSelectedItem(item);
    setSelectedMain("accounts");  
  };

  
  const handleMainClick = (item: string) => {
    setSelectedItem(item);
    setSelectedMain(item);
    setIsAccountsOpen(false); // Close accounts submenu when clicking a new main menu item
  };

  return (
    <div
      className="w-64 h-screen p-4"
      style={{
        backgroundColor: "#2E2E2E",
        boxShadow: "8px 0 32px 0 rgba(0, 0, 6, 1)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

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
            {["users", "admins", "maintenance", "commercial", "decision-makers"].map((item) => (
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
      </nav>
    </div>
  );
};

export default Sidebar;
