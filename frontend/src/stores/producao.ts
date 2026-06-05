import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';
import type { ProducaoOleo, FrascoOleo } from '@/types/producao';

export const useProducaoStore = defineStore('producao', () => {
    const producoes = ref<ProducaoOleo[]>([]);
    const frascos = ref<FrascoOleo[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchProducoes() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/producao');
            producoes.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar produções';
        } finally {
            loading.value = false;
        }
    }

    async function fetchEstoque() {
        const { data } = await api.get('/producao/frascos');
        frascos.value = data.data;
    }

    return { producoes, frascos, loading, error, fetchProducoes, fetchEstoque };
});
