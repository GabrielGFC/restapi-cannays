import type { Lote } from '../types/cultivo';

export const mockLotes: Lote[] = [
  {
    id: 'LOT-2026-001',
    especie: 'Cannabis Sativa L. - ACDC',
    status: 'floracao',
    dataPlantio: '2026-03-15',
    quantidadePlantas: 50,
    localCultivo: 'Estufa A - Setor 1',
    observacoes: 'Lote com alto teor de CBD',
    responsavel: {
      id: 'USR-001',
      nome: 'João Silva',
    },
    etapas: [
      {
        etapa: 'plantio',
        data: '2026-03-15',
        responsavel: 'João Silva',
        observacoes: 'Sementes germinadas em substrato orgânico',
      },
      {
        etapa: 'vegetativo',
        data: '2026-04-01',
        responsavel: 'Maria Costa',
        observacoes: 'Transição para fase vegetativa com 18h de luz',
      },
      {
        etapa: 'floracao',
        data: '2026-05-15',
        responsavel: 'João Silva',
        observacoes: 'Início da floração com 12h de luz',
      },
    ],
    insumos: [
      {
        id: 'INS-001',
        tipo: 'Substrato Orgânico',
        quantidade: '50kg',
        data: '2026-03-15',
        responsavel: 'João Silva',
      },
      {
        id: 'INS-002',
        tipo: 'Fertilizante NPK',
        quantidade: '5L',
        data: '2026-04-01',
        responsavel: 'Maria Costa',
      },
    ],
    dataCriacao: '2026-03-15',
    dataAtualizacao: '2026-05-15',
  },
  {
    id: 'LOT-2026-002',
    especie: 'Cannabis Indica - Harlequin',
    status: 'vegetativo',
    dataPlantio: '2026-04-10',
    quantidadePlantas: 30,
    localCultivo: 'Estufa B - Setor 2',
    responsavel: {
      id: 'USR-002',
      nome: 'Maria Costa',
    },
    etapas: [
      {
        etapa: 'plantio',
        data: '2026-04-10',
        responsavel: 'Maria Costa',
      },
      {
        etapa: 'vegetativo',
        data: '2026-04-25',
        responsavel: 'Maria Costa',
      },
    ],
    insumos: [
      {
        id: 'INS-003',
        tipo: 'Substrato Orgânico',
        quantidade: '30kg',
        data: '2026-04-10',
        responsavel: 'Maria Costa',
      },
    ],
    dataCriacao: '2026-04-10',
    dataAtualizacao: '2026-04-25',
  },
  {
    id: 'LOT-2026-003',
    especie: 'Cannabis Sativa L. - Charlotte\'s Web',
    status: 'colheita',
    dataPlantio: '2026-02-01',
    quantidadePlantas: 40,
    localCultivo: 'Estufa A - Setor 2',
    observacoes: 'Pronto para produção de óleo',
    responsavel: {
      id: 'USR-001',
      nome: 'João Silva',
    },
    etapas: [
      {
        etapa: 'plantio',
        data: '2026-02-01',
        responsavel: 'João Silva',
      },
      {
        etapa: 'vegetativo',
        data: '2026-02-20',
        responsavel: 'João Silva',
      },
      {
        etapa: 'floracao',
        data: '2026-04-05',
        responsavel: 'Maria Costa',
      },
      {
        etapa: 'colheita',
        data: '2026-05-30',
        responsavel: 'João Silva',
        observacoes: 'Tricomas em ponto ideal',
      },
    ],
    insumos: [
      {
        id: 'INS-004',
        tipo: 'Substrato Orgânico',
        quantidade: '40kg',
        data: '2026-02-01',
        responsavel: 'João Silva',
      },
      {
        id: 'INS-005',
        tipo: 'Fertilizante Orgânico',
        quantidade: '3L',
        data: '2026-02-20',
        responsavel: 'João Silva',
      },
    ],
    dataCriacao: '2026-02-01',
    dataAtualizacao: '2026-05-30',
  },
  {
    id: 'LOT-2026-004',
    especie: 'Cannabis Indica - Northern Lights',
    status: 'plantio',
    dataPlantio: '2026-06-01',
    quantidadePlantas: 25,
    localCultivo: 'Estufa C - Setor 1',
    responsavel: {
      id: 'USR-002',
      nome: 'Maria Costa',
    },
    etapas: [
      {
        etapa: 'plantio',
        data: '2026-06-01',
        responsavel: 'Maria Costa',
      },
    ],
    insumos: [
      {
        id: 'INS-006',
        tipo: 'Substrato Orgânico',
        quantidade: '25kg',
        data: '2026-06-01',
        responsavel: 'Maria Costa',
      },
    ],
    dataCriacao: '2026-06-01',
    dataAtualizacao: '2026-06-01',
  },
];

// Simular API call com latência
export const getLotes = async (): Promise<Lote[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockLotes;
};

export const getLoteById = async (id: string): Promise<Lote | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockLotes.find((lote) => lote.id === id);
};
