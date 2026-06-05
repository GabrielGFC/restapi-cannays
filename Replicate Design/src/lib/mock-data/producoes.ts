import type { Producao } from '../types/producao';

export const mockProducoes: Producao[] = [
  {
    id: 'PROD-2026-001',
    loteOrigem: 'LOT-2026-003',
    tipoOleo: 'Full Spectrum CBD',
    metodoExtracao: 'CO2 Supercrítico',
    volumeTotal: 500,
    concentracao: '3% CBD',
    dataCriacao: '2026-06-01',
    dataProducao: '2026-06-01',
    status: 'disponivel',
    responsavel: {
      id: 'USR-003',
      nome: 'Dr. Carlos Farmacêutico',
    },
    frascos: [
      {
        id: 'FRS-001',
        codigo: 'CBD3-001',
        volume: 30,
        dataValidade: '2027-06-01',
        status: 'dispensado',
        dispensacoes: [
          {
            id: 'DISP-001',
            pacienteId: 'PAC-001',
            pacienteNome: 'Ana Santos',
            data: '2026-06-05',
            quantidade: 30,
            receitaId: 'REC-2026-001',
          },
        ],
      },
      {
        id: 'FRS-002',
        codigo: 'CBD3-002',
        volume: 30,
        dataValidade: '2027-06-01',
        status: 'disponivel',
      },
      {
        id: 'FRS-003',
        codigo: 'CBD3-003',
        volume: 30,
        dataValidade: '2027-06-01',
        status: 'disponivel',
      },
    ],
    rendimento: 12.5,
  },
  {
    id: 'PROD-2026-002',
    loteOrigem: 'LOT-2026-001',
    tipoOleo: 'CBD Isolado',
    metodoExtracao: 'Etanol',
    volumeTotal: 300,
    concentracao: '5% CBD',
    dataCriacao: '2026-05-20',
    dataProducao: '2026-05-20',
    status: 'estoque_critico',
    responsavel: {
      id: 'USR-003',
      nome: 'Dr. Carlos Farmacêutico',
    },
    frascos: [
      {
        id: 'FRS-004',
        codigo: 'CBD5-001',
        volume: 30,
        dataValidade: '2027-05-20',
        status: 'disponivel',
      },
    ],
    rendimento: 8.0,
  },
];

export const getProducoes = async (): Promise<Producao[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducoes;
};

export const getProducaoById = async (id: string): Promise<Producao | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducoes.find((producao) => producao.id === id);
};
