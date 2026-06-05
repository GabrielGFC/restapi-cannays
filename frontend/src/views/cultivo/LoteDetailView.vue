<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCultivoStore } from '@/stores/cultivo';
import { useToast } from '@/composables/useToast';
import { ETAPAS_CULTIVO } from '@/config/constants';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Select from '@/components/ui/Select.vue';
import type { EtapaCultivo } from '@/types/cultivo';

const route = useRoute();
const store = useCultivoStore();
const { lotes, loading, error } = storeToRefs(store);
const toast = useToast();
const novaEtapa = ref<EtapaCultivo>('plantio');

const lote = computed(() => lotes.value.find((l) => l.id === route.params.id));

onMounted(async () => {
    if (!lotes.value.length) await store.fetchAll();
    if (lote.value) novaEtapa.value = lote.value.etapa;
});

async function transition() {
    if (!lote.value) return;
    await store.transitionEtapa(lote.value.id, novaEtapa.value);
    toast.success('Etapa atualizada');
}
</script>

<template>
    <PageHeader title="Detalhe do lote" />
    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <Card v-else-if="lote">
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><dt class="text-ink/60">Espécie</dt><dd class="font-medium">{{ lote.especie }}</dd></div>
            <div><dt class="text-ink/60">Plantio</dt><dd>{{ lote.data_plantio }}</dd></div>
            <div><dt class="text-ink/60">Plantas</dt><dd>{{ lote.quantidade_plantas }}</dd></div>
            <div><dt class="text-ink/60">Local</dt><dd>{{ lote.local_cultivo }}</dd></div>
            <div>
                <dt class="text-ink/60">Etapa atual</dt>
                <dd><StatusBadge variant="info" :label="lote.etapa" /></dd>
            </div>
        </dl>

        <div class="border-t border-divider mt-6 pt-6">
            <h3 class="font-semibold mb-3">Transição de etapa</h3>
            <div class="flex gap-2">
                <Select v-model="novaEtapa" :options="[...ETAPAS_CULTIVO]" />
                <Button @click="transition">Registrar</Button>
            </div>
        </div>
    </Card>
    <p v-else class="text-ink/60">Lote não encontrado.</p>
</template>
