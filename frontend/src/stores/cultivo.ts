import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';
import type { CultivoLote, EtapaCultivo } from '@/types/cultivo';

export const useCultivoStore = defineStore('cultivo', () => {
    const lotes = ref<CultivoLote[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/cultivo');
            lotes.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar lotes';
        } finally {
            loading.value = false;
        }
    }

    async function create(payload: Partial<CultivoLote>) {
        const { data } = await api.post('/cultivo', payload);
        lotes.value.unshift(data.data);
        return data.data;
    }

    async function transitionEtapa(id: string, etapa: EtapaCultivo) {
        const { data } = await api.patch(`/cultivo/${id}/etapa`, { etapa });
        const idx = lotes.value.findIndex((l) => l.id === id);
        if (idx >= 0) lotes.value[idx] = data.data;
        return data.data;
    }

    return { lotes, loading, error, fetchAll, create, transitionEtapa };
});
