import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/config/axios';
import type { Perfil } from '@/types/common';

interface AuthUser {
    id: string;
    nome: string;
    email: string;
    username?: string;
    perfil?: Perfil;
}

interface ApiUser {
    id: string;
    name: string;
    email: string;
    username?: string;
    perfil?: Perfil;
}

function normalizeUser(u: ApiUser): AuthUser {
    return {
        id: u.id,
        nome: u.name,
        email: u.email,
        username: u.username,
        perfil: u.perfil,
    };
}

function stripBearer(t: string): string {
    return t.startsWith('Bearer ') ? t.slice(7) : t;
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const token = ref<string | null>(null);
        const user = ref<AuthUser | null>(null);

        const isAuthenticated = computed(() => !!token.value);

        async function login(email: string, password: string) {
            const { data } = await api.post('/auth/signin', { email, password });
            token.value = stripBearer(data.data.accessToken);
            user.value = normalizeUser(data.data.user);
        }

        function logout() {
            token.value = null;
            user.value = null;
            try { localStorage.removeItem('auth'); } catch { /* ignore */ }
        }

        return { token, user, isAuthenticated, login, logout };
    },
    { persist: true },
);
