<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRhStore } from '@/stores/rh';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import Card from '@/components/ui/Card.vue';

const route = useRoute();
const store = useRhStore();
const { membros, loading } = storeToRefs(store);

onMounted(async () => {
    if (!membros.value.length) await store.fetchAll();
});

const membro = computed(() => membros.value.find((m) => m.id === route.params.id));
</script>

<template>
    <PageHeader title="Perfil do membro" />
    <LoadingState v-if="loading" />
    <Card v-else-if="membro">
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><dt class="text-ink/60">Nome</dt><dd class="font-medium">{{ membro.nome }}</dd></div>
            <div><dt class="text-ink/60">E-mail</dt><dd>{{ membro.email }}</dd></div>
            <div><dt class="text-ink/60">Função</dt><dd>{{ membro.funcao }}</dd></div>
            <div><dt class="text-ink/60">Tipo</dt><dd>{{ membro.tipo }}</dd></div>
        </dl>
    </Card>
    <p v-else class="text-ink/60">Membro não encontrado.</p>
</template>
