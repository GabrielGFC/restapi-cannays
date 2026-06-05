<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import { Sprout, FlaskConical, Package, UserCheck } from 'lucide-vue-next';

const steps = [
    { icon: Sprout, title: 'Cultivo', desc: 'Espécie · Plantio · Responsável' },
    { icon: FlaskConical, title: 'Produção', desc: 'Método · Rendimento · Data' },
    { icon: Package, title: 'Frascos', desc: 'Código · Volume · Validade' },
    { icon: UserCheck, title: 'Dispensação', desc: 'Paciente · Data · Quantidade' },
];
</script>

<template>
    <PageHeader
        title="Rastreabilidade"
        subtitle="Cadeia completa: lote → produção → frasco → dispensação"
    />
    <ol class="space-y-4">
        <li v-for="(s, i) in steps" :key="i">
            <Card class="flex items-start gap-4">
                <div class="rounded-full bg-primary-light p-3">
                    <component :is="s.icon" class="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 class="font-semibold">{{ i + 1 }}. {{ s.title }}</h3>
                    <p class="text-sm text-ink/70">{{ s.desc }}</p>
                </div>
            </Card>
        </li>
    </ol>
</template>
