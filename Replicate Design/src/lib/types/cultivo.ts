// Types for Cultivo (Cultivation) module

export type StatusLote = 'plantio' | 'vegetativo' | 'floracao' | 'colheita' | 'concluido';

export type TipoEtapa = 'plantio' | 'vegetativo' | 'floracao' | 'colheita';

export interface Lote {
  id: string;
  especie: string;
  status: StatusLote;
  dataPlantio: string;
  quantidadePlantas: number;
  localCultivo: string;
  observacoes?: string;
  responsavel: {
    id: string;
    nome: string;
  };
  etapas: Etapa[];
  insumos: Insumo[];
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface Etapa {
  etapa: TipoEtapa;
  data: string;
  responsavel: string;
  observacoes?: string;
}

export interface Insumo {
  id: string;
  tipo: string;
  quantidade: string;
  data: string;
  responsavel: string;
}
