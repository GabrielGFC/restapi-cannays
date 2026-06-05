<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
        size?: 'sm' | 'md' | 'lg';
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
    }>(),
    { variant: 'primary', size: 'md', type: 'button' },
);

const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary-medium',
    secondary: 'border border-primary text-primary hover:bg-primary-light',
    ghost: 'text-ink hover:bg-divider',
    danger: 'bg-danger text-white hover:bg-danger/90',
};
const sizes: Record<string, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
};
</script>

<template>
    <button
        :type="props.type"
        :disabled="props.disabled"
        :class="
            cn(
                'inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed',
                variants[props.variant],
                sizes[props.size],
            )
        "
    >
        <slot />
    </button>
</template>
