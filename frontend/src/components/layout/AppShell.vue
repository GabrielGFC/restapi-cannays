<script setup lang="ts">
import MainSidebar from './MainSidebar.vue';
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <MainSidebar />
        <main class="flex-1 overflow-y-auto bg-surface">
            <div class="max-w-7xl mx-auto px-6 py-6">
                <RouterView />
            </div>
        </main>
    </div>
</template>
