<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import {
    LayoutDashboard,
    Sprout,
    FlaskConical,
    Stethoscope,
    Users,
    Settings,
    LogOut,
    PanelLeftClose,
    PanelLeft,
} from 'lucide-vue-next';
import { useConfigStore } from '@/stores/config';
import { useAuthStore } from '@/stores/auth';
import Avatar from '@/components/ui/Avatar.vue';
import logoUrl from '@/assets/img/logo.svg';

const config = useConfigStore();
const auth = useAuthStore();
const router = useRouter();
const { sidebarCollapsed } = storeToRefs(config);
const { user } = storeToRefs(auth);

const items = [
    { to: '/',              label: 'Dashboard',     icon: LayoutDashboard },
    { to: '/cultivo',       label: 'Cultivo',       icon: Sprout },
    { to: '/producao',      label: 'Produção',      icon: FlaskConical },
    { to: '/interacao',     label: 'Médico-Farma',  icon: Stethoscope },
    { to: '/rh',            label: 'RH',            icon: Users },
    { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

const displayName = computed(() => user.value?.nome ?? 'Convidado');
const displayEmail = computed(() => user.value?.email ?? '');

async function handleLogout() {
    auth.logout();
    await router.replace('/login');
}
</script>

<template>
    <!-- Outer column reserves space; inner is the floating panel -->
    <div
        :class="[
            'flex-shrink-0 transition-[width] duration-200 ease-out p-3 h-full',
            sidebarCollapsed ? 'w-[88px]' : 'w-[252px]',
        ]"
    >
        <aside
            class="relative h-full flex flex-col bg-white rounded-2xl shadow-sm ring-1 ring-border overflow-hidden"
        >
            <!-- Ambient mulberry glow at top + teal at bottom -->
            <div
                aria-hidden="true"
                class="pointer-events-none absolute -top-24 -right-16 w-[220px] h-[220px] rounded-full bg-mulberry/[0.10] blur-3xl"
            />
            <div
                aria-hidden="true"
                class="pointer-events-none absolute -bottom-28 -left-16 w-[220px] h-[220px] rounded-full bg-primary/[0.08] blur-3xl"
            />
            <!-- BRAND -->
            <div
                :class="[
                    'flex items-center h-16 border-b border-border/70',
                    sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4',
                ]"
            >
                <div class="relative flex items-center gap-2.5 min-w-0">
                    <img :src="logoUrl" alt="" class="w-8 h-8 flex-shrink-0" />
                    <span
                        v-if="!sidebarCollapsed"
                        class="font-display text-[18px] tracking-wider truncate bg-gradient-to-r from-primary-900 via-primary to-mulberry bg-clip-text text-transparent"
                    >
                        CANNASYS
                    </span>
                </div>
                <button
                    v-if="!sidebarCollapsed"
                    type="button"
                    class="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-muted transition"
                    aria-label="Recolher menu"
                    @click="config.toggleSidebar()"
                >
                    <PanelLeftClose :size="18" />
                </button>
            </div>

            <button
                v-if="sidebarCollapsed"
                type="button"
                class="mt-2 mx-auto p-2 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-muted transition"
                aria-label="Expandir menu"
                @click="config.toggleSidebar()"
            >
                <PanelLeft :size="18" />
            </button>

            <!-- NAV -->
            <nav class="flex-1 overflow-y-auto px-3 py-4">
                <p
                    v-if="!sidebarCollapsed"
                    class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
                >
                    Menu
                </p>
                <ul class="flex flex-col gap-0.5">
                    <li v-for="item in items" :key="item.to">
                        <RouterLink :to="item.to" v-slot="{ isActive, navigate, href }">
                            <a
                                :href="href"
                                :class="[
                                    'group relative flex items-center gap-3 rounded-xl text-[14px] font-medium transition-all duration-150',
                                    sidebarCollapsed ? 'justify-center h-11 mx-auto w-11' : 'px-3 h-10',
                                    isActive
                                        ? 'bg-gradient-to-r from-primary-soft via-primary-soft to-mulberry/[0.06] text-primary shadow-xs ring-1 ring-mulberry/15'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted',
                                ]"
                                :title="sidebarCollapsed ? item.label : undefined"
                                :aria-current="isActive ? 'page' : undefined"
                                @click="navigate"
                            >
                                <!-- Active accent bar -->
                                <span
                                    v-if="isActive && !sidebarCollapsed"
                                    class="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-primary to-mulberry"
                                    aria-hidden="true"
                                />
                                <component
                                    :is="item.icon"
                                    :size="18"
                                    :class="[
                                        'flex-shrink-0 transition-colors',
                                        isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-text-primary',
                                    ]"
                                />
                                <span v-if="!sidebarCollapsed" class="truncate">{{ item.label }}</span>
                            </a>
                        </RouterLink>
                    </li>
                </ul>
            </nav>

            <!-- USER + LOGOUT -->
            <div class="border-t border-border/70 p-3">
                <div
                    v-if="!sidebarCollapsed"
                    class="flex items-center gap-3 px-2 py-2 mb-1 rounded-xl"
                >
                    <Avatar :name="displayName" size="sm" />
                    <div class="flex-1 min-w-0">
                        <p class="text-[13px] font-medium text-text-primary truncate">{{ displayName }}</p>
                        <p v-if="displayEmail" class="text-[11px] text-text-tertiary truncate">{{ displayEmail }}</p>
                    </div>
                </div>

                <button
                    type="button"
                    :class="[
                        'group flex items-center gap-3 w-full rounded-xl text-[13px] font-medium transition-colors text-text-secondary hover:text-error hover:bg-error/[0.06]',
                        sidebarCollapsed ? 'justify-center h-11 mx-auto w-11' : 'px-3 h-10',
                    ]"
                    :title="sidebarCollapsed ? 'Sair' : undefined"
                    @click="handleLogout"
                >
                    <LogOut :size="18" class="flex-shrink-0" />
                    <span v-if="!sidebarCollapsed">Sair</span>
                </button>
            </div>
        </aside>
    </div>
</template>
