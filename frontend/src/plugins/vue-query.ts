import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export const vueQuery = {
    install: VueQueryPlugin.install,
    options: { queryClient },
};
