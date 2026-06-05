// Types for Relatórios (Reports) module

export interface KPI {
  label: string;
  valor: number | string;
  variacao?: number; // percentual de variação
  icone?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  label: string;
  valor: number;
  categoria?: string;
}

export interface DashboardData {
  kpis: {
    pacientesAtivos: KPI;
    dispensacoesUltimo30d: KPI;
    volumeOleoEstoque: KPI;
    lotesAtivos: KPI;
    receitaFinanceira: KPI;
    inadimplencia: KPI;
  };
  charts: {
    dispensacoesPorMes: ChartData[];
    producaoPorMes: ChartData[];
    pacientesPorCondicao: ChartData[];
    evolucaoPacientes: ChartData[];
  };
}

export interface FiltroRelatorio {
  dataInicio?: string;
  dataFim?: string;
  modulo?: string;
  status?: string;
}

export interface RelatorioRastreabilidade {
  lote: {
    id: string;
    especie: string;
    dataPlantio: string;
  };
  producao: {
    id: string;
    dataProducao: string;
    volumeTotal: number;
  };
  frascos: {
    id: string;
    codigo: string;
    volume: number;
  }[];
  dispensacoes: {
    id: string;
    paciente: string;
    data: string;
    quantidade: number;
  }[];
}
