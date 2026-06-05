export type StatusReceita =
    | 'aguardando'
    | 'em_analise'
    | 'aprovada'
    | 'ajuste_solicitado'
    | 'rejeitada';

export interface Receita {
    id: string;
    paciente_id: string;
    medico_id: string;
    farmaceutico_id?: string;
    status: StatusReceita;
    itens: ReceitaItem[];
    observacoes?: string;
    created_at: string;
}

export interface ReceitaItem {
    produto: string;
    posologia: string;
    duracao_dias: number;
}
