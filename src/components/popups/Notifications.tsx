"use client";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { NotificationType } from "@/types/notifications";
import { useNotifications } from "@/utils/notificationsContext";
import { useMemo } from "react";

interface NotificationsProps {
  notifications: NotificationType[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  onMarkAllAsRead: () => void;
  onMarkAsUnread: (id: number) => void;
}

const Notifications = ({ 
  notifications,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
  onMarkAsUnread
}: NotificationsProps) => {
  const { wsConnected } = useNotifications();
  
  const { sortedNotifications, unreadCount } = useMemo(() => {
    const sorted = [...notifications].sort((a, b) => {
      if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
      return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    });
    return {
      sortedNotifications: sorted,
      unreadCount: sorted.filter(n => !n.is_read).length
    };
  }, [notifications]);

  return (
    <div className="w-full bg-[#2E2E2E] rounded shadow-lg">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
        <h3 className="font-medium">Notifications ({sortedNotifications.length})</h3>
        {unreadCount > 0 && (
          <button 
            onClick={onMarkAllAsRead}
            className="text-xs text-blue-400 hover:text-blue-500"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {sortedNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          sortedNotifications.map((notification) => (
            <div 
              key={`notification-${notification.id}`}
              className={`p-4 border-b border-gray-700 ${!notification.is_read ? "bg-[#3A3A3A]" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-100 mb-1">
                    {notification.message || 'No message content'}
                  </p>
                  <span className="text-xs text-gray-400">
                    {notification.created_at ? new Date(notification.created_at).toLocaleString() : 'Unknown date'}
                  </span>
                </div>
                <div className="flex space-x-2 ml-2">
                  {!notification.is_read ? (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-blue-400 hover:text-blue-300"
                      title="Mark as read"
                    >
                      <Eye size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => onMarkAsUnread(notification.id)}
                      className="text-blue-400 hover:text-blue-300"
                      title="Mark as Unread"
                    >
                      <EyeOff size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(notification.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {wsConnected ? (
        <div className="px-4 py-2 text-xs text-green-500 border-t border-gray-700">
          Connected to notifications service
        </div>
      ) : (
        <div className="px-4 py-2 text-xs text-yellow-500 border-t border-gray-700">
          Offline: Notifications may not be real-time
        </div>
      )}
    </div>
  );
};

export default Notifications;