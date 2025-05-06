'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import type { NotificationType } from '@/types/notifications';

interface NotificationsContextType {
  notifications: NotificationType[];
  wsConnected: boolean;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children, userId }: { children: ReactNode; userId: string }) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const connectWebSocket = () => {
      const ws = new WebSocket(`ws://localhost:2000/notifications/websocket/ws/${userId}/COMMERCIAL`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connection established');
        setWsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const incomingNotification = JSON.parse(event.data);
          console.log('Received notification:', incomingNotification);
          
          if (!incomingNotification?.data?.requestId) {
            console.error('Invalid notification format:', incomingNotification);
            return;
          }
          
          const notification: NotificationType = {
            id: incomingNotification.data.requestId,
            title: incomingNotification.data.message?.pushNotification.title || 'New Notification',
            message: incomingNotification.data.message?.pushNotification.body || 'You have a new notification.',
            is_read: false,
            created_at: new Date().toISOString(),
          };

          setNotifications((prevNotifications) => [notification, ...prevNotifications]);
          
          // Show browser notification if permission granted
          if (Notification.permission === 'granted') {
            new Notification(notification.title, { 
              body: notification.message 
            });
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setWsConnected(false);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setWsConnected(false);
      };

      return ws;
    };

    const ws = connectWebSocket();

    // Request notification permissions
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [userId]);

  return (
    <NotificationsContext.Provider value={{ notifications, wsConnected }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}