<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        variant?: 'solid' | 'soft' | 'outline' | 'subtle';
        color?: 'primary' | 'accent' | 'mulberry' | 'gray' | 'red' | 'green' | 'amber' | 'blue';
        size?: 'xs' | 'sm' | 'md';
    }>(),
    { variant: 'soft', color: 'primary', size: 'sm' },
);

const sizes: Record<string, string> = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
};

const styles: Record<string, Record<string, string>> = {
    primary: {
        solid:   'bg-primary text-white',
        soft:    'bg-primary-50 text-primary-700',
        outline: 'ring-1 ring-inset ring-primary/30 text-primary',
        subtle:  'bg-primary/5 text-primary',
    },
    accent: {
        solid:   'bg-accent text-white',
        soft:    'bg-accent-50 text-accent-700',
        outline: 'ring-1 ring-inset ring-accent/30 text-accent-700',
        subtle:  'bg-accent/5 text-accent-700',
    },
    mulberry: {
        solid:   'bg-mulberry text-white',
        soft:    'bg-mulberry-50 text-mulberry',
        outline: 'ring-1 ring-inset ring-mulberry/30 text-mulberry',
        subtle:  'bg-mulberry-50/60 text-mulberry',
    },
    gray: {
        solid:   'bg-gray-700 text-white',
        soft:    'bg-gray-100 text-gray-700',
        outline: 'ring-1 ring-inset ring-gray-300 text-gray-700',
        subtle:  'bg-gray-50 text-gray-700',
    },
    red: {
        solid:   'bg-red-600 text-white',
        soft:    'bg-red-50 text-red-700',
        outline: 'ring-1 ring-inset ring-red-300 text-red-700',
        subtle:  'bg-red-50/60 text-red-700',
    },
    green: {
        solid:   'bg-green-600 text-white',
        soft:    'bg-green-50 text-green-700',
        outline: 'ring-1 ring-inset ring-green-300 text-green-700',
        subtle:  'bg-green-50/60 text-green-700',
    },
    amber: {
        solid:   'bg-amber-500 text-white',
        soft:    'bg-amber-50 text-amber-700',
        outline: 'ring-1 ring-inset ring-amber-300 text-amber-700',
        subtle:  'bg-amber-50/60 text-amber-700',
    },
    blue: {
        solid:   'bg-blue-600 text-white',
        soft:    'bg-blue-50 text-blue-700',
        outline: 'ring-1 ring-inset ring-blue-300 text-blue-700',
        subtle:  'bg-blue-50/60 text-blue-700',
    },
};
</script>

<template>
    <span
        :class="
            cn(
                'inline-flex items-center gap-1 rounded-full font-medium',
                sizes[props.size],
                styles[props.color][props.variant],
            )
        "
    >
        <slot />
    </span>
</template>
