<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
        size?: 'sm' | 'md' | 'lg';
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
        block?: boolean;
    }>(),
    { variant: 'primary', size: 'md', type: 'button' },
);

const variants: Record<string, string> = {
    primary: 'ui-btn--primary',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary-light/40',
    ghost: 'ui-btn--ghost',
    danger: 'ui-btn--danger',
};
const sizes: Record<string, string> = {
    sm: 'h-9 px-4 text-sm',
    md: '',
    lg: 'ui-btn--lg',
};
</script>

<template>
    <button
        :type="props.type"
        :disabled="props.disabled"
        :class="
            cn(
                'ui-btn',
                variants[props.variant],
                sizes[props.size],
                props.block && 'ui-btn--block',
            )
        "
    >
        <slot />
    </button>
</template>
