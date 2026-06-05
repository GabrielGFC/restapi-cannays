<script setup lang="ts">
import { cn } from '@/lib/utils';
defineProps<{ padded?: boolean; size?: 'md' | 'lg' }>();
</script>

<template>
    <div
        :class="
            cn(
                'ui-card',
                size === 'lg' && 'ui-card--lg',
                padded === false && '!p-0',
            )
        "
    >
        <slot />
    </div>
</template>
