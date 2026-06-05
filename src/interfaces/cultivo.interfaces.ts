export type EtapaCultivo =
    | 'plantio'
    | 'vegetativo'
    | 'floracao'
    | 'colheita'
    | 'concluido';

export interface CultivoLote {
    id?: string;
    especie: string;
    data_plantio: string;
    responsavel_id: string;
    quantidade_plantas: number;
    local_cultivo: string;
    etapa: EtapaCultivo;
    observacoes?: string | null;
    created_at?: string;
    updated_at?: string;
}
