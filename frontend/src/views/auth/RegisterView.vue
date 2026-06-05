<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Mail, Lock, User } from 'lucide-vue-next';
import { api } from '@/config/axios';
import { useToast } from '@/composables/useToast';
import AuthShell from './AuthShell.vue';

const router = useRouter();
const toast = useToast();

const form = reactive({ nome: '', email: '', password: '', confirm: '' });
const error = ref<string | null>(null);
const loading = ref(false);

async function onSubmit() {
    error.value = null;
    if (form.password !== form.confirm) {
        error.value = 'As senhas não coincidem';
        return;
    }
    loading.value = true;
    try {
        await api.post('/auth/signup', {
            name: form.nome,
            email: form.email,
            password: form.password,
        });
        toast.success('Cadastro realizado. Faça login.');
        router.replace('/login');
    } catch (e: any) {
        error.value = e?.response?.data?.message ?? 'Falha ao cadastrar';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <AuthShell>
        <h1 class="auth-card__title">Criar conta</h1>

        <form class="auth-form" novalidate @submit.prevent="onSubmit">
            <label class="auth-field">
                <User :size="22" class="auth-field__icon" aria-hidden="true" />
                <input v-model="form.nome" type="text" placeholder="Nome completo" required />
            </label>
            <label class="auth-field">
                <Mail :size="22" class="auth-field__icon" aria-hidden="true" />
                <input v-model="form.email" type="email" placeholder="Email" autocomplete="email" required />
            </label>
            <label class="auth-field">
                <Lock :size="22" class="auth-field__icon" aria-hidden="true" />
                <input v-model="form.password" type="password" placeholder="Senha" autocomplete="new-password" required />
            </label>
            <label class="auth-field">
                <Lock :size="22" class="auth-field__icon" aria-hidden="true" />
                <input v-model="form.confirm" type="password" placeholder="Confirmar senha" autocomplete="new-password" required />
            </label>

            <p class="auth-hint">
                Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo.
            </p>

            <p v-if="error" class="auth-error" role="alert">{{ error }}</p>

            <router-link to="/login" class="auth-btn auth-btn--ghost">
                Já tenho conta
            </router-link>

            <button
                type="submit"
                class="auth-btn auth-btn--primary"
                :disabled="loading"
                :aria-busy="loading || undefined"
            >
                {{ loading ? 'Cadastrando…' : 'Cadastrar' }}
            </button>
        </form>
    </AuthShell>
</template>
