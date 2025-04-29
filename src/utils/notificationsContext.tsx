'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface Notification {
    title: string;
    message: string;
}

interface NotificationsContextType {
    notifications: Notification[];
    wsConnected: boolean;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children, userId }: { children: ReactNode; userId: string }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [wsConnected, setWsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!userId) return;

        const ws = new WebSocket(`ws://localhost:2000/notifications/websocket/ws/${userId}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connection established');
            setWsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const notification: Notification = JSON.parse(event.data);
                console.log('Received notification:', notification);

                setNotifications((prevNotifications) => [notification, ...prevNotifications]);

                if (Notification.permission === 'granted' && notification.title) {
                    new Notification(notification.title, {
                        body: notification.message,
                        icon: '/notification-icon.png',
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

        if (typeof window !== 'undefined' && 'Notification' in window) {
            Notification.requestPermission();
        }

        return () => {
            if (wsRef.current) {
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