
"use client";
import { useState } from "react";
import AttachUserPopup from "../popups/AttachUserPopUp";
import { Pen, Save } from "lucide-react";
import { DeviceData } from "@/types/device";

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
            value={editedData.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.id}</p>
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
            value={editedData.MAC}
            onChange={(e) => handleInputChange("MAC", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.MAC}</p>
        )}

        <p className="font-semibold">Device Status</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.state}</p>
        )}

        <p className="font-semibold">Activation Date</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.start_date}
            onChange={(e) => handleInputChange("start_date", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.start_date}</p>
        )}

        <p className="font-semibold">End Date</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.end_date}
            onChange={(e) => handleInputChange("end_date", e.target.value)}
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.end_date}</p>
        )}

        <p className="font-semibold">Assigned User</p>
        {data.user_id ? (
          isEditing ? (
            <input
              type="text"
              value={editedData.user_id || ""}
              onChange={(e) => handleInputChange("user_id", e.target.value)}
              className="bg-transparent border-b border-white"
            />
          ) : (
            <p>{data.user_id}</p>
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
            value={editedData.Product?.name || ""}
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                Product: {
                  ...prev.Product,
                  name: e.target.value,
                },
              }))
            }
            className="bg-transparent border-b border-white"
          />
        ) : (
          <p>{data.Product?.name || "N/A"}</p>
        )}
      </div>

      {isPopupOpen && (
        <AttachUserPopup
          onClose={() => setPopupOpen(false)}
          isOpen={isPopupOpen}
          deviceId={data.id}
        />
      )}
    </div>
  );
};

export default DeviceInfo;

