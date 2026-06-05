<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Mail, Lock } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { useToast } from '@/composables/useToast';
import AuthShell from './AuthShell.vue';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const toast = useToast();

const form = reactive({ email: '', password: '' });
const error = ref<string | null>(null);
const loading = ref(false);

async function onSubmit() {
    error.value = null;
    loading.value = true;
    try {
        await login(form.email, form.password);
        toast.success('Bem-vindo de volta');
        router.replace((route.query.redirect as string) ?? '/');
    } catch (e: any) {
        error.value = e?.response?.data?.message ?? 'Credenciais inválidas';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <AuthShell>
        <h1 class="auth-card__title">Bem vindo!</h1>

        <form class="auth-form" novalidate @submit.prevent="onSubmit">
            <label class="auth-field">
                <Mail :size="22" class="auth-field__icon" aria-hidden="true" />
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                    autocomplete="email"
                    aria-label="Email"
                    required
                />
            </label>

            <label class="auth-field">
                <Lock :size="22" class="auth-field__icon" aria-hidden="true" />
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Senha"
                    autocomplete="current-password"
                    aria-label="Senha"
                    required
                />
            </label>

            <router-link to="/forgot-password" class="auth-forgot">
                Esqueci minha senha
            </router-link>

            <p v-if="error" class="auth-error" role="alert">{{ error }}</p>

            <router-link to="/register" class="auth-btn auth-btn--ghost">
                Cadastrar
            </router-link>

            <button
                type="submit"
                class="auth-btn auth-btn--primary"
                :disabled="loading"
                :aria-busy="loading || undefined"
            >
                {{ loading ? 'Entrando…' : 'Entrar' }}
            </button>
        </form>
    </AuthShell>
</template>
