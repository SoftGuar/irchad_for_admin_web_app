import { DeviceData } from "./types";

interface Props {
  data: DeviceData;
}

const DeviceImage: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative bg-gray-800 p-4 rounded-lg">
      <img src={data.image} alt="Smart Glasses" className="w-full h-auto rounded-lg" />
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <span className="text-gray-400 text-sm">📍 Location: {data.location}</span>
        <span className={`text-sm ${data.status === "Active" ? "text-green-400" : "text-red-400"}`}>
          ⚡ Status: {data.status}
        </span>
        <span className="text-gray-400 text-sm">🔋 Battery: {data.battery}</span>
      </div>
    </div>
  );
};

export default DeviceImage;
