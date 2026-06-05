import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfigStore = defineStore(
    'config',
    () => {
        const sidebarCollapsed = ref(false);

        function toggleSidebar() {
            sidebarCollapsed.value = !sidebarCollapsed.value;
        }

        return { sidebarCollapsed, toggleSidebar };
    },
    { persist: true },
);
