

import { useState, useEffect } from "react";

const GrafanaDashboard: React.FC = () => {
  const [grafanaUrl, setGrafanaUrl] = useState<string>("");

  useEffect(() => {
    // Set the Grafana dashboard URL
    setGrafanaUrl("https://llaouinine.grafana.net/goto/1JhIm6hHR?orgId=1");
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl h-[80vh] border border-gray-300 rounded-lg shadow-lg">
        {grafanaUrl ? (
          <iframe
            src={grafanaUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Loading Grafana Dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default GrafanaDashboard;
