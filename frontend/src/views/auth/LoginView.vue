<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useToast } from '@/composables/useToast';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const toast = useToast();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

async function onSubmit() {
    loading.value = true;
    error.value = null;
    try {
        await login(email.value, password.value);
        toast.success('Login realizado');
        router.replace((route.query.redirect as string) ?? '/');
    } catch (e: any) {
        error.value = e?.response?.data?.message ?? 'Credenciais inválidas';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-primary-light/40 px-4">
        <Card class="w-full max-w-md">
            <h1 class="text-2xl font-bold text-primary text-center mb-2">CannaSYS</h1>
            <p class="text-sm text-center text-ink/70 mb-6">
                Acesso ao sistema da associação
            </p>
            <form class="space-y-4" @submit.prevent="onSubmit">
                <div>
                    <Label for="email" required>E-mail</Label>
                    <Input
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="voce@associacao.org"
                        :invalid="!!error"
                    />
                </div>
                <div>
                    <Label for="password" required>Senha</Label>
                    <Input
                        id="password"
                        v-model="password"
                        type="password"
                        :invalid="!!error"
                    />
                </div>
                <p v-if="error" class="text-sm text-danger" role="alert">{{ error }}</p>
                <Button type="submit" :disabled="loading" class="w-full">
                    {{ loading ? 'Entrando...' : 'Entrar' }}
                </Button>
            </form>
        </Card>
    </div>
</template>
