<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProducaoStore } from '@/stores/producao';
import { useCultivoStore } from '@/stores/cultivo';
import { useUsersStore } from '@/stores/users';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const store = useProducaoStore();
const cultivoStore = useCultivoStore();
const usersStore = useUsersStore();
const auth = useAuthStore();
const toast = useToast();

const metodos = [
    { value: 'co2', label: 'CO2' },
    { value: 'etanol', label: 'Etanol' },
    { value: 'oleo_carreador', label: 'Óleo carreador' },
    { value: 'rosin', label: 'Rosin' },
];

const form = reactive({
    lote_id: '',
    metodo: 'co2',
    data: '',
    rendimento_ml: 0,
    responsavel_id: auth.user?.id ?? '',
});
const submitting = ref(false);

onMounted(async () => {
    await cultivoStore.fetchAll();
    usersStore.fetchAll();
    form.lote_id = cultivoStore.lotes[0]?.id ?? '';
});

async function onSubmit() {
    submitting.value = true;
    try {
        await store.create(form);
        toast.success('Produção registrada');
        router.push('/producao');
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao registrar produção');
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <PageHeader title="Nova extração" />
    <Card>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
            <div>
                <Label for="lote" required>Lote de origem</Label>
                <Select
                    id="lote"
                    v-model="form.lote_id"
                    :options="cultivoStore.lotes.map((l) => ({ value: l.id, label: l.especie }))"
                />
            </div>
            <div>
                <Label for="metodo" required>Método</Label>
                <Select id="metodo" v-model="form.metodo" :options="metodos" />
            </div>
            <div>
                <Label for="data" required>Data</Label>
                <Input id="data" v-model="form.data" type="date" />
            </div>
            <div>
                <Label for="rendimento" required>Rendimento (ml)</Label>
                <Input id="rendimento" v-model.number="form.rendimento_ml" type="number" :min="0" />
            </div>
            <div>
                <Label for="responsavel" required>Responsável</Label>
                <Select
                    id="responsavel"
                    v-model="form.responsavel_id"
                    :options="usersStore.users.map((u) => ({ value: u.id, label: u.name }))"
                />
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="ghost" type="button" @click="router.back()">Cancelar</Button>
                <Button type="submit" :disabled="submitting">
                    {{ submitting ? 'Salvando...' : 'Salvar' }}
                </Button>
            </div>
        </form>
    </Card>
</template>
