import { apiService } from './apiService';
import {NotificationPayload, updateNotificationInput,NotificationType} from '@/types/notifications';

interface ApiResponse<T> {
success: boolean;
data: T;
}

export const notificationsApi = {
notifications: {
    getAll: async (userId: string): Promise<ApiResponse<NotificationType[]>> => {
        return {
            success: true,
            data: await apiService.get(`/notifications/notifications/${userId}/COMMERCIAL`),
        };
    },

    getById: async (notificationId: number): Promise<ApiResponse<NotificationType>> => {
        return {
            success: true,
            data: await apiService.get(`/notifications/notifications/${notificationId}`),
        }
    },

    update: async (notificationId: number, payload: updateNotificationInput): Promise<ApiResponse<NotificationType>> => {
        return {
            success: true,
            data: await apiService.put(`/notifications/notifications/${notificationId}`, payload),
        }
    },

    markAsRead: async (notificationId: number): Promise<ApiResponse<NotificationType>> => {
        const data = {}
        return {
            success: true,
            data: await apiService.put(`/notifications/notifications/${notificationId}/read`,data),
        }
    },

    markAsUnread: async (notificationId: number): Promise<ApiResponse<NotificationType>> => {
        const data = {}
        return {
            success: true,
            data: await apiService.put(`/notifications/notifications/${notificationId}/unread`,data),
        };
    },

    delete: async (notificationId: number): Promise<ApiResponse<void>> => {
        return {
            success: true,
            data: await apiService.delete(`/notifications/notifications/${notificationId}`),
        };
    },
},
};
