<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import { Building2, Users, Shield, Bell, Plug, FileSearch, Database } from 'lucide-vue-next';

const sections = [
    { icon: Building2, title: 'Dados da Associação', desc: 'Nome, CNPJ, endereço, logo' },
    { icon: Users, title: 'Gestão de usuários', desc: 'Lista, perfil e status' },
    { icon: Shield, title: 'Permissões por perfil', desc: 'Matriz perfil × funcionalidade' },
    { icon: Bell, title: 'Notificações', desc: 'E-mail / in-app por evento' },
    { icon: Plug, title: 'Integrações', desc: 'APIs externas (pagamento, fornecedores)' },
    { icon: FileSearch, title: 'Logs de auditoria', desc: 'Todas as ações do sistema' },
    { icon: Database, title: 'Backup e Segurança', desc: '2FA, sessões ativas, backup' },
];
</script>

<template>
    <PageHeader title="Configurações" subtitle="Área administrativa" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
            v-for="s in sections"
            :key="s.title"
            class="hover:border-primary-medium cursor-pointer transition"
        >
            <div class="flex items-start gap-3">
                <div class="rounded-md bg-primary-light p-2">
                    <component :is="s.icon" class="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 class="font-semibold">{{ s.title }}</h3>
                    <p class="text-sm text-ink/70 mt-1">{{ s.desc }}</p>
                </div>
            </div>
        </Card>
    </div>
</template>
