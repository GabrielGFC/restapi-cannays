<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const toast = useToast();
const form = reactive({
    nome: '',
    email: '',
    funcao: '',
    tipo: 'colaborador',
});

const tipos = [
    { value: 'colaborador', label: 'Colaborador' },
    { value: 'voluntario', label: 'Voluntário' },
    { value: 'medico', label: 'Médico conveniado' },
    { value: 'farmaceutico', label: 'Farmacêutico' },
    { value: 'administrador', label: 'Administrador' },
];

function onSubmit() {
    toast.success('Membro cadastrado (stub)');
    router.push('/rh');
}
</script>

<template>
    <PageHeader title="Novo membro" />
    <Card>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit">
            <div>
                <Label for="nome" required>Nome</Label>
                <Input id="nome" v-model="form.nome" />
            </div>
            <div>
                <Label for="email" required>E-mail</Label>
                <Input id="email" v-model="form.email" type="email" />
            </div>
            <div>
                <Label for="funcao" required>Função</Label>
                <Input id="funcao" v-model="form.funcao" />
            </div>
            <div>
                <Label for="tipo" required>Tipo</Label>
                <Select id="tipo" v-model="form.tipo" :options="tipos" />
            </div>
            <div class="md:col-span-2 flex justify-end gap-2 pt-2">
                <Button variant="ghost" type="button" @click="router.back()">Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </div>
        </form>
    </Card>
</template>
