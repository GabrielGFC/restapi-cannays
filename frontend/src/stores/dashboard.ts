import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/config/axios';

export interface DashboardSummary {
    pacientes_ativos: number;
    novas_adesoes: number;
    receitas_pendentes: number;
    estoque_oleo_ml: number;
    dispensacoes_mes: number;
    lotes_ativos: number;
    evolucao_pacientes: { mes: string; total: string }[];
    atividades: { quando: string; acao: string }[];
}

export const useDashboardStore = defineStore('dashboard', () => {
    const summary = ref<DashboardSummary | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetch() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/dashboard/summary');
            summary.value = data.data;
        } catch (e: any) {
            error.value = e?.message ?? 'Erro ao carregar dashboard';
        } finally {
            loading.value = false;
        }
    }

    return { summary, loading, error, fetch };
});
