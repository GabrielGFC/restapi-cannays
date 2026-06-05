import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/config/axios';
import type { CultivoLote, EtapaCultivo } from '@/types/cultivo';

const KEY = ['cultivo', 'lotes'] as const;

export function useLotesQuery() {
    return useQuery({
        queryKey: KEY,
        queryFn: async () => {
            const { data } = await api.get('/cultivo');
            return data.data as CultivoLote[];
        },
    });
}

export function useCreateLote() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: Partial<CultivoLote>) => {
            const { data } = await api.post('/cultivo', payload);
            return data.data as CultivoLote;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}

export function useTransitionEtapa() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (vars: { id: string; etapa: EtapaCultivo }) => {
            const { data } = await api.patch(`/cultivo/${vars.id}/etapa`, {
                etapa: vars.etapa,
            });
            return data.data as CultivoLote;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}
