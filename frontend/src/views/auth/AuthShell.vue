<script setup lang="ts">
import logoUrl from '@/assets/img/logo.svg';
</script>

<template>
    <div class="auth-shell">
        <!-- Decorative organic blobs (Figma style) -->
        <svg
            class="auth-shell__bg auth-shell__bg--tr"
            viewBox="0 0 600 600"
            preserveAspectRatio="xMaxYMin slice"
            aria-hidden="true"
        >
            <path fill="#026874"
                  d="M440,0 C540,40 600,160 580,300 C560,440 420,560 280,540 C140,520 60,380 100,240 C140,100 280,-40 440,0 Z" />
            <path fill="#75A38C" opacity="0.92"
                  d="M380,30 C480,80 540,200 520,320 C500,440 360,500 240,460 C120,420 60,300 100,180 C140,60 280,-20 380,30 Z" />
            <path fill="#062E2D" opacity="0.9"
                  d="M460,-40 C540,20 580,140 540,240 C500,340 380,380 280,340 C180,300 140,180 200,80 C260,-20 380,-100 460,-40 Z" />
            <path fill="#4C1041" opacity="0.85"
                  d="M560,160 C620,220 620,340 540,400 C460,460 360,420 320,340 C280,260 340,160 420,140 C500,120 540,140 560,160 Z" />
        </svg>

        <svg
            class="auth-shell__bg auth-shell__bg--bl"
            viewBox="0 0 600 600"
            preserveAspectRatio="xMinYMax slice"
            aria-hidden="true"
        >
            <path fill="#026874"
                  d="M160,560 C60,500 0,360 40,220 C80,80 220,0 360,40 C500,80 580,220 540,360 C500,500 360,580 220,580 C200,580 180,575 160,560 Z" />
            <path fill="#4C1041" opacity="0.9"
                  d="M80,460 C0,400 -40,260 20,160 C80,60 220,40 300,120 C380,200 360,340 280,420 C200,500 120,500 80,460 Z" />
            <path fill="#75A38C" opacity="0.92"
                  d="M260,580 C160,540 100,420 140,300 C180,180 320,140 420,200 C520,260 540,400 480,500 C420,600 320,620 260,580 Z" />
            <path fill="#062E2D" opacity="0.9"
                  d="M40,540 C-20,480 -40,360 40,300 C120,240 240,300 260,380 C280,460 200,540 120,560 C100,560 60,560 40,540 Z" />
        </svg>

        <!-- LEFT: brand identity -->
        <section class="auth-shell__brand">
            <img :src="logoUrl" alt="" class="auth-shell__logo" />
            <span class="auth-shell__wordmark">CANNASYS</span>
        </section>

        <!-- RIGHT: card slot -->
        <section class="auth-shell__panel">
            <div class="auth-card">
                <slot />
            </div>
        </section>
    </div>
</template>

<style scoped>
.auth-shell {
    position: relative;
    min-height: 100vh;
    background: #f1f1f1;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(1.5rem, 4vw, 4rem);
    padding: clamp(1.5rem, 4vw, 4rem);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

/* Decorative blobs */
.auth-shell__bg {
    position: absolute;
    width: clamp(420px, 42vw, 720px);
    height: clamp(420px, 42vw, 720px);
    pointer-events: none;
    z-index: 0;
}
.auth-shell__bg--tr { top: -14%; right: -10%; }
.auth-shell__bg--bl { bottom: -16%; left: -12%; }

/* Brand left side */
.auth-shell__brand {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
}
.auth-shell__logo {
    width: clamp(80px, 9vw, 140px);
    height: auto;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.18));
}
.auth-shell__wordmark {
    font-family: 'Amaranth', sans-serif;
    font-weight: 700;
    font-size: clamp(40px, 5vw, 64px);
    color: #062e2d;
    line-height: 1;
    letter-spacing: 0.02em;
}

/* Right panel */
.auth-shell__panel {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
}

/* Card */
.auth-card {
    width: 100%;
    max-width: 560px;
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.10);
    padding: clamp(2rem, 4vw, 3.5rem) clamp(1.75rem, 4vw, 3.25rem);
}

/* Title (used by children via :slotted) */
:deep(.auth-card__title) {
    font-weight: 700;
    color: #062e2d;
    font-size: clamp(26px, 2.6vw, 36px);
    text-align: center;
    margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
    letter-spacing: -0.01em;
}

/* Form */
:deep(.auth-form) {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

/* Field (soft inset look) */
:deep(.auth-field) {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    height: 64px;
    background: rgba(0, 0, 0, 0.025);
    border-radius: 14px;
    padding: 0 1.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    transition: background 0.15s, box-shadow 0.15s;
}
:deep(.auth-field:focus-within) {
    background: #fff;
    box-shadow: 0 0 0 2px #026874, 0 2px 4px rgba(0, 0, 0, 0.08);
}
:deep(.auth-field__icon) {
    color: rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
}
:deep(.auth-field input) {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    outline: none;
    font: inherit;
    font-size: 17px;
    color: #062e2d;
}
:deep(.auth-field input::placeholder) {
    color: rgba(0, 0, 0, 0.45);
}

/* Forgot link */
:deep(.auth-forgot) {
    align-self: flex-end;
    margin-top: -0.5rem;
    font-size: 0.9375rem;
    color: rgba(0, 0, 0, 0.55);
    text-decoration: none;
}
:deep(.auth-forgot:hover) {
    color: #026874;
    text-decoration: underline;
}

/* Error */
:deep(.auth-error) {
    background: #fdecea;
    color: #b3261e;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
}

/* Hint */
:deep(.auth-hint) {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.55);
    text-align: center;
    margin: -0.25rem 0 0;
}

/* Pill buttons */
:deep(.auth-btn) {
    height: 64px;
    border-radius: 32px;
    border: none;
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    font-size: 1.125rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background 0.15s, color 0.15s, transform 0.05s, box-shadow 0.15s;
}
:deep(.auth-btn:active) { transform: translateY(1px); }
:deep(.auth-btn--ghost) {
    background: #f4f4f4;
    color: rgba(0, 0, 0, 0.6);
}
:deep(.auth-btn--ghost:hover) {
    background: #ececec;
    color: #062e2d;
}
:deep(.auth-btn--primary) {
    background: #026874;
    color: #fff;
    box-shadow: 0 6px 16px rgba(2, 104, 116, 0.28);
}
:deep(.auth-btn--primary:hover:not(:disabled)) {
    background: #015560;
    box-shadow: 0 10px 22px rgba(2, 104, 116, 0.36);
}
:deep(.auth-btn--primary:disabled) {
    opacity: 0.65;
    cursor: not-allowed;
}

/* Responsive */
@media (max-width: 900px) {
    .auth-shell {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
    .auth-shell__bg { width: 360px; height: 360px; }
    .auth-shell__bg--tr { top: -10%; right: -20%; }
    .auth-shell__bg--bl { bottom: -12%; left: -20%; }
}
@media (max-width: 480px) {
    .auth-shell { padding: 1rem; }
    .auth-card { border-radius: 24px; }
    :deep(.auth-field), :deep(.auth-btn) { height: 56px; }
    :deep(.auth-field input), :deep(.auth-btn) { font-size: 1rem; }
}
</style>
