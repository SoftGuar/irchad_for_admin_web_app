import InterventionCard from "./InterventionCard";
interface Intervention {
  title: string;
  maintainer: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string
}

interface InterventionsListProps {
  interventions: Intervention[];
}

const InterventionsList: React.FC<InterventionsListProps> = ({ interventions }) => {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Interventions history</h2>
      {interventions.map((item, index) => (
        <div key={index}  className="bg-[#464646] p-4 rounded-md">
            <InterventionCard title={item.title} description={item.description} maintainer={item.maintainer} startDate={item.startDate} endDate={item.endDate} status={item.status} />
        </div>
      ))}
    </div>
  );
};

export default InterventionsList;
