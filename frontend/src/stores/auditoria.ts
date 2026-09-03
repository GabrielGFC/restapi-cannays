import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface AuditLog {
    id: string;
    user_id: string | null;
    method: string;
    path: string;
    status_code: number;
    created_at: string;
}

export const useAuditoriaStore = defineStore('auditoria', () => {
    const logs = ref<AuditLog[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/auditoria');
            logs.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar logs';
        } finally {
            loading.value = false;
        }
    }

    return { logs, loading, error, fetchAll };
});
