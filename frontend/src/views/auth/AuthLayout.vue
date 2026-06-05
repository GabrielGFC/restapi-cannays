<script setup lang="ts">
import logoUrl from '@/assets/img/logo.svg';

defineProps<{
    eyebrow?: string;
    heading: string;
    subheading?: string;
}>();
</script>

<template>
    <main class="min-h-screen bg-background flex">
        <!-- LEFT: brand panel (hidden on mobile) -->
        <aside
            class="relative hidden lg:flex flex-col justify-between
                   w-[44%] xl:w-[48%] p-12 xl:p-16
                   bg-gradient-to-br from-primary-50 via-background to-background overflow-hidden"
            aria-hidden="true"
        >
            <!-- Subtle ambient blobs (full brand palette, low opacity) -->
            <div
                class="pointer-events-none absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full
                       bg-primary/[0.08] blur-3xl"
            />
            <div
                class="pointer-events-none absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full
                       bg-mulberry/[0.10] blur-3xl"
            />
            <div
                class="pointer-events-none absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full
                       bg-accent/[0.12] blur-3xl"
            />

            <div class="relative flex items-center gap-3">
                <img :src="logoUrl" alt="" class="w-10 h-auto" />
                <span class="font-display text-[22px] tracking-wide text-ink-strong">CANNASYS</span>
            </div>

            <div class="relative max-w-md">
                <p v-if="eyebrow" class="text-[13px] font-medium uppercase tracking-[0.14em] text-primary">
                    {{ eyebrow }}
                </p>
                <h2 class="mt-3 text-[40px] xl:text-[44px] font-semibold leading-[1.1] tracking-tight text-text-primary">
                    {{ heading }}
                </h2>
                <p v-if="subheading" class="mt-4 text-[16px] leading-relaxed text-text-secondary">
                    {{ subheading }}
                </p>
            </div>

            <p class="relative text-[12px] text-text-tertiary">
                © {{ new Date().getFullYear() }} CannaSYS — Gestão para associações canábicas.
            </p>
        </aside>

        <!-- RIGHT: form -->
        <section class="flex-1 flex items-center justify-center px-6 py-12 sm:px-10">
            <div class="w-full max-w-[440px]">
                <!-- Mobile-only header -->
                <header class="lg:hidden mb-8 flex items-center gap-3">
                    <img :src="logoUrl" alt="" class="w-8 h-auto" />
                    <span class="font-display text-[18px] tracking-wide text-ink-strong">CANNASYS</span>
                </header>

                <slot />
            </div>
        </section>
    </main>
</template>
