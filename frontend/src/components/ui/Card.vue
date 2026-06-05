<script setup lang="ts">
import { cn } from '@/lib/utils';
defineProps<{ padded?: boolean }>();
</script>

<template>
    <div
        :class="
            cn(
                'rounded-lg border border-divider bg-surface shadow-sm',
                padded !== false && 'p-6',
            )
        "
    >
        <slot />
    </div>
</template>
