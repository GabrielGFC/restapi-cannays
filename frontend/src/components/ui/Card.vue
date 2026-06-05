<script setup lang="ts">
import { cn } from '@/lib/utils';
defineProps<{ padded?: boolean }>();
</script>

<template>
    <div
        :class="
            cn(
                'rounded-xl bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden',
            )
        "
    >
        <div v-if="$slots.header" class="px-5 py-4 border-b border-gray-100">
            <slot name="header" />
        </div>
        <div :class="cn(padded === false ? '' : 'p-5')">
            <slot />
        </div>
        <div v-if="$slots.footer" class="px-5 py-3 border-t border-gray-100 bg-gray-50">
            <slot name="footer" />
        </div>
    </div>
</template>
