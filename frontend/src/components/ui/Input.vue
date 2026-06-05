<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        modelValue?: string | number;
        type?: string;
        placeholder?: string;
        disabled?: boolean;
        invalid?: boolean;
        id?: string;
        size?: 'sm' | 'md' | 'lg';
    }>(),
    { size: 'md' },
);
defineEmits<{ 'update:modelValue': [value: string] }>();

const sizes: Record<string, string> = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-11 text-base',
};
</script>

<template>
    <div
        :class="
            cn(
                'flex items-center gap-2 w-full rounded-md bg-white px-3 transition',
                'ring-1 ring-inset ring-gray-200',
                'focus-within:ring-2 focus-within:ring-primary',
                props.invalid && 'ring-red-300 focus-within:ring-red-500',
                props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
                sizes[props.size],
            )
        "
    >
        <span v-if="$slots.leading" class="text-gray-400 flex-shrink-0">
            <slot name="leading" />
        </span>
        <input
            :id="id"
            :type="type ?? 'text'"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-invalid="invalid || undefined"
            class="flex-1 min-w-0 bg-transparent border-none outline-none placeholder:text-gray-400 text-ink"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="$slots.trailing" class="text-gray-400 flex-shrink-0">
            <slot name="trailing" />
        </span>
    </div>
</template>
