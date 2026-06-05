<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProducaoStore } from '@/stores/producao';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import Table from '@/components/ui/Table.vue';

const store = useProducaoStore();
const { frascos, loading, error } = storeToRefs(store);

onMounted(() => store.fetchEstoque());

const totalDisponivel = computed(() =>
    frascos.value
        .filter((f) => f.status === 'disponivel')
        .reduce((s, f) => s + f.volume_ml, 0),
);
const critico = computed(() => totalDisponivel.value < 1000);

const columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'volume_ml', label: 'Volume (ml)' },
    { key: 'validade', label: 'Validade' },
    { key: 'status', label: 'Status' },
];
</script>

<template>
    <PageHeader
        title="Estoque de Óleo"
        :subtitle="`Total disponível: ${totalDisponivel} ml`"
    />
    <div
        v-if="critico && frascos.length"
        class="mb-4 rounded-md bg-warning/10 border border-warning/30 px-4 py-3 text-sm text-warning"
        role="alert"
    >
        Estoque crítico — abaixo de 1000 ml.
    </div>
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchEstoque()" />
    <EmptyState v-else-if="!frascos.length" title="Sem frascos em estoque" />
    <Table v-else :columns="columns" :rows="frascos">
        <template #cell.status="{ value }">
            <StatusBadge
                :variant="value === 'disponivel' ? 'success' : value === 'dispensado' ? 'neutral' : 'warning'"
                :label="String(value)"
            />
        </template>
    </Table>
</template>
