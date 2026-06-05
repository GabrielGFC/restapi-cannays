<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRhStore } from '@/stores/rh';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import Button from '@/components/ui/Button.vue';
import Table from '@/components/ui/Table.vue';
import { Plus } from 'lucide-vue-next';

const router = useRouter();
const store = useRhStore();
const { membros, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'funcao', label: 'Função' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'ativo', label: 'Status' },
];
</script>

<template>
    <PageHeader title="Recursos Humanos" subtitle="Colaboradores e voluntários">
        <template #actions>
            <Button @click="router.push('/rh/novo')">
                <Plus class="w-4 h-4" /> Novo membro
            </Button>
        </template>
    </PageHeader>
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <EmptyState
        v-else-if="!membros.length"
        title="Nenhum membro cadastrado"
        action-label="Cadastrar"
        @action="router.push('/rh/novo')"
    />
    <Table v-else :columns="columns" :rows="membros">
        <template #cell.ativo="{ value }">
            <StatusBadge
                :variant="value ? 'success' : 'neutral'"
                :label="value ? 'Ativo' : 'Inativo'"
            />
        </template>
    </Table>
</template>
