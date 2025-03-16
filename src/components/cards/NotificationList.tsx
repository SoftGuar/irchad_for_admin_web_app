
import { FaBell } from "react-icons/fa";

interface NotificationItem {
  time: string;
  message: string;
}

interface Props {
  notifications: NotificationItem[];
}

const NotificationPanel: React.FC<Props> = ({ notifications }) => {
  return (
    <div className="bg-transparent p-4 rounded-lg shadow-md w-full max-w-sm">
      {/* Title */}
     

      {/* Scrollable Notification List */}
      <div className="mt-3 space-y-3 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-sm">No new notifications</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} className="flex items-start space-x-3">
              {/* Orange Circle */}
              <span className="text-orange-500 text-lg">●</span>
              {/* Message Content */}
              <div className="flex-1">
                <p className="text-white text-sm">{notif.message}</p>
                <p className="text-gray-400 text-xs">{notif.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default NotificationPanel;
