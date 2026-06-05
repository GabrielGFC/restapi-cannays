<script setup lang="ts">
import Badge from './Badge.vue';

defineProps<{
    label: string;
    value: string | number;
    hint?: string;
    icon?: any;
    trend?: 'up' | 'down' | 'flat';
    trendValue?: string;
}>();
</script>

<template>
    <div class="rounded-xl bg-white ring-1 ring-gray-200 p-5 transition hover:shadow-md hover:-translate-y-0.5">
        <div class="flex items-start justify-between mb-3">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {{ label }}
            </p>
            <div
                v-if="icon"
                class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary"
            >
                <component :is="icon" :size="18" />
            </div>
        </div>
        <p class="text-3xl font-bold text-primary-dark leading-none">{{ value }}</p>
        <div class="flex items-center gap-2 mt-3 min-h-[20px]">
            <Badge
                v-if="trend"
                :color="trend === 'up' ? 'green' : trend === 'down' ? 'red' : 'gray'"
                variant="soft"
                size="xs"
            >
                <span>{{ trend === 'up' ? '▲' : trend === 'down' ? '▼' : '■' }}</span>
                {{ trendValue }}
            </Badge>
            <span v-if="hint" class="text-xs text-gray-500">{{ hint }}</span>
        </div>
    </div>
</template>
