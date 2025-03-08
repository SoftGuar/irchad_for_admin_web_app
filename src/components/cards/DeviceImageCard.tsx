import { DeviceData } from "./types";

interface Props {
  data: DeviceData;
}

const DeviceImage: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative bg-[#2E2E2E] p-4 rounded-lg">
      {/* Image ajustée à la taille du conteneur */}
      <div className="w-full h-[200px] md:h-[265px] rounded-lg overflow-hidden">
        <img 
          src={data.image} 
          alt="Smart Glasses" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Infos en haut à droite */}
      <div className="absolute top-2 right-2 flex flex-wrap items-center space-x-2 bg-black bg-opacity-50 p-2 rounded-lg">
        <span className="text-gray-400 text-sm">📍 {data.location}</span>
        <span className={`text-sm ${data.status === "Active" ? "text-green-400" : "text-red-400"}`}>
          ⚡ {data.status}
        </span>
        <span className="text-gray-400 text-sm">🔋 {data.battery}</span>
      </div>
    </div>
  );
};


export default DeviceImage;
