<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        src?: string;
        alt?: string;
        size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
        name?: string;
    }>(),
    { size: 'md' },
);

const initials = computed(() => {
    if (!props.name) return '';
    const parts = props.name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
});

const sizes: Record<string, string> = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
};
</script>

<template>
    <span
        :class="
            cn(
                'inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold overflow-hidden ring-2 ring-white',
                sizes[props.size],
            )
        "
    >
        <img v-if="src" :src="src" :alt="alt ?? name" class="w-full h-full object-cover" />
        <span v-else>{{ initials }}</span>
    </span>
</template>
