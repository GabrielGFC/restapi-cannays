<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProducaoStore } from '@/stores/producao';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import Table from '@/components/ui/Table.vue';

const store = useProducaoStore();
const { producoes, loading, error } = storeToRefs(store);

onMounted(() => store.fetchProducoes());

const columns = [
    { key: 'lote_id', label: 'Lote origem' },
    { key: 'data', label: 'Data' },
    { key: 'metodo', label: 'Método' },
    { key: 'rendimento_ml', label: 'Rendimento (ml)' },
];
</script>

<template>
    <PageHeader title="Produção de Óleo" subtitle="Extrações registradas" />
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchProducoes()" />
    <EmptyState
        v-else-if="!producoes.length"
        title="Sem produções"
        description="Quando um lote for colhido, registre a extração aqui."
    />
    <Table v-else :columns="columns" :rows="producoes" />
</template>
