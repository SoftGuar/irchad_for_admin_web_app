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
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [editedData, setEditedData] = useState<DeviceData>({ ...data }); // State to store edited data

  // Handle input changes
  const handleInputChange = (field: keyof DeviceData, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save changes
  const handleSave = () => {
    // hna api call to save data
    console.log("Saved Data:", editedData);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="bg-[#2E2E2E] p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Device Info</h2>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Save className="w-4 h-4" /> { }
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Pen className="w-4 h-4" /> { }
          </button>
        )}
      </div>

      <div className="space-y-2">
        {/* Device ID */}
        <p>
          <strong>Device ID:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.deviceId}
              onChange={(e) => handleInputChange("deviceId", e.target.value)}
              className="bg-transparent border-b border-white text-white"
            />
          ) : (
            data.deviceId
          )}
        </p>

        {/* Type */}
        <p>
          <strong>Type:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="bg-transparent border-b border-white text-white"
            />
          ) : (
            data.type
          )}
        </p>

        {/* MAC Address */}
        <p>
          <strong>MAC Address:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.mac}
              onChange={(e) => handleInputChange("mac", e.target.value)}
              className="bg-transparent border-b border-white text-white"
            />
          ) : (
            data.mac
          )}
        </p>

        {/* Device Status */}
        <p>
          <strong>Device Status:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="bg-transparent border-b border-white text-white"
            />
          ) : (
            data.status
          )}
        </p>

        {/* Activation Date */}
        <p>
          <strong>Activation Date:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.activationDate}
              onChange={(e) => handleInputChange("activationDate", e.target.value)}
              className="bg-transparent border-b border-white text-white"
            />
          ) : (
            data.activationDate
          )}
        </p>

        {/* Assigned User */}
        <p>
          <strong>Assigned User:</strong>{" "}
          {data.assignedUser ? (
            isEditing ? (
              <input
                type="text"
                value={editedData.assignedUser || ""}
                onChange={(e) => handleInputChange("assignedUser", e.target.value)}
                className="bg-transparent border-b border-white text-white"
              />
            ) : (
              data.assignedUser
            )
          ) : (
            <button
              className="bg-orange-500 text-white px-4 py-1 rounded-lg"
              onClick={() => setPopupOpen(true)}
            >
              Attach User
            </button>
          )}
        </p>

        {/* Software Version */}
        <p>
          <strong>Software Version:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedData.softwareVersion}
              onChange={(e) => handleInputChange("softwareVersion", e.target.value)}
              className="bg-transparent border-b border-white text-white"
            />
          ) : (
            data.softwareVersion
          )}
        </p>
      </div>

      {/* Attach User Popup */}
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