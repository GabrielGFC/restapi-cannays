<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useIntegracoesStore } from '@/stores/integracoes';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import Table from '@/components/ui/Table.vue';

const store = useIntegracoesStore();
const toast = useToast();
const { integracoes, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const tipos = [
    { value: 'pagamento', label: 'Pagamento' },
    { value: 'fornecedor', label: 'Fornecedor' },
    { value: 'outro', label: 'Outro' },
];

const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: '', class: 'text-right' },
];

const form = reactive({ nome: '', tipo: 'outro', chave_api: '' });
const submitting = ref(false);

async function onCreate() {
    if (!form.nome.trim()) {
        toast.error('Informe o nome da integração');
        return;
    }
    submitting.value = true;
    try {
        await store.create(form);
        toast.success('Integração cadastrada');
        form.nome = '';
        form.chave_api = '';
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao cadastrar integração');
    } finally {
        submitting.value = false;
    }
}

async function onToggle(i: (typeof integracoes.value)[number]) {
    try {
        await store.toggle(i);
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao atualizar integração');
    }
}

async function onRemove(id: string) {
    try {
        await store.remove(id);
        toast.success('Integração removida');
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao remover integração');
    }
}
</script>

<template>
    <PageHeader title="Integrações" subtitle="APIs externas (pagamento, fornecedores)" />

    <Card class="mb-4">
        <form class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" @submit.prevent="onCreate">
            <div>
                <Label for="nome" required>Nome</Label>
                <Input id="nome" v-model="form.nome" placeholder="Ex: Stripe" />
            </div>
            <div>
                <Label for="tipo" required>Tipo</Label>
                <Select id="tipo" v-model="form.tipo" :options="tipos" />
            </div>
            <div>
                <Label for="chave">Chave de API</Label>
                <Input id="chave" v-model="form.chave_api" placeholder="sk_..." />
            </div>
            <Button type="submit" :disabled="submitting">
                {{ submitting ? 'Salvando...' : 'Adicionar' }}
            </Button>
        </form>
    </Card>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <EmptyState v-else-if="!integracoes.length" title="Nenhuma integração cadastrada" />
    <Table v-else :columns="columns" :rows="integracoes">
        <template #cell.nome="{ row }">
            <span class="font-medium text-primary-dark">{{ (row as any).nome }}</span>
        </template>
        <template #cell.tipo="{ value }">
            <span class="capitalize text-gray-600">{{ value }}</span>
        </template>
        <template #cell.status="{ row }">
            <Badge :color="(row as any).ativo ? 'green' : 'gray'" variant="soft" size="sm">
                {{ (row as any).ativo ? 'Ativa' : 'Inativa' }}
            </Badge>
        </template>
        <template #cell.actions="{ row }">
            <div class="flex items-center justify-end gap-2">
                <Button size="sm" variant="secondary" @click="onToggle(row as any)">
                    {{ (row as any).ativo ? 'Desativar' : 'Ativar' }}
                </Button>
                <Button size="sm" variant="ghost" @click="onRemove((row as any).id)">Remover</Button>
            </div>
        </template>
    </Table>
</template>
