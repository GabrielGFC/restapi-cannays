import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface Integracao {
    id: string;
    nome: string;
    tipo: 'pagamento' | 'fornecedor' | 'outro';
    chave_api: string | null;
    ativo: boolean;
}

export const useIntegracoesStore = defineStore('integracoes', () => {
    const integracoes = ref<Integracao[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/integracoes');
            integracoes.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar integrações';
        } finally {
            loading.value = false;
        }
    }

    async function create(payload: Partial<Integracao>) {
        const { data } = await api.post('/integracoes', payload);
        integracoes.value.unshift(data.data);
        return data.data;
    }

    async function toggle(integracao: Integracao) {
        const { data } = await api.put(`/integracoes/${integracao.id}`, { ativo: !integracao.ativo });
        const idx = integracoes.value.findIndex((i) => i.id === integracao.id);
        if (idx >= 0) integracoes.value[idx] = data.data;
        return data.data;
    }

    async function remove(id: string) {
        await api.delete(`/integracoes/${id}`);
        integracoes.value = integracoes.value.filter((i) => i.id !== id);
    }

    return { integracoes, loading, error, fetchAll, create, toggle, remove };
});
