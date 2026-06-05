<script setup lang="ts">
import Card from './Card.vue';

defineProps<{
    label: string;
    value: string | number;
    hint?: string;
}>();
</script>

<template>
    <Card>
        <p class="text-xs uppercase tracking-wide text-ink/60">{{ label }}</p>
        <p class="text-3xl font-bold text-primary mt-2">{{ value }}</p>
        <p v-if="hint" class="text-xs text-ink/60 mt-1">{{ hint }}</p>
    </Card>
</template>
