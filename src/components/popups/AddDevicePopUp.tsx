"use client";

import { useState } from "react";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"; // Using Heroicons

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeviceModal({ isOpen, onClose }: DeviceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1E1E1E] text-white p-6 rounded-lg shadow-lg w-[400px] relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-red-500" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Device</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm mb-1">Type</label>
            <input type="text" className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none" />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">MAC Address</label>
            <input type="text" className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none" />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Status</label>
            <input type="text" className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none" />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Image</label>
            <div className="flex items-center bg-[#2E2E2E] p-3 rounded-lg">
              <input type="file" className="w-full bg-transparent text-white outline-none" />
              <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 ml-2" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#FF8B00] p-3 rounded-lg font-semibold text-black">
            Add Device
          </button>
        </form>
      </div>
    </div>
  );
}
