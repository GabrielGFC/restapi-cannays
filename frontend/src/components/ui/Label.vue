<script setup lang="ts">
import { cn } from '@/lib/utils';
defineProps<{ for?: string; required?: boolean }>();
</script>

<template>
    <label :for="$props.for" :class="cn('ui-label', required && 'ui-label--required')">
        <slot />
    </label>
</template>
