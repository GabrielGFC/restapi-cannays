<script setup lang="ts">
import MainSidebar from './MainSidebar.vue';
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-background">
        <MainSidebar />
        <main class="flex-1 overflow-y-auto">
            <div class="max-w-7xl mx-auto px-6 py-6 md:px-10 md:py-8">
                <RouterView />
            </div>
        </main>
    </div>
</template>
