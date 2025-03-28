"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { deviceApi } from "@/services/deviceApi";
interface AttachUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceId: string;
}

export default function AttachUserModal({ isOpen, onClose, deviceId }: AttachUserModalProps) {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      alert(`Device ID: ${deviceId}`);
    }
  }, [isOpen, deviceId]);

  if (!isOpen) return null;

  const handleAttachUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deviceApi.assignUser(deviceId, Number(userId));
      setSuccess(true);
      setUserId("");
      onClose();
    } catch (err) {
      setError((err as Error).message || "Failed to attach user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1E1E1E] text-white p-6 rounded-lg shadow-lg w-[400px] relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-red-500" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Attach User to Device</h2>
        <p className="text-gray-400 mb-4">{deviceId}</p>

        <form onSubmit={handleAttachUser}>
          <div className="mb-4">
            <label className="block text-sm mb-1">User ID</label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 bg-[#2E2E2E] text-white rounded-lg focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">User attached successfully!</p>}

          <button
            type="submit"
            className="w-full bg-[#FF8B00] p-3 rounded-lg font-semibold text-black disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Attaching..." : "Attach"}
          </button>
        </form>
      </div>
    </div>
  );
}
