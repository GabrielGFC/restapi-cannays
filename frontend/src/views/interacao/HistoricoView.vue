<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useInteracaoStore } from '@/stores/interacao';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import Table from '@/components/ui/Table.vue';
import { STATUS_RECEITA } from '@/config/constants';

const store = useInteracaoStore();
const { historico, loading, error } = storeToRefs(store);

onMounted(() => store.fetchHistorico());

const columns = [
    { key: 'paciente_nome', label: 'Paciente' },
    { key: 'medico_nome', label: 'Médico' },
    { key: 'farmaceutico_nome', label: 'Farmacêutico' },
    { key: 'updated_at', label: 'Resolvida em' },
    { key: 'status', label: 'Status' },
];

function variantFor(value: string) {
    return (STATUS_RECEITA.find((s) => s.value === value)?.color ?? 'neutral') as
        | 'warning'
        | 'success'
        | 'danger'
        | 'info'
        | 'neutral';
}
</script>

<template>
    <PageHeader title="Histórico de interações" subtitle="Receitas já resolvidas" />

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchHistorico()" />
    <EmptyState
        v-else-if="!historico.length"
        title="Sem histórico"
        description="Receitas aprovadas ou rejeitadas aparecerão aqui."
    />
    <Table v-else :columns="columns" :rows="historico">
        <template #cell.farmaceutico_nome="{ value }">
            {{ value ?? '—' }}
        </template>
        <template #cell.updated_at="{ value }">
            {{ new Date(value as string).toLocaleDateString('pt-BR') }}
        </template>
        <template #cell.status="{ value }">
            <StatusBadge :variant="variantFor(value as string)" :label="String(value)" />
        </template>
    </Table>
</template>
