<script setup lang="ts">
import {
    LayoutDashboard,
    Sprout,
    FlaskConical,
    Stethoscope,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
} from 'lucide-vue-next';
import { useConfigStore } from '@/stores/config';
import { useAuth } from '@/composables/useAuth';
import { cn } from '@/lib/utils';
import { storeToRefs } from 'pinia';

const config = useConfigStore();
const { sidebarCollapsed } = storeToRefs(config);
const { logout } = useAuth();

const items = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/cultivo', label: 'Cultivo', icon: Sprout },
    { to: '/producao', label: 'Produção', icon: FlaskConical },
    { to: '/interacao', label: 'Médico-Farma', icon: Stethoscope },
    { to: '/rh', label: 'RH', icon: Users },
    { to: '/configuracoes', label: 'Configurações', icon: Settings },
];
</script>

<template>
    <aside
        :class="
            cn(
                'flex flex-col bg-primary text-white transition-all duration-200',
                sidebarCollapsed ? 'w-16' : 'w-60',
            )
        "
    >
        <div class="flex items-center justify-between px-4 h-16 border-b border-white/10">
            <span v-if="!sidebarCollapsed" class="font-bold tracking-tight">CannaSYS</span>
            <button
                type="button"
                class="p-1 rounded hover:bg-white/10"
                :aria-label="sidebarCollapsed ? 'Expandir' : 'Recolher'"
                @click="config.toggleSidebar()"
            >
                <ChevronLeft
                    :class="cn('w-5 h-5 transition-transform', sidebarCollapsed && 'rotate-180')"
                />
            </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-3">
            <RouterLink
                v-for="item in items"
                :key="item.to"
                :to="item.to"
                v-slot="{ isActive }"
            >
                <a
                    :class="
                        cn(
                            'flex items-center gap-3 px-4 py-2.5 text-sm transition',
                            isActive
                                ? 'bg-white/15 border-l-2 border-white'
                                : 'hover:bg-white/10 border-l-2 border-transparent',
                        )
                    "
                >
                    <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
                    <span v-if="!sidebarCollapsed">{{ item.label }}</span>
                </a>
            </RouterLink>
        </nav>

        <button
            type="button"
            class="flex items-center gap-3 px-4 py-3 text-sm border-t border-white/10 hover:bg-white/10"
            @click="logout()"
        >
            <LogOut class="w-5 h-5 flex-shrink-0" />
            <span v-if="!sidebarCollapsed">Sair</span>
        </button>
    </aside>
</template>
