<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useAssociacaoStore } from '@/stores/associacao';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Button from '@/components/ui/Button.vue';

const store = useAssociacaoStore();
const toast = useToast();
const submitting = ref(false);

const form = reactive({
    nome: '',
    cnpj: '',
    endereco: '',
    logo_url: '',
});

watch(
    () => store.associacao,
    (a) => {
        if (!a) return;
        form.nome = a.nome ?? '';
        form.cnpj = a.cnpj ?? '';
        form.endereco = a.endereco ?? '';
        form.logo_url = a.logo_url ?? '';
    },
);

onMounted(() => store.fetch());

async function onSubmit() {
    submitting.value = true;
    try {
        await store.save(form);
        toast.success('Dados da associação salvos');
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao salvar');
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <PageHeader title="Dados da Associação" subtitle="Nome, CNPJ, endereço, logo" />

    <LoadingState v-if="store.loading" />
    <Card v-else>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
            <div>
                <Label for="nome" required>Nome</Label>
                <Input id="nome" v-model="form.nome" />
            </div>
            <div>
                <Label for="cnpj" required>CNPJ</Label>
                <Input id="cnpj" v-model="form.cnpj" />
            </div>
            <div class="md:col-span-2">
                <Label for="endereco">Endereço</Label>
                <Input id="endereco" v-model="form.endereco" />
            </div>
            <div class="md:col-span-2">
                <Label for="logo">URL do logo</Label>
                <Input id="logo" v-model="form.logo_url" placeholder="https://..." />
            </div>
            <div class="md:col-span-2 flex justify-end pt-2">
                <Button type="submit" :disabled="submitting">
                    {{ submitting ? 'Salvando...' : 'Salvar' }}
                </Button>
            </div>
        </form>
    </Card>
</template>
