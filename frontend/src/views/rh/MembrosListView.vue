<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRhStore } from '@/stores/rh';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Table from '@/components/ui/Table.vue';
import { Plus } from 'lucide-vue-next';

const router = useRouter();
const store = useRhStore();
const { membros, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const columns = [
    { key: 'nome', label: 'Membro' },
    { key: 'funcao', label: 'Função' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'ativo', label: 'Status' },
];

const tipoColor: Record<string, string> = {
    medico: 'blue',
    farmaceutico: 'primary',
    colaborador: 'gray',
    voluntario: 'amber',
    administrador: 'green',
};
</script>

<template>
    <PageHeader title="Recursos Humanos" subtitle="Colaboradores e voluntários">
        <template #actions>
            <Button color="primary" @click="router.push('/rh/novo')">
                <template #leading><Plus :size="16" /></template>
                Novo membro
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
        <template #cell.nome="{ row }">
            <div class="flex items-center gap-3">
                <Avatar :src="(row as any).foto_url" :name="(row as any).nome" size="sm" />
                <div class="min-w-0">
                    <p class="font-medium text-primary-dark truncate">{{ (row as any).nome }}</p>
                    <p class="text-xs text-gray-500 truncate">{{ (row as any).email }}</p>
                </div>
            </div>
        </template>
        <template #cell.tipo="{ value }">
            <Badge :color="(tipoColor[value as string] ?? 'gray') as any" variant="soft" size="sm">
                {{ value }}
            </Badge>
        </template>
        <template #cell.ativo="{ value }">
            <Badge :color="value ? 'green' : 'gray'" variant="soft" size="sm">
                {{ value ? 'Ativo' : 'Inativo' }}
            </Badge>
        </template>
    </Table>
</template>
