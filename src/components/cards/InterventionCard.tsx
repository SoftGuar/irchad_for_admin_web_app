import { useState } from "react";

interface InterventionCardProps {
  title: string;
  description: string;
  maintainer: string;
  startDate: string;
  endDate: string;
  status: string;
}

const InterventionCard: React.FC<InterventionCardProps> = ({
  title,
  description,
  maintainer,
  startDate,
  endDate,
  status
}) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="bg-[#464646] p-4 rounded-md text-white space-y-2">
        <div className="flex justify-between">
             <h3 className="text-lg font-semibold"><span className="text-irchad-orange">Intervention:</span> {title}</h3>
             <h5 className="text-irchad-orange">{status}</h5>
        </div>
     
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="ml-4 text-sm text-irchad-orange hover:underline"
      >
        {showDescription ? "Hide" : "Show"} description 
      </button>

      {showDescription && (
        <p className="text-sm ml-8 text-gray-200 mt-2">{description}</p>
      )}

      <div className="text-sm ml-4 text-gray-300 mt-8">
    By maintainer: {maintainer}
      </div>
      <div className="text-sm ml-4 text-gray-300">
        {startDate} ➝ {endDate}
      </div>
    </div>
  );
};

export default InterventionCard;
