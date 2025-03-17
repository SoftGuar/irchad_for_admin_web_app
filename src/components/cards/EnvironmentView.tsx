import React from "react";
import { useRouter } from "next/navigation";
import { Maximize } from "lucide-react"
import { Environment } from "@/types/environment";

interface EnvViewProps {
    data: Environment;
}

const EnvironmentView: React.FC<EnvViewProps> = ({ data }) => {
    const router = useRouter();

  const goToFullView = (id: string) => {
    router.push(`/environments/${id}/fullView`);
  };

  return (
    <div className="flex relative rounded-3xl max-w-[830px] max-h-[640px] overflow-hidden">
        <img src="/images/map.jpg" alt="map" className="w-full h-full object-cover rounded-3xl"/>        
        <div className="absolute bottom-2 right-3 bg-irchad-gray rounded-full p-2 cursor-pointer" onClick={() => goToFullView(data.id)}>
            <Maximize className="text-white"/>
        </div>
    </div>
  );
};

export default EnvironmentView;
