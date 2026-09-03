<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePermissoesStore, type Permissao } from '@/stores/permissoes';
import { useToast } from '@/composables/useToast';
import PageHeader from '@/components/shared/PageHeader.vue';
import LoadingState from '@/components/shared/LoadingState.vue';
import ErrorState from '@/components/shared/ErrorState.vue';
import Card from '@/components/ui/Card.vue';

const store = usePermissoesStore();
const toast = useToast();
const { permissoes, loading, error } = storeToRefs(store);

onMounted(() => store.fetchAll());

const perfis = computed(() => [...new Set(permissoes.value.map((p) => p.perfil))]);
const funcionalidades = computed(() => [...new Set(permissoes.value.map((p) => p.funcionalidade))]);

function cell(perfil: string, funcionalidade: string): Permissao | undefined {
    return permissoes.value.find((p) => p.perfil === perfil && p.funcionalidade === funcionalidade);
}

async function onToggle(p: Permissao) {
    try {
        await store.toggle(p);
    } catch (e: any) {
        toast.error(e?.response?.data?.message ?? 'Erro ao atualizar permissão');
    }
}
</script>

<template>
    <PageHeader title="Permissões por perfil" subtitle="Matriz perfil × funcionalidade" />

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="store.fetchAll()" />
    <Card v-else class="overflow-x-auto">
        <table class="w-full text-sm">
            <thead>
                <tr>
                    <th class="text-left font-semibold text-xs uppercase tracking-wider text-gray-500 px-4 py-3">
                        Perfil
                    </th>
                    <th
                        v-for="f in funcionalidades"
                        :key="f"
                        class="text-center font-semibold text-xs uppercase tracking-wider text-gray-500 px-4 py-3"
                    >
                        {{ f }}
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <tr v-for="perfil in perfis" :key="perfil">
                    <td class="px-4 py-3 font-medium text-primary-dark capitalize">{{ perfil }}</td>
                    <td v-for="f in funcionalidades" :key="f" class="px-4 py-3 text-center">
                        <input
                            type="checkbox"
                            class="h-4 w-4 rounded accent-primary cursor-pointer"
                            :checked="cell(perfil, f)?.permitido"
                            @change="onToggle(cell(perfil, f)!)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </Card>
</template>
