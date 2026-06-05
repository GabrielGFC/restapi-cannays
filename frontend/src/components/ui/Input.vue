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
    <div :class="cn('ui-field', invalid && 'ui-field--invalid')">
        <slot name="icon" />
        <input
            :id="id"
            :type="type ?? 'text'"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-invalid="invalid || undefined"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <slot name="suffix" />
    </div>
</template>
