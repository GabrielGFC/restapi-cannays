<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';

defineProps<{ message: string }>();
defineEmits<{ retry: [] }>();
</script>

<template>
    <div
        class="rounded-md border border-danger/30 bg-danger/5 p-4 flex items-start gap-3"
        role="alert"
    >
        <AlertTriangle class="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
        <div class="flex-1">
            <p class="text-sm text-danger font-medium">{{ message }}</p>
            <button
                type="button"
                class="mt-2 text-sm underline text-danger hover:no-underline"
                @click="$emit('retry')"
            >
                Tentar novamente
            </button>
        </div>
    </div>
</template>
