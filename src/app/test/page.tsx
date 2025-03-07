"use client";

import { useState } from "react";
import AttachUserModal from "../../components/popups/AttachUserPopUp"; // Import modal component

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deviceId = "FTDSYGYGygf34ry348r43guy"; // Example device ID

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#FF8B00] px-6 py-3 rounded-lg font-semibold"
      >
        Open Modal
      </button>

      {/* Attach User Modal */}
      <AttachUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} deviceId={deviceId} />
    </div>
  );
}
