<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary' | 'ghost' | 'link';
        size?: 'sm' | 'md' | 'lg';
        type?: 'button' | 'submit' | 'reset';
        block?: boolean;
        loading?: boolean;
        disabled?: boolean;
    }>(),
    { variant: 'primary', size: 'md', type: 'button' },
);

const sizes: Record<string, string> = {
    sm: 'h-9  px-3.5 text-[13px] gap-1.5',
    md: 'h-11 px-5   text-[15px] gap-2',
    lg: 'h-12 px-6   text-[16px] gap-2',
};

/**
 * Strict hierarchy:
 *   primary   — single dominant action (teal solid)
 *   secondary — neutral surface, used beside a primary
 *   ghost     — text-only, lowest emphasis
 *   link      — inline text link
 */
const variants: Record<string, string> = {
    primary:
        'bg-primary text-white hover:bg-primary-hover active:bg-primary-active ' +
        'shadow-sm hover:shadow-md disabled:bg-primary disabled:opacity-50',
    secondary:
        'bg-surface text-text-primary ring-1 ring-inset ring-border ' +
        'hover:bg-surface-muted hover:ring-border-strong',
    ghost:
        'text-text-primary hover:bg-surface-muted',
    link:
        'text-primary hover:text-primary-hover hover:underline px-0 h-auto',
};
</script>

<template>
    <button
        :type="props.type"
        :disabled="props.disabled || props.loading"
        :aria-busy="props.loading || undefined"
        :class="
            cn(
                'inline-flex items-center justify-center rounded-button font-medium',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'disabled:cursor-not-allowed',
                sizes[props.size],
                variants[props.variant],
                props.block && 'w-full',
            )
        "
    >
        <span
            v-if="loading"
            class="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"
            aria-hidden="true"
        />
        <slot v-else name="leading" />
        <slot />
        <slot v-if="!loading" name="trailing" />
    </button>
</template>
