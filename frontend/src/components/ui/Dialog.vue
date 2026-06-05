<script setup lang="ts">
defineProps<{ open: boolean; title?: string }>();
defineEmits<{ close: [] }>();
</script>

<template>
    <Teleport to="body">
        <div
            v-if="open"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
            @click.self="$emit('close')"
        >
            <div class="bg-surface rounded-lg shadow-xl w-full max-w-md mx-4">
                <header
                    v-if="title"
                    class="px-6 py-4 border-b border-divider font-semibold"
                >
                    {{ title }}
                </header>
                <div class="p-6">
                    <slot />
                </div>
                <footer
                    v-if="$slots.footer"
                    class="px-6 py-4 border-t border-divider flex justify-end gap-2"
                >
                    <slot name="footer" />
                </footer>
            </div>
        </div>
    </Teleport>
</template>
