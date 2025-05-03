"use client";

import { X } from "lucide-react";
import { Device } from "@/types/device";
import { useState } from "react";
import { deviceApi } from "@/services/deviceApi";

interface DeleteDeviceProps {
  device: Device;
  closePopup: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DeleteDevice: React.FC<DeleteDeviceProps> = ({ device, closePopup }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleDelete = async () => {
    setLoading(true);
    setError(null);
  
    try {
      await deviceApi.delete(device.id);
      console.log("Deleted device:", device.id);
      closePopup();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl p-[45px] rounded-[30px] space-y-5 w-1/3">
      <div className="absolute top-10 right-10">
        <X className="cursor-pointer text-red-700" onClick={closePopup} />
      </div>

      <p className="text-xl text-irchad-white font-roboto-bold">
        Do you confirm deleting this device?
      </p>

      <p className="text-xl text-irchad-gray-light font-roboto">{device.id}</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex space-x-4">
        <button
          onClick={closePopup}
          className="bg-irchad-gray border border-irchad-orange text-irchad-orange font-roboto px-4 py-2 rounded-[10px] outline-none"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className={`px-4 py-2 rounded-[10px] font-roboto outline-none ${
            loading ? "bg-gray-500" : "bg-irchad-orange text-irchad-gray"
          }`}
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default DeleteDevice;
