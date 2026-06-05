<script setup lang="ts">
defineProps<{
    modelValue?: string | number;
    options: { value: string | number; label: string }[];
    id?: string;
    placeholder?: string;
}>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
    <select
        :id="id"
        :value="modelValue"
        class="h-10 w-full rounded-md border border-divider bg-surface px-3 text-sm focus:border-primary-medium focus:outline-none"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
        </option>
    </select>
</template>
