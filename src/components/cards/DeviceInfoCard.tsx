"use client";
import { useState } from "react";
import { DeviceData } from "./types";
import AttachUserPopup from "../popups/AttachUserPopUp";
import { Pen, Save } from "lucide-react";

interface Props {
  data: DeviceData;
}

const DeviceInfo: React.FC<Props> = ({ data }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<DeviceData>({ ...data });

  const handleInputChange = (field: keyof DeviceData, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", editedData);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#2E2E2E] p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Device Info</h2>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Save className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Pen className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-3 text-white">
        <p className="font-semibold">Device ID</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.deviceId}
            onChange={(e) => handleInputChange("deviceId", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.deviceId}</p>
        )}

        <p className="font-semibold">Type</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.type}</p>
        )}

        <p className="font-semibold">MAC Address</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.mac}
            onChange={(e) => handleInputChange("mac", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.mac}</p>
        )}

        <p className="font-semibold">Device Status</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.status}</p>
        )}

        <p className="font-semibold">Activation Date</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.activationDate}
            onChange={(e) => handleInputChange("activationDate", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.activationDate}</p>
        )}

        <p className="font-semibold">Assigned User</p>
        {data.assignedUser ? (
          isEditing ? (
            <input
              type="text"
              value={editedData.assignedUser || ""}
              onChange={(e) => handleInputChange("assignedUser", e.target.value)}
              className="bg-transparent border-b border-white"
            />
          ) : (
            <p>{data.assignedUser}</p>
          )
        ) : (
          <button
            className="bg-orange-500 text-white px-4 py-1 rounded-lg"
            onClick={() => setPopupOpen(true)}
          >
            Attach User
          </button>
        )}

        <p className="font-semibold">Software Version</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.softwareVersion}
            onChange={(e) => handleInputChange("softwareVersion", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.softwareVersion}</p>
        )}
      </div>

      {isPopupOpen && (
        <AttachUserPopup
          onClose={() => setPopupOpen(false)}
          isOpen={isPopupOpen}
          deviceId={data.deviceId}
        />
      )}
    </div>
  );
};

export default DeviceInfo;
