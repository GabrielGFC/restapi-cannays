<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Mail, Lock, User } from 'lucide-vue-next';
import { api } from '@/config/axios';
import { useToast } from '@/composables/useToast';
import logoUrl from '@/assets/img/logo.svg';

const router = useRouter();
const toast = useToast();

const nome = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

async function onSubmit() {
    error.value = null;
    if (password.value !== confirm.value) {
        error.value = 'As senhas não coincidem';
        return;
    }
    loading.value = true;
    try {
        await api.post('/auth/signup', {
            name: nome.value,
            email: email.value,
            password: password.value,
        });
        toast.success('Cadastro realizado! Faça login.');
        router.replace('/login');
    } catch (e: any) {
        error.value = e?.response?.data?.message ?? 'Falha ao cadastrar';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="auth">
        <svg class="auth__bg auth__bg--tr" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#026874" d="M460,80 C540,140 600,260 560,380 C520,500 380,580 260,540 C140,500 60,360 100,240 C140,120 280,40 380,40 C420,40 440,60 460,80 Z"/>
            <path fill="#75A38C" opacity="0.9" d="M380,40 C460,80 520,180 500,280 C480,380 360,440 260,400 C160,360 100,240 140,160 C180,80 300,20 380,40 Z"/>
            <path fill="#062E2D" opacity="0.85" d="M440,0 C520,40 560,140 520,220 C480,300 360,340 280,300 C200,260 180,160 220,80 C260,0 380,-20 440,0 Z"/>
        </svg>
        <svg class="auth__bg auth__bg--bl" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#026874" d="M140,520 C60,460 0,340 40,220 C80,100 220,20 340,60 C460,100 540,240 500,360 C460,480 320,560 220,560 C180,560 160,540 140,520 Z"/>
            <path fill="#4A1B3D" opacity="0.85" d="M80,440 C20,400 -20,300 20,220 C60,140 180,100 260,140 C340,180 380,280 340,360 C300,440 180,480 100,460 C90,460 85,450 80,440 Z"/>
            <path fill="#75A38C" opacity="0.9" d="M220,560 C140,520 80,400 120,300 C160,200 280,140 380,180 C480,220 540,340 500,440 C460,540 340,600 240,580 C230,575 225,570 220,560 Z"/>
        </svg>

        <section class="auth__brand">
            <img :src="logoUrl" alt="CannaSYS" class="auth__logo" />
            <span class="auth__wordmark">CANNASYS</span>
        </section>

        <section class="auth__card-wrap">
            <div class="auth__card">
                <h1 class="auth__title">Criar conta</h1>

                <form class="auth__form" @submit.prevent="onSubmit">
                    <label class="auth__field">
                        <User :size="22" class="auth__field-icon" />
                        <input v-model="nome" type="text" placeholder="Nome completo" required />
                    </label>
                    <label class="auth__field">
                        <Mail :size="22" class="auth__field-icon" />
                        <input v-model="email" type="email" placeholder="Email" autocomplete="email" required />
                    </label>
                    <label class="auth__field">
                        <Lock :size="22" class="auth__field-icon" />
                        <input v-model="password" type="password" placeholder="Senha" autocomplete="new-password" required />
                    </label>
                    <label class="auth__field">
                        <Lock :size="22" class="auth__field-icon" />
                        <input v-model="confirm" type="password" placeholder="Confirmar senha" autocomplete="new-password" required />
                    </label>

                    <p class="auth__hint">
                        Mínimo 8 caracteres — com maiúscula, minúscula, número e símbolo.
                    </p>

                    <p v-if="error" class="auth__error" role="alert">{{ error }}</p>

                    <div class="auth__actions">
                        <router-link to="/login" class="auth__btn auth__btn--ghost">
                            Já tenho conta
                        </router-link>
                        <button type="submit" class="auth__btn auth__btn--primary" :disabled="loading">
                            {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<style scoped>
.auth {
    position: relative;
    min-height: 100vh;
    background: #f1f1f1;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(1rem, 4vw, 4rem);
    padding: clamp(1.5rem, 4vw, 4rem);
    font-family: 'Inter', system-ui, sans-serif;
}
.auth__bg {
    position: absolute;
    width: clamp(420px, 45vw, 720px);
    height: clamp(420px, 45vw, 720px);
    pointer-events: none;
    z-index: 0;
}
.auth__bg--tr { top: -18%; right: -14%; }
.auth__bg--bl { bottom: -22%; left: -16%; }

.auth__brand {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
}
.auth__logo {
    width: clamp(80px, 9vw, 140px);
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
}
.auth__wordmark {
    font-family: 'Amaranth', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(40px, 5vw, 64px);
    color: #062e2d;
    line-height: 1;
}

.auth__card-wrap { position: relative; z-index: 2; display: flex; justify-content: center; }
.auth__card {
    width: 100%;
    max-width: 540px;
    background: #fff;
    border-radius: 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    padding: clamp(2rem, 4vw, 3rem) clamp(1.75rem, 4vw, 3rem);
}
.auth__title {
    font-weight: 700;
    color: #062e2d;
    font-size: clamp(24px, 2.4vw, 32px);
    text-align: center;
    margin: 0 0 clamp(1.25rem, 2.5vw, 2rem);
}

.auth__form { display: flex; flex-direction: column; gap: 1rem; }

.auth__field {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    height: 56px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    padding: 0 1.25rem;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: background 0.15s, box-shadow 0.15s;
}
.auth__field:focus-within {
    background: #fff;
    box-shadow: 0 0 0 2px #026874;
}
.auth__field-icon { color: rgba(0, 0, 0, 0.5); flex-shrink: 0; }
.auth__field input {
    flex: 1; min-width: 0;
    border: none; background: transparent; outline: none;
    font: inherit; font-size: 1rem; color: #062e2d;
}
.auth__field input::placeholder { color: rgba(0, 0, 0, 0.45); }

.auth__hint {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.55);
    text-align: center;
    margin: -0.25rem 0 0;
}
.auth__error {
    background: #fdecea; color: #b3261e;
    border-radius: 10px; padding: 0.625rem 0.875rem;
    font-size: 0.875rem; text-align: center; margin: 0;
}

.auth__actions { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem; }
.auth__btn {
    height: 56px;
    border-radius: 28px;
    border: none; cursor: pointer;
    font: inherit; font-weight: 500; font-size: 1rem;
    display: inline-flex; align-items: center; justify-content: center;
    text-decoration: none;
    transition: background 0.15s, color 0.15s, transform 0.05s, box-shadow 0.15s;
}
.auth__btn:active { transform: translateY(1px); }
.auth__btn--ghost { background: #f4f4f4; color: rgba(0, 0, 0, 0.6); }
.auth__btn--ghost:hover { background: #ececec; color: #062e2d; }
.auth__btn--primary {
    background: #026874; color: #fff;
    box-shadow: 0 6px 14px rgba(2, 104, 116, 0.25);
}
.auth__btn--primary:hover:not(:disabled) {
    background: #015560;
    box-shadow: 0 8px 18px rgba(2, 104, 116, 0.35);
}
.auth__btn--primary:disabled { opacity: 0.65; cursor: not-allowed; }

@media (max-width: 900px) {
    .auth {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
    .auth__bg { width: 380px; height: 380px; }
    .auth__bg--tr { top: -10%; right: -22%; }
    .auth__bg--bl { bottom: -12%; left: -22%; }
}
@media (max-width: 480px) {
    .auth { padding: 1rem; }
    .auth__card { border-radius: 24px; }
}
</style>
