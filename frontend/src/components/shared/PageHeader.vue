<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <header
        class="flex items-start justify-between gap-4 pb-6 border-b border-divider mb-6"
    >
        <div>
            <h1 class="text-2xl font-bold text-ink">{{ title }}</h1>
            <p v-if="subtitle" class="text-sm text-ink/70 mt-1">
                {{ subtitle }}
            </p>
        </div>
        <div class="flex items-center gap-2">
            <slot name="actions" />
        </div>
    </header>
</template>
