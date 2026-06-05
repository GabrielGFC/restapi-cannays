<script setup lang="ts">
import { computed, useId } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        modelValue?: string | number;
        label: string;
        type?: string;
        placeholder?: string;
        autocomplete?: string;
        required?: boolean;
        disabled?: boolean;
        error?: string | null;
        hint?: string;
        size?: 'md' | 'lg';
    }>(),
    { type: 'text', size: 'md' },
);
defineEmits<{ 'update:modelValue': [value: string] }>();

const fieldId = useId();
const errorId = computed(() => `${fieldId}-error`);
const hintId = computed(() => `${fieldId}-hint`);
const describedBy = computed(() =>
    [props.error ? errorId.value : null, props.hint ? hintId.value : null]
        .filter(Boolean)
        .join(' ') || undefined,
);

const sizes = {
    md: 'h-11 text-[15px]',
    lg: 'h-12 text-[16px]',
};
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <label
            :for="fieldId"
            class="text-[13px] font-medium text-text-secondary leading-none"
        >
            {{ label }}
            <span v-if="required" class="text-error" aria-hidden="true">*</span>
        </label>

        <div
            :class="
                cn(
                    'group flex items-center gap-3 w-full rounded-input bg-surface px-3.5 transition-shadow ring-1 ring-inset ring-border',
                    'focus-within:ring-2 focus-within:ring-primary',
                    error && 'ring-error focus-within:ring-error',
                    disabled && 'opacity-60 cursor-not-allowed bg-surface-muted',
                    sizes[size],
                )
            "
        >
            <span v-if="$slots.leading" class="text-text-tertiary flex-shrink-0">
                <slot name="leading" />
            </span>
            <input
                :id="fieldId"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :required="required"
                :disabled="disabled"
                :aria-invalid="error ? 'true' : undefined"
                :aria-describedby="describedBy"
                class="flex-1 min-w-0 bg-transparent border-none outline-none text-text-primary placeholder:text-text-tertiary"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
            <span v-if="$slots.trailing" class="text-text-tertiary flex-shrink-0">
                <slot name="trailing" />
            </span>
        </div>

        <p
            v-if="error"
            :id="errorId"
            class="text-[13px] text-error leading-snug"
            role="alert"
        >
            {{ error }}
        </p>
        <p
            v-else-if="hint"
            :id="hintId"
            class="text-[13px] text-text-tertiary leading-snug"
        >
            {{ hint }}
        </p>
    </div>
</template>
