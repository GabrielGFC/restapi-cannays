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
    Filler,
} from 'chart.js';
import { Users, UserPlus, FileClock, Droplet, PackageCheck, Sprout } from 'lucide-vue-next';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import KpiCard from '@/components/ui/KpiCard.vue';
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

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
        await new Promise((r) => setTimeout(r, 300));
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
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: 'rgba(0,0,0,0.55)' } },
        x: { grid: { display: false }, ticks: { color: 'rgba(0,0,0,0.55)' } },
    },
};

const atividades = [
    { quando: 'há 5 min', acao: 'Aprovou receita de Ana B. Costa', user: 'Dr. João Pereira', color: 'green' },
    { quando: 'há 18 min', acao: 'Dispensou frasco FR-003 (Óleo CBD 5%)', user: 'João Pereira', color: 'primary' },
    { quando: 'há 1 h', acao: 'Lote L-2026-002 entrou em floração', user: 'Marcos Silva', color: 'amber' },
    { quando: 'há 2 h', acao: 'Cadastrou novo membro: Diego Ramos', user: 'Helena Martins', color: 'blue' },
    { quando: 'há 4 h', acao: 'Produção prod-003 finalizada (220 ml)', user: 'Marcos Silva', color: 'primary' },
] as const;
</script>

<template>
    <PageHeader title="Dashboard" subtitle="Visão geral da associação" />

    <LoadingState v-if="loading" :rows="3" />
    <ErrorState v-else-if="error" :message="error" @retry="load" />
    <template v-else-if="kpis">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <KpiCard label="Pacientes ativos" :value="kpis.pacientes_ativos" :icon="Users" trend="up" trend-value="+12%" hint="vs. mês anterior" />
            <KpiCard label="Novas adesões" :value="kpis.novas_adesoes" :icon="UserPlus" trend="up" trend-value="+3" hint="no mês" />
            <KpiCard label="Receitas pendentes" :value="kpis.receitas_pendentes" :icon="FileClock" trend="flat" trend-value="estável" />
            <KpiCard label="Estoque óleo" :value="`${kpis.estoque_oleo_ml.toLocaleString('pt-BR')} ml`" :icon="Droplet" trend="up" trend-value="+8%" />
            <KpiCard label="Dispensações" :value="kpis.dispensacoes_mes" :icon="PackageCheck" trend="up" trend-value="+15%" hint="no mês" />
            <KpiCard label="Lotes em cultivo" :value="kpis.lotes_ativos" :icon="Sprout" trend="flat" trend-value="estável" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card class="lg:col-span-2">
                <template #header>
                    <div class="flex items-baseline justify-between">
                        <h2 class="text-base font-semibold text-primary-dark">Evolução de pacientes</h2>
                        <Badge color="gray" variant="soft" size="xs">Últimos 6 meses</Badge>
                    </div>
                </template>
                <div class="h-72">
                    <Line :data="chartData" :options="chartOptions" />
                </div>
            </Card>

            <Card>
                <template #header>
                    <div class="flex items-baseline justify-between">
                        <h2 class="text-base font-semibold text-primary-dark">Atividade recente</h2>
                        <Badge color="green" variant="soft" size="xs">ao vivo</Badge>
                    </div>
                </template>
                <ul class="space-y-4">
                    <li v-for="(a, i) in atividades" :key="i" class="flex gap-3">
                        <span
                            class="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ring-4"
                            :class="{
                                'bg-primary ring-primary/15': a.color === 'primary',
                                'bg-green-500 ring-green-500/15': a.color === 'green',
                                'bg-amber-500 ring-amber-500/15': a.color === 'amber',
                                'bg-blue-500 ring-blue-500/15': a.color === 'blue',
                            }"
                        />
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-primary-dark leading-tight">{{ a.acao }}</p>
                            <p class="text-xs text-gray-500 mt-0.5">{{ a.user }} · {{ a.quando }}</p>
                        </div>
                    </li>
                </ul>
            </Card>
        </div>
    </template>
</template>
