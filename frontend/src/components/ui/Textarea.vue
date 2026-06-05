<script setup lang="ts">
defineProps<{
    modelValue?: string;
    placeholder?: string;
    rows?: number;
    id?: string;
}>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
    <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows ?? 4"
        class="w-full rounded-md border border-divider bg-surface px-3 py-2 text-sm focus:border-primary-medium focus:outline-none"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
</template>
