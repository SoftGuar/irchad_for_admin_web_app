import { apiService } from './apiService';

export const authApi = {
  login: async (email: string, password: string) => {
    return await apiService.post('/login', { email, password, role: 'admin' });
  },
};
