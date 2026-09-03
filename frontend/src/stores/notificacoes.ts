import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface NotificacaoRegra {
    id: string;
    evento: string;
    canal: 'email' | 'in_app';
    ativo: boolean;
}

export const useNotificacoesStore = defineStore('notificacoes', () => {
    const regras = ref<NotificacaoRegra[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/notificacoes');
            regras.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar regras';
        } finally {
            loading.value = false;
        }
    }

    async function update(regra: NotificacaoRegra, changes: Partial<NotificacaoRegra>) {
        const { data } = await api.put(`/notificacoes/${regra.id}`, changes);
        const idx = regras.value.findIndex((r) => r.id === regra.id);
        if (idx >= 0) regras.value[idx] = data.data;
        return data.data;
    }

    return { regras, loading, error, fetchAll, update };
});
