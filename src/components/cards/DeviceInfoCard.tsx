import { DeviceData } from "./types";

interface Props {
  data: DeviceData;
}

const DeviceInfo: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4"> {/* Increased space */}
      <h2 className="text-lg font-semibold">Device Info</h2>
      <div className="space-y-2"> {/* Added spacing between paragraphs */}
        <p><strong>Device ID:</strong> {data.deviceId}</p>
        <p><strong>Type:</strong> {data.type}</p>
        <p><strong>MAC Address:</strong> {data.mac}</p>
        <p><strong>Activation Date:</strong> {data.activationDate}</p>
        <p><strong>Software Version:</strong> {data.softwareVersion}</p>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full">
        Attach User
      </button>
    </div>
  );
};

export default DeviceInfo;
