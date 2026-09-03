<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/users';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import Table from '@/components/ui/Table.vue';

const store = useUsersStore();
const { users, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'username', label: 'Usuário' },
    { key: 'created_at', label: 'Criado em' },
];
</script>

<template>
    <PageHeader title="Gestão de usuários" subtitle="Lista, perfil e status" />

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <EmptyState v-else-if="!users.length" title="Nenhum usuário cadastrado" />
    <Table v-else :columns="columns" :rows="users">
        <template #cell.created_at="{ value }">
            {{ new Date(value as string).toLocaleDateString('pt-BR') }}
        </template>
    </Table>
</template>
