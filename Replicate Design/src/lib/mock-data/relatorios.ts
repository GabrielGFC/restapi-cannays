import type { DashboardData, ChartData } from '../types/relatorios';

export const mockDashboardData: DashboardData = {
  kpis: {
    pacientesAtivos: {
      label: 'Pacientes Ativos',
      valor: 245,
      variacao: 12,
      trend: 'up',
    },
    dispensacoesUltimo30d: {
      label: 'Dispensações (30d)',
      valor: 89,
      variacao: -5,
      trend: 'down',
    },
    volumeOleoEstoque: {
      label: 'Estoque de Óleo (ml)',
      valor: 2400,
      variacao: 8,
      trend: 'up',
    },
    lotesAtivos: {
      label: 'Lotes em Cultivo',
      valor: 12,
      variacao: 0,
      trend: 'neutral',
    },
    receitaFinanceira: {
      label: 'Receita Mensal',
      valor: 'R$ 45.280',
      variacao: 15,
      trend: 'up',
    },
    inadimplencia: {
      label: 'Inadimplência',
      valor: '8.5%',
      variacao: -2,
      trend: 'down',
    },
  },
  charts: {
    dispensacoesPorMes: [
      { label: 'Jan', valor: 65 },
      { label: 'Fev', valor: 72 },
      { label: 'Mar', valor: 68 },
      { label: 'Abr', valor: 85 },
      { label: 'Mai', valor: 94 },
      { label: 'Jun', valor: 89 },
    ],
    producaoPorMes: [
      { label: 'Jan', valor: 450 },
      { label: 'Fev', valor: 500 },
      { label: 'Mar', valor: 380 },
      { label: 'Abr', valor: 520 },
      { label: 'Mai', valor: 600 },
      { label: 'Jun', valor: 550 },
    ],
    pacientesPorCondicao: [
      { label: 'Ansiedade', valor: 95 },
      { label: 'Dor Crônica', valor: 78 },
      { label: 'Insônia', valor: 42 },
      { label: 'Epilepsia', valor: 18 },
      { label: 'Outros', valor: 12 },
    ],
    evolucaoPacientes: [
      { label: 'Jan', valor: 210 },
      { label: 'Fev', valor: 218 },
      { label: 'Mar', valor: 225 },
      { label: 'Abr', valor: 232 },
      { label: 'Mai', valor: 239 },
      { label: 'Jun', valor: 245 },
    ],
  },
};

export const getDashboardData = async (): Promise<DashboardData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDashboardData;
};
