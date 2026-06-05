<script setup lang="ts">
defineProps<{ for?: string; required?: boolean }>();
</script>

<template>
    <label :for="$props.for" class="block text-sm font-medium text-ink mb-1">
        <slot />
        <span v-if="required" class="text-danger">*</span>
    </label>
</template>
