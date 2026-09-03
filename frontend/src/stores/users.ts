import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface AppUser {
    id: string;
    name: string;
    email: string;
    username: string;
    created_at: string;
}

export const useUsersStore = defineStore('users', () => {
    const users = ref<AppUser[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/user');
            users.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar usuários';
        } finally {
            loading.value = false;
        }
    }

    return { users, loading, error, fetchAll };
});
