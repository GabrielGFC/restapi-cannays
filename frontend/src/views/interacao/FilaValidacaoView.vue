<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useInteracaoStore } from '@/stores/interacao';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import Table from '@/components/ui/Table.vue';
import Button from '@/components/ui/Button.vue';
import { STATUS_RECEITA } from '@/config/constants';

const router = useRouter();
const store = useInteracaoStore();
const { fila, loading, error } = storeToRefs(store);

onMounted(() => store.fetchFila());

const columns = [
    { key: 'id', label: 'Receita' },
    { key: 'paciente_id', label: 'Paciente' },
    { key: 'created_at', label: 'Emitida em' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: '' },
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
    <PageHeader title="Fila de validação" subtitle="Receitas aguardando revisão" />
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchFila()" />
    <EmptyState v-else-if="!fila.length" title="Nenhuma receita pendente" />
    <Table v-else :columns="columns" :rows="fila">
        <template #cell.status="{ value }">
            <StatusBadge :variant="variantFor(value as string)" :label="String(value)" />
        </template>
        <template #cell.actions="{ row }">
            <Button size="sm" variant="secondary" @click="router.push(`/interacao/receita/${row.id}`)">
                Revisar
            </Button>
        </template>
    </Table>
</template>
