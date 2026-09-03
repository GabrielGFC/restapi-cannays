import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface Associacao {
    id: string;
    nome: string;
    cnpj: string;
    endereco: string | null;
    logo_url: string | null;
}

export const useAssociacaoStore = defineStore('associacao', () => {
    const associacao = ref<Associacao | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetch() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/associacao');
            associacao.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar dados da associação';
        } finally {
            loading.value = false;
        }
    }

    async function save(payload: Partial<Associacao>) {
        const { data } = await api.put('/associacao', payload);
        associacao.value = data.data;
        return data.data;
    }

    return { associacao, loading, error, fetch, save };
});
