import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export function useAuth() {
    const store = useAuthStore();
    const { user, token, isAuthenticated } = storeToRefs(store);
    return {
        user,
        token,
        isAuthenticated,
        login: store.login,
        logout: store.logout,
    };
}
