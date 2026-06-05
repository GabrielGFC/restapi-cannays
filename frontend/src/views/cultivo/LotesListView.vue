<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCultivoStore } from '@/stores/cultivo';
import PageHeader from '@/components/shared/PageHeader.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import Button from '@/components/ui/Button.vue';
import Table from '@/components/ui/Table.vue';
import { Plus } from 'lucide-vue-next';

const router = useRouter();
const store = useCultivoStore();
const { lotes, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const columns = [
    { key: 'especie', label: 'Espécie' },
    { key: 'data_plantio', label: 'Plantio' },
    { key: 'quantidade_plantas', label: 'Plantas' },
    { key: 'local_cultivo', label: 'Local' },
    { key: 'etapa', label: 'Etapa' },
];

const etapaVariant: Record<string, 'info' | 'success' | 'warning' | 'neutral'> = {
    plantio: 'info',
    vegetativo: 'info',
    floracao: 'warning',
    colheita: 'success',
    concluido: 'neutral',
};
</script>

<template>
    <PageHeader title="Cultivo" subtitle="Lotes ativos e histórico">
        <template #actions>
            <Button @click="router.push('/cultivo/novo')">
                <Plus class="w-4 h-4" /> Novo lote
            </Button>
        </template>
    </PageHeader>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <EmptyState
        v-else-if="!lotes.length"
        title="Nenhum lote cadastrado"
        description="Cadastre o primeiro lote para iniciar a rastreabilidade."
        action-label="Novo lote"
        @action="router.push('/cultivo/novo')"
    />
    <Table v-else :columns="columns" :rows="lotes">
        <template #cell.etapa="{ value }">
            <StatusBadge :variant="etapaVariant[value as string]" :label="String(value)" />
        </template>
    </Table>
</template>
