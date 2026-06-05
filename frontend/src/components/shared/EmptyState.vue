<script setup lang="ts">
import { Inbox } from 'lucide-vue-next';

defineProps<{
    title: string;
    description?: string;
    actionLabel?: string;
}>();

defineEmits<{ action: [] }>();
</script>

<template>
    <div class="flex flex-col items-center justify-center py-16 text-center">
        <div class="rounded-full bg-primary-light p-4 mb-4">
            <Inbox class="w-8 h-8 text-primary" />
        </div>
        <h3 class="text-lg font-semibold text-ink">{{ title }}</h3>
        <p v-if="description" class="text-sm text-ink/70 mt-2 max-w-md">
            {{ description }}
        </p>
        <button
            v-if="actionLabel"
            type="button"
            class="mt-6 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-medium transition"
            @click="$emit('action')"
        >
            {{ actionLabel }}
        </button>
    </div>
</template>
