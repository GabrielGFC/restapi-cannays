import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface Permissao {
    id: string;
    perfil: string;
    funcionalidade: string;
    permitido: boolean;
}

export const usePermissoesStore = defineStore('permissoes', () => {
    const permissoes = ref<Permissao[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/permissoes');
            permissoes.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar permissões';
        } finally {
            loading.value = false;
        }
    }

    async function toggle(permissao: Permissao) {
        const { data } = await api.put(`/permissoes/${permissao.id}`, { permitido: !permissao.permitido });
        const idx = permissoes.value.findIndex((p) => p.id === permissao.id);
        if (idx >= 0) permissoes.value[idx] = data.data;
        return data.data;
    }

    return { permissoes, loading, error, fetchAll, toggle };
});
