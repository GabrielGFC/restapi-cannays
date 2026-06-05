import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/config/axios';
import type { Perfil } from '@/types/common';

interface AuthUser {
    id: string;
    nome: string;
    email: string;
    perfil: Perfil;
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const token = ref<string | null>(null);
        const user = ref<AuthUser | null>(null);

        const isAuthenticated = computed(() => !!token.value);

        async function login(email: string, password: string) {
            const { data } = await api.post('/auth/login', { email, password });
            token.value = data.data.token;
            user.value = data.data.user;
        }

        function logout() {
            token.value = null;
            user.value = null;
        }

        return { token, user, isAuthenticated, login, logout };
    },
    { persist: true },
);
