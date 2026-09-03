<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Line } from 'vue-chartjs';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Users, UserPlus, FileClock, Droplet, PackageCheck, Sprout } from 'lucide-vue-next';
import { useDashboardStore } from '@/stores/dashboard';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import KpiCard from '@/components/ui/KpiCard.vue';
import Card from '@/components/ui/Card.vue';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const store = useDashboardStore();
const { summary, loading, error } = storeToRefs(store);

onMounted(() => store.fetch());

function formatMes(mes: string) {
    const [ano, mesNum] = mes.split('-');
    const nomes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${nomes[Number(mesNum) - 1]}/${ano.slice(2)}`;
}

const chartData = computed(() => {
    const pontos = summary.value?.evolucao_pacientes ?? [];
    return {
        labels: pontos.map((p) => formatMes(p.mes)),
        datasets: [
            {
                label: 'Pacientes distintos',
                data: pontos.map((p) => Number(p.total)),
                borderColor: '#026874',
                backgroundColor: 'rgba(2, 104, 116, 0.12)',
                tension: 0.35,
                fill: true,
                pointBackgroundColor: '#026874',
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };
});
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: 'rgba(0,0,0,0.55)', precision: 0 } },
        x: { grid: { display: false }, ticks: { color: 'rgba(0,0,0,0.55)' } },
    },
};

function timeAgo(iso: string) {
    const diffMs = Date.now() - new Date(iso).getTime();
    const min = Math.round(diffMs / 60000);
    if (min < 1) return 'agora';
    if (min < 60) return `há ${min} min`;
    const h = Math.round(min / 60);
    if (h < 24) return `há ${h} h`;
    return `há ${Math.round(h / 24)} d`;
}
</script>

<template>
    <PageHeader title="Dashboard" subtitle="Visão geral da associação" />

    <LoadingState v-if="loading" :rows="3" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetch()" />
    <template v-else-if="summary">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <KpiCard label="Pacientes distintos" :value="summary.pacientes_ativos" :icon="Users" />
            <KpiCard label="Receitas no mês" :value="summary.novas_adesoes" :icon="UserPlus" hint="novas receitas" />
            <KpiCard label="Receitas pendentes" :value="summary.receitas_pendentes" :icon="FileClock" />
            <KpiCard label="Estoque óleo" :value="`${summary.estoque_oleo_ml.toLocaleString('pt-BR')} ml`" :icon="Droplet" />
            <KpiCard label="Dispensações" :value="summary.dispensacoes_mes" :icon="PackageCheck" hint="no mês" />
            <KpiCard label="Lotes em cultivo" :value="summary.lotes_ativos" :icon="Sprout" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card class="lg:col-span-2">
                <template #header>
                    <h2 class="text-base font-semibold text-primary-dark">Evolução de pacientes</h2>
                </template>
                <div v-if="summary.evolucao_pacientes.length" class="h-72">
                    <Line :data="chartData" :options="chartOptions" />
                </div>
                <EmptyState v-else title="Sem dados suficientes ainda" />
            </Card>

            <Card>
                <template #header>
                    <h2 class="text-base font-semibold text-primary-dark">Atividade recente</h2>
                </template>
                <EmptyState v-if="!summary.atividades.length" title="Nenhuma atividade registrada ainda" />
                <ul v-else class="space-y-4">
                    <li v-for="(a, i) in summary.atividades" :key="i" class="flex gap-3">
                        <span class="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ring-4 bg-primary ring-primary/15" />
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-primary-dark leading-tight">{{ a.acao }}</p>
                            <p class="text-xs text-gray-500 mt-0.5">{{ timeAgo(a.quando) }}</p>
                        </div>
                    </li>
                </ul>
            </Card>
        </div>
    </template>
</template>
