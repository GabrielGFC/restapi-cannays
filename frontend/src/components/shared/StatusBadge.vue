<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    label: string;
}>();

const styles: Record<string, string> = {
    success: 'bg-success/10 text-success border-success/30',
    warning: 'bg-warning/10 text-warning border-warning/30',
    danger: 'bg-danger/10 text-danger border-danger/30',
    info: 'bg-primary-medium/10 text-primary-medium border-primary-medium/30',
    neutral: 'bg-divider text-ink/70 border-divider',
};
</script>

<template>
    <span
        :class="
            cn(
                'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border',
                styles[props.variant ?? 'neutral'],
            )
        "
    >
        {{ label }}
    </span>
</template>
