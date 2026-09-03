import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';
import type { Receita, StatusReceita } from '@/types/interacao';

export const useInteracaoStore = defineStore('interacao', () => {
    const fila = ref<Receita[]>([]);
    const historico = ref<Receita[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchFila() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/interacao/fila');
            fila.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar fila';
        } finally {
            loading.value = false;
        }
    }

    async function fetchHistorico() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/interacao/historico');
            historico.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar histórico';
        } finally {
            loading.value = false;
        }
    }

    async function atualizarStatus(id: string, status: StatusReceita, justificativa?: string) {
        const { data } = await api.patch(`/interacao/${id}/status`, { status, justificativa });
        const idx = fila.value.findIndex((r) => r.id === id);
        if (idx >= 0) fila.value[idx] = data.data;
        return data.data;
    }

    async function create(payload: Record<string, unknown>) {
        const { data } = await api.post('/interacao', payload);
        fila.value.unshift(data.data);
        return data.data;
    }

    return { fila, historico, loading, error, fetchFila, fetchHistorico, atualizarStatus, create };
});
