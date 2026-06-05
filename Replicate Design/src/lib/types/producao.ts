// Types for Produção (Production) module

export type StatusProducao = 'em_producao' | 'disponivel' | 'estoque_critico' | 'esgotado';

export type MetodoExtracao = 'CO2 Supercrítico' | 'Etanol' | 'Azeite' | 'Manteiga';

export interface Producao {
  id: string;
  loteOrigem: string;
  tipoOleo: string;
  metodoExtracao: MetodoExtracao;
  volumeTotal: number; // ml
  concentracao: string; // ex: "3% CBD"
  dataCriacao: string;
  dataProducao: string;
  status: StatusProducao;
  responsavel: {
    id: string;
    nome: string;
  };
  frascos: Frasco[];
  rendimento?: number; // percentual
}

export interface Frasco {
  id: string;
  codigo: string;
  volume: number; // ml
  dataValidade: string;
  status: 'disponivel' | 'dispensado' | 'vencido';
  dispensacoes?: Dispensacao[];
}

export interface Dispensacao {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  data: string;
  quantidade: number; // ml
  receitaId: string;
}

export interface EstoqueCritico {
  threshold: number;
  volumeAtual: number;
  alerta: boolean;
}
