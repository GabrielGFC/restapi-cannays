<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from '@/config/axios';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Button from '@/components/ui/Button.vue';

const toast = useToast();
const form = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' });
const submitting = ref(false);

async function onSubmit() {
    if (form.newPassword !== form.confirmPassword) {
        toast.error('A confirmação não confere com a nova senha');
        return;
    }
    submitting.value = true;
    try {
        await api.put('/user/password', {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        });
        toast.success('Senha atualizada com sucesso');
        form.currentPassword = '';
        form.newPassword = '';
        form.confirmPassword = '';
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao atualizar senha');
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <PageHeader title="Backup e Segurança" subtitle="Alteração de senha" />

    <Card class="max-w-md">
        <form class="grid grid-cols-1 gap-4" @submit.prevent="onSubmit">
            <div>
                <Label for="current" required>Senha atual</Label>
                <Input id="current" v-model="form.currentPassword" type="password" />
            </div>
            <div>
                <Label for="new" required>Nova senha</Label>
                <Input id="new" v-model="form.newPassword" type="password" />
            </div>
            <div>
                <Label for="confirm" required>Confirmar nova senha</Label>
                <Input id="confirm" v-model="form.confirmPassword" type="password" />
            </div>
            <div class="flex justify-end pt-2">
                <Button type="submit" :disabled="submitting">
                    {{ submitting ? 'Salvando...' : 'Atualizar senha' }}
                </Button>
            </div>
        </form>
    </Card>

    <p class="text-xs text-gray-400 mt-4 max-w-md">
        2FA e gestão de sessões ativas exigem infraestrutura adicional (tokens de sessão persistentes)
        e ainda não estão disponíveis nesta versão.
    </p>
</template>
