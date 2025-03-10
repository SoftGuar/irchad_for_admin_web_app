"use client";
import { useRouter } from "next/navigation";

const devices = [
  { id: "SC_01p33hhz38hngv", type: "Glasses", status: "Active", date: "Jan 6, 2024" },
  { id: "FTDSYGYsd34r34843guy", type: "Glasses", status: "Active", date: "Jan 6, 2025" },
];

export default function DevicesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Devices</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-700 text-left">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-4 border border-gray-700">ID</th>
              <th className="p-4 border border-gray-700">Type</th>
              <th className="p-4 border border-gray-700">Status</th>
              <th className="p-4 border border-gray-700">Added On</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr
                key={device.id}
                className="cursor-pointer hover:bg-gray-800 transition"
                onClick={() => router.push(`/devices/${device.id}`)}
              >
                <td className="p-4 border border-gray-700">{device.id}</td>
                <td className="p-4 border border-gray-700">{device.type}</td>
                <td className="p-4 border border-gray-700">{device.status}</td>
                <td className="p-4 border border-gray-700">{device.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
