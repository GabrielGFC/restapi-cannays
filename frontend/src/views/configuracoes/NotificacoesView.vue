<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotificacoesStore } from '@/stores/notificacoes';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import Select from '@/components/ui/Select.vue';
import Table from '@/components/ui/Table.vue';

const store = useNotificacoesStore();
const toast = useToast();
const { regras, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const canais = [
    { value: 'in_app', label: 'In-app' },
    { value: 'email', label: 'E-mail' },
];

const columns = [
    { key: 'evento', label: 'Evento' },
    { key: 'canal', label: 'Canal' },
    { key: 'ativo', label: 'Ativo', class: 'text-right' },
];

async function onToggleAtivo(id: string, ativo: boolean) {
    const regra = regras.value.find((r) => r.id === id)!;
    try {
        await store.update(regra, { ativo });
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao atualizar regra');
    }
}

async function onChangeCanal(id: string, canal: string) {
    const regra = regras.value.find((r) => r.id === id)!;
    try {
        await store.update(regra, { canal: canal as 'email' | 'in_app' });
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao atualizar regra');
    }
}
</script>

<template>
    <PageHeader title="Notificações" subtitle="E-mail / in-app por evento" />

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <Table v-else :columns="columns" :rows="regras">
        <template #cell.evento="{ value }">
            <span class="font-medium text-primary-dark capitalize">{{ String(value).replace(/_/g, ' ') }}</span>
        </template>
        <template #cell.canal="{ row }">
            <Select
                class="w-32"
                :model-value="(row as any).canal"
                :options="canais"
                @update:model-value="onChangeCanal((row as any).id, $event)"
            />
        </template>
        <template #cell.ativo="{ row }">
            <label class="inline-flex items-center justify-end gap-2 cursor-pointer w-full">
                <span class="text-xs text-gray-500">{{ (row as any).ativo ? 'Ativo' : 'Inativo' }}</span>
                <input
                    type="checkbox"
                    class="h-4 w-4 rounded accent-primary cursor-pointer"
                    :checked="(row as any).ativo"
                    @change="onToggleAtivo((row as any).id, ($event.target as HTMLInputElement).checked)"
                />
            </label>
        </template>
    </Table>
</template>
