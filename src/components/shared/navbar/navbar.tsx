import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Notifications from "@/components/popups/Notifications";
import { notificationsApi } from "@/services/notificationsApi";
import { NotificationType } from "@/types/notifications";
import { useNotifications } from "@/utils/notificationsContext";
import { getProfile } from "@/services/UserManagementService";


const Navbar = () => {
  const router = useRouter();
  const { notifications: contextNotifications } = useNotifications();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)
  const [user, setUser] = useState(
      {
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        joinedAt: '', 
        avatar: '',
        role: '',
      }
    )
    
    useEffect(() => {
      const getPersonalInfos = async () => {
        try {
          const response = await getProfile(); 
          if(response.success){
            const user = response.data;
            const userData = {
              id: user.id.toString(),
              userName: `${user.first_name} ${user.last_name}`.trim(),
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              phone: user.phone,
              joinedAt: new Date().toISOString().split('T')[0], 
              avatar: "/images/ProfilePic.png",
              role: localStorage.getItem("role") || "admin",
              
            };
            setUser(userData); 
          }else {
            setError('Failed to get personal informations');
          }
  
        } catch (error) {
          setError('An error occurred while getting personal informations.');
          console.error("Failed to get personal informations:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getPersonalInfos();
    }, []);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoadingNotifications(true);
        const userId = String(user.id);
        const response = await notificationsApi.notifications.getAll(userId);
        if (response.success) {
          // Sort immediately when setting
          const sorted = response.data.sort((a, b) => {
            if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
            return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
          });
          setNotifications(sorted);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  useEffect(() => {
    if (contextNotifications.length === 0) return;
    
    setNotifications(prev => {
      const notificationMap = new Map<number, NotificationType>();
      prev.forEach(notif => notificationMap.set(notif.id, notif));
      contextNotifications.forEach(notif => notificationMap.set(notif.id, notif));
      const merged = Array.from(notificationMap.values());
      return merged.sort((a, b) => {
        if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    });
  }, [contextNotifications]);

  const handleMarkAsRead = useCallback(async (id: number) => {
    try {
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
      
      await notificationsApi.notifications.markAsRead(id);
    } catch (error) {
      console.error("Failed to mark as read:", error);
      // Revert if API fails
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, is_read: false } : n
      ));
    }
  }, []);

  const handleDeleteNotification = useCallback(async (id: number) => {
    try {
      setNotifications(prev => prev.filter(n => n.id !== id));
      
      await notificationsApi.notifications.delete(id);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    const unreadIds = notifications
      .filter(n => !n.is_read)
      .map(n => n.id);
    
    if (unreadIds.length === 0) return;
    
    setNotifications(prev => prev.map(n => 
      !n.is_read ? { ...n, is_read: true } : n
    ));
    
    try {
      await Promise.all(
        unreadIds.map(id => notificationsApi.notifications.markAsRead(id))
      );
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      setNotifications(prev => prev.map(n => 
        unreadIds.includes(n.id) ? { ...n, is_read: false } : n
      ));
    }
  }, [notifications]);

  const handleMarkAsUnread = useCallback(async (id: number) => {
    try {
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, is_read: false } : n
      ));
      
      await notificationsApi.notifications.markAsUnread(id);
    } catch (error) {
      console.error("Failed to mark as unread:", error);
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
    }
  }, []);
  // Handle clicks outside the notification popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
          <span>IRCHAD</span>
        </div>
        <div className="animate-pulse bg-gray-600 h-8 w-32 rounded"></div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#2E2E2E] px-3 py-2 rounded-md border border-[#FF8B0029]">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent text-white placeholder-gray-500 focus:outline-none px-2" 
        />
      </div>

      {/* Notification & User Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative">
            <BellIcon
              onClick={() => setShowNotifications((prev) => !prev)}
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white"
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notification Popup */}
          {showNotifications && (
            <div 
              ref={notificationRef} 
              className="absolute right-0 mt-2 w-80 bg-[#2E2E2E] shadow-lg rounded-md text-[#D3D3D3] p-4 border border-gray-600 z-50"
            >
              {isLoadingNotifications ? (
                <div className="py-4 text-center">Loading notifications...</div>
              ) : (
                <Notifications 
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotification}
              onMarkAllAsRead={handleMarkAllAsRead}
              onMarkAsUnread={handleMarkAsUnread}
            />
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <UserCircleIcon 
            onClick={() => router.push('/profile')}  
            className="h-8 w-8 text-gray-400 cursor-pointer hover:text-white" 
          />
          <div className="text-sm">
            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            <p className="text-gray-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;