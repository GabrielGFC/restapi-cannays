<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInteracaoStore } from '@/stores/interacao';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Textarea from '@/components/ui/Textarea.vue';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const store = useInteracaoStore();
const toast = useToast();

const form = reactive({
    paciente_nome: '',
    medico_nome: '',
    farmaceutico_nome: '',
    produto: '',
    posologia: '',
    duracao_dias: 30,
    observacoes: '',
});
const submitting = ref(false);

async function onSubmit() {
    submitting.value = true;
    try {
        await store.create({
            paciente_nome: form.paciente_nome,
            medico_nome: form.medico_nome,
            farmaceutico_nome: form.farmaceutico_nome || null,
            observacoes: form.observacoes || null,
            itens: [
                {
                    produto: form.produto,
                    posologia: form.posologia,
                    duracao_dias: form.duracao_dias,
                },
            ],
        });
        toast.success('Receita enviada para validação');
        router.push('/interacao');
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao criar receita');
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <PageHeader title="Nova receita" />
    <Card>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
            <div>
                <Label for="paciente" required>Paciente</Label>
                <Input id="paciente" v-model="form.paciente_nome" />
            </div>
            <div>
                <Label for="medico" required>Médico</Label>
                <Input id="medico" v-model="form.medico_nome" />
            </div>
            <div>
                <Label for="farmaceutico">Farmacêutico</Label>
                <Input id="farmaceutico" v-model="form.farmaceutico_nome" />
            </div>
            <div>
                <Label for="produto" required>Produto</Label>
                <Input id="produto" v-model="form.produto" />
            </div>
            <div>
                <Label for="posologia" required>Posologia</Label>
                <Input id="posologia" v-model="form.posologia" />
            </div>
            <div>
                <Label for="duracao" required>Duração (dias)</Label>
                <Input id="duracao" v-model.number="form.duracao_dias" type="number" :min="1" />
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
