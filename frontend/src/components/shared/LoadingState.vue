<script setup lang="ts">
withDefaults(defineProps<{ rows?: number }>(), { rows: 5 });
</script>

<template>
    <div class="space-y-3">
        <div
            v-for="i in rows"
            :key="i"
            class="h-12 rounded-md bg-divider/60 animate-pulse"
        />
    </div>
</template>
