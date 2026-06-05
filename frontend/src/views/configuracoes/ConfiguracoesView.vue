<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import Badge from '@/components/ui/Badge.vue';
import { Building2, Users, Shield, Bell, Plug, FileSearch, Database, ChevronRight } from 'lucide-vue-next';

const sections = [
    { icon: Building2, title: 'Dados da Associação', desc: 'Nome, CNPJ, endereço, logo', chip: { color: 'primary', label: '1 associação' } },
    { icon: Users, title: 'Gestão de usuários', desc: 'Lista, perfil e status', chip: { color: 'primary', label: '8 usuários' } },
    { icon: Shield, title: 'Permissões por perfil', desc: 'Matriz perfil × funcionalidade', chip: { color: 'gray', label: '5 perfis' } },
    { icon: Bell, title: 'Notificações', desc: 'E-mail / in-app por evento', chip: { color: 'amber', label: '12 regras' } },
    { icon: Plug, title: 'Integrações', desc: 'APIs externas (pagamento, fornecedores)', chip: { color: 'green', label: '3 ativas' } },
    { icon: FileSearch, title: 'Logs de auditoria', desc: 'Todas as ações do sistema', chip: { color: 'blue', label: '247 hoje' } },
    { icon: Database, title: 'Backup e Segurança', desc: '2FA, sessões ativas, backup', chip: { color: 'green', label: 'Atualizado' } },
] as const;
</script>

<template>
    <PageHeader title="Configurações" subtitle="Área administrativa" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
            v-for="s in sections"
            :key="s.title"
            type="button"
            class="group flex items-start gap-4 p-5 bg-white rounded-xl ring-1 ring-gray-200 text-left transition hover:-translate-y-0.5 hover:ring-primary/40 hover:shadow-md"
        >
            <div class="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <component :is="s.icon" :size="22" />
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-primary-dark leading-tight">{{ s.title }}</h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">{{ s.desc }}</p>
                <Badge :color="s.chip.color as any" variant="soft" size="xs" class="mt-3">
                    {{ s.chip.label }}
                </Badge>
            </div>
            <ChevronRight
                :size="18"
                class="text-gray-300 flex-shrink-0 mt-1 transition group-hover:text-primary group-hover:translate-x-0.5"
            />
        </button>
    </div>
</template>
