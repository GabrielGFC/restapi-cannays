export type MetodoExtracao = 'co2' | 'etanol' | 'oleo_carreador' | 'rosin';

export interface ProducaoOleo {
    id: string;
    lote_id: string;
    metodo: MetodoExtracao;
    data: string;
    rendimento_ml: number;
    responsavel_id: string;
}

export interface FrascoOleo {
    id: string;
    producao_id: string;
    codigo: string;
    volume_ml: number;
    validade: string;
    status: 'disponivel' | 'reservado' | 'dispensado' | 'descartado';
}
