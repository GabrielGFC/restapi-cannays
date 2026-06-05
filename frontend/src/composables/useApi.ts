import { ref } from 'vue';

export function useAsyncState<T>(fetcher: () => Promise<T>) {
    const data = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function execute() {
        loading.value = true;
        error.value = null;
        try {
            data.value = await fetcher();
        } catch (e: any) {
            error.value = e?.message ?? 'Erro inesperado';
        } finally {
            loading.value = false;
        }
    }

    return { data, loading, error, execute };
}
