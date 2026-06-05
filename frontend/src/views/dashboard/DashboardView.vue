<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import KpiCard from '@/components/ui/KpiCard.vue';
import Card from '@/components/ui/Card.vue';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Kpis {
    pacientes_ativos: number;
    novas_adesoes: number;
    receitas_pendentes: number;
    estoque_oleo_ml: number;
    dispensacoes_mes: number;
    lotes_ativos: number;
}

const kpis = ref<Kpis | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

async function load() {
    loading.value = true;
    error.value = null;
    try {
        await new Promise((r) => setTimeout(r, 400));
        kpis.value = {
            pacientes_ativos: 248,
            novas_adesoes: 18,
            receitas_pendentes: 7,
            estoque_oleo_ml: 12450,
            dispensacoes_mes: 132,
            lotes_ativos: 4,
        };
    } catch (e: any) {
        error.value = e?.message ?? 'Erro ao carregar dashboard';
    } finally {
        loading.value = false;
    }
}

onMounted(load);

const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
        {
            label: 'Pacientes ativos',
            data: [180, 195, 210, 225, 238, 248],
            borderColor: '#1A5C38',
            backgroundColor: 'rgba(46, 125, 79, 0.15)',
            tension: 0.3,
        },
    ],
};
const chartOptions = { responsive: true, maintainAspectRatio: false };
</script>

<template>
    <PageHeader title="Dashboard" subtitle="Visão geral da associação" />

    <LoadingState v-if="loading" :rows="3" />
    <ErrorState v-else-if="error" :message="error" @retry="load" />
    <template v-else-if="kpis">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <KpiCard label="Pacientes ativos" :value="kpis.pacientes_ativos" />
            <KpiCard label="Novas adesões" :value="kpis.novas_adesoes" hint="no mês" />
            <KpiCard label="Receitas pendentes" :value="kpis.receitas_pendentes" />
            <KpiCard label="Estoque óleo (ml)" :value="kpis.estoque_oleo_ml" />
            <KpiCard label="Dispensações" :value="kpis.dispensacoes_mes" hint="no mês" />
            <KpiCard label="Lotes em cultivo" :value="kpis.lotes_ativos" />
        </div>
        <Card>
            <h2 class="font-semibold mb-4">Evolução de pacientes ativos</h2>
            <div class="h-72">
                <Line :data="chartData" :options="chartOptions" />
            </div>
        </Card>
    </template>
</template>
