<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuditoriaStore } from '@/stores/auditoria';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import Badge from '@/components/ui/Badge.vue';
import Table from '@/components/ui/Table.vue';

const store = useAuditoriaStore();
const { logs, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const columns = [
    { key: 'created_at', label: 'Quando' },
    { key: 'method', label: 'Método' },
    { key: 'path', label: 'Rota' },
    { key: 'status_code', label: 'Status' },
    { key: 'user_id', label: 'Usuário' },
];
</script>

<template>
    <PageHeader title="Logs de auditoria" subtitle="Últimas 500 ações do sistema" />

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <EmptyState v-else-if="!logs.length" title="Nenhuma ação registrada ainda" />
    <Table v-else :columns="columns" :rows="logs">
        <template #cell.created_at="{ value }">
            {{ new Date(value as string).toLocaleString('pt-BR') }}
        </template>
        <template #cell.status_code="{ value }">
            <Badge :color="(value as number) < 400 ? 'green' : 'gray'" variant="soft" size="sm">
                {{ value }}
            </Badge>
        </template>
        <template #cell.user_id="{ value }">
            <span class="text-xs text-gray-500">{{ value ?? '—' }}</span>
        </template>
    </Table>
</template>
