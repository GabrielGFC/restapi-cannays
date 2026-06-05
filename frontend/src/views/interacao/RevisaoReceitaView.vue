<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useInteracaoStore } from '@/stores/interacao';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Textarea from '@/components/ui/Textarea.vue';
import Label from '@/components/ui/Label.vue';
import LoadingState from '@/components/shared/LoadingState.vue';

const route = useRoute();
const router = useRouter();
const store = useInteracaoStore();
const { fila, loading } = storeToRefs(store);
const toast = useToast();
const justificativa = ref('');

const receita = computed(() => fila.value.find((r) => r.id === route.params.id));

onMounted(async () => {
    if (!fila.value.length) await store.fetchFila();
});

async function action(status: 'aprovada' | 'ajuste_solicitado' | 'rejeitada') {
    if (!receita.value) return;
    await store.atualizarStatus(receita.value.id, status, justificativa.value);
    toast.success('Receita atualizada');
    router.push('/interacao');
}
</script>

<template>
    <PageHeader title="Revisão de receita" />
    <LoadingState v-if="loading" />
    <div v-else-if="receita" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
            <h3 class="font-semibold mb-3">Prescrição do médico</h3>
            <ul class="space-y-2 text-sm">
                <li v-for="(item, i) in receita.itens" :key="i">
                    <p class="font-medium">{{ item.produto }}</p>
                    <p class="text-ink/70">{{ item.posologia }} · {{ item.duracao_dias }} dias</p>
                </li>
            </ul>
            <p v-if="receita.observacoes" class="mt-3 text-sm italic text-ink/70">
                {{ receita.observacoes }}
            </p>
        </Card>
        <Card>
            <h3 class="font-semibold mb-3">Validação farmacêutica</h3>
            <Label for="just">Justificativa (em caso de ajuste/rejeição)</Label>
            <Textarea id="just" v-model="justificativa" rows="6" />
            <div class="flex justify-end gap-2 mt-4">
                <Button variant="danger" @click="action('rejeitada')">Rejeitar</Button>
                <Button variant="secondary" @click="action('ajuste_solicitado')">
                    Solicitar ajuste
                </Button>
                <Button @click="action('aprovada')">Aprovar</Button>
            </div>
        </Card>
    </div>
    <p v-else class="text-ink/60">Receita não encontrada.</p>
</template>
