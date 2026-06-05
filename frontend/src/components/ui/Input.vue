<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps<{
    modelValue?: string | number;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    id?: string;
}>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
    <input
        :id="id"
        :type="type ?? 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :class="
            cn(
                'h-10 w-full rounded-md border border-divider bg-surface px-3 text-sm focus:border-primary-medium focus:outline-none disabled:opacity-50',
                invalid && 'border-danger',
            )
        "
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>
