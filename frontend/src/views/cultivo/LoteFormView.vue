<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCultivoStore } from '@/stores/cultivo';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Textarea from '@/components/ui/Textarea.vue';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const store = useCultivoStore();
const toast = useToast();

const form = reactive({
    especie: '',
    data_plantio: '',
    responsavel_id: '',
    quantidade_plantas: 0,
    local_cultivo: '',
    observacoes: '',
});
const submitting = ref(false);

async function onSubmit() {
    submitting.value = true;
    try {
        await store.create(form);
        toast.success('Lote criado');
        router.push('/cultivo');
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao criar lote');
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <PageHeader title="Novo lote de cultivo" />
    <Card>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
            <div>
                <Label for="especie" required>Espécie / Cultivar</Label>
                <Input id="especie" v-model="form.especie" />
            </div>
            <div>
                <Label for="plantio" required>Data de plantio</Label>
                <Input id="plantio" v-model="form.data_plantio" type="date" />
            </div>
            <div>
                <Label for="responsavel" required>Responsável (ID)</Label>
                <Input id="responsavel" v-model="form.responsavel_id" />
            </div>
            <div>
                <Label for="qtd" required>Quantidade de plantas</Label>
                <Input
                    id="qtd"
                    v-model.number="form.quantidade_plantas"
                    type="number"
                    :min="1"
                />
            </div>
            <div class="md:col-span-2">
                <Label for="local" required>Local de cultivo</Label>
                <Input id="local" v-model="form.local_cultivo" />
            </div>
            <div class="md:col-span-2">
                <Label for="obs">Observações</Label>
                <Textarea id="obs" v-model="form.observacoes" />
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
