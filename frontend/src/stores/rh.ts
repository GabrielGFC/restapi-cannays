import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';
import type { Membro } from '@/types/rh';

export const useRhStore = defineStore('rh', () => {
    const membros = ref<Membro[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/rh/membros');
            membros.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar membros';
        } finally {
            loading.value = false;
        }
    }

    return { membros, loading, error, fetchAll };
});
