"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Using Heroicons

interface AttachUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceId: string; // Pass the device ID dynamically
}

export default function AttachUserModal({ isOpen, onClose, deviceId }: AttachUserModalProps) {
  const [userId, setUserId] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1E1E1E] text-white p-6 rounded-lg shadow-lg w-[400px] relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-red-500" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Attach user to device</h2>
        <p className="text-gray-400 mb-4">{deviceId}</p>

        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(`Attaching User ID: ${userId} to Device: ${deviceId}`);
          // Handle submission logic here
        }}>
          <div className="mb-4">
            <label className="block text-sm mb-1">UserID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-[#FF8B00] p-3 rounded-lg font-semibold text-black">
            Attach
          </button>
        </form>
      </div>
    </div>
  );
}
