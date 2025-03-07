interface HistoryItem {
    time: string;
    event: string;
  }
  
  interface Props {
    history: HistoryItem[];
  }
  
  const MaintenanceHistory: React.FC<Props> = ({ history }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg h-64"> {/* Fixed height */}
        <h2 className="text-lg font-semibold">Maintenance History</h2>
        
        {/* Scrollable history container */}
        <ul className="mt-2 space-y-2 overflow-y-auto h-48 pr-2">  
          {history.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-orange-500">●</span>
              <div>
                <p className="font-semibold">{item.event}</p>
                <p className="text-gray-400 text-sm">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MaintenanceHistory;
  