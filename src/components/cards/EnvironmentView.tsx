import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Maximize } from "lucide-react"
import { Environment } from "@/types/environment";

interface EnvViewProps {
  data: Environment;
}

const EnvironmentView: React.FC<EnvViewProps> = ({ data }) => {
  const router = useRouter();
  const {floor_id}=useParams();

  const goToFullView = (id: string) => {
    router.push(`/environments/${id}/${floor_id}/fullView`);
  };

  return (
    <div className="flex relative rounded-3xl max-w-[830px] max-h-[640px] overflow-hidden">
      {data.floorPlan?.image ? (
        <img 
          src={data.floorPlan.image} 
          alt="Floor Plan" 
          className="w-full h-full object-cover rounded-3xl"
        />
      ) : (
        <img 
          src="/images/map.jpg" 
          alt="Default Map" 
          className="w-full h-full object-cover rounded-3xl"
        />
      )}
      <div 
        className="absolute bottom-2 right-3 bg-irchad-gray rounded-full p-2 cursor-pointer" 
        onClick={() => goToFullView(data.id)}
      >
        <Maximize className="text-white"/>
      </div>
    </div>
  );
};

export default EnvironmentView;