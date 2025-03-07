interface LogItem {
    issue: string;
    description: string;
  }
  
  interface Props {
    logs: LogItem[];
  }
  
  const SystemLogs: React.FC<Props> = ({ logs }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg h-64"> {/* Adjust height as needed */}
        <h2 className="text-lg font-semibold">System Logs</h2>
        
        {/* Scrollable logs container */}
        <div className="mt-2 space-y-2 overflow-y-auto h-48 pr-2"> 
          {logs.map((log, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-lg">
              <p className="font-semibold">{log.issue}</p>
              <p className="text-gray-400 text-sm">{log.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SystemLogs;
  