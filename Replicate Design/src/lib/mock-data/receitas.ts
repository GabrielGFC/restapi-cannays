import type { Receita } from '../types/interacao';

export const mockReceitas: Receita[] = [
  {
    id: 'REC-2026-001',
    paciente: {
      id: 'PAC-001',
      nome: 'Ana Santos',
      dataNascimento: '1985-03-15',
    },
    medico: {
      id: 'MED-001',
      nome: 'Dr. Pedro Lima',
      crm: '123456-SP',
    },
    status: 'aprovada',
    dataEmissao: '2026-06-01',
    dataValidade: '2026-09-01',
    prescricao: {
      produto: 'Óleo CBD 3%',
      concentracao: '3% CBD',
      dosagem: '30ml',
      posologia: '10 gotas, 3x ao dia',
      duracao: '90 dias',
      observacoes: 'Tratamento para ansiedade',
    },
    interacoes: [
      {
        id: 'INT-001',
        autor: {
          id: 'USR-003',
          nome: 'Dr. Carlos Farmacêutico',
          perfil: 'Farmacêutico',
        },
        mensagem: 'Receita aprovada. Produto disponível em estoque.',
        data: '2026-06-02',
        tipo: 'aprovacao',
      },
    ],
    alertas: [],
  },
  {
    id: 'REC-2026-002',
    paciente: {
      id: 'PAC-002',
      nome: 'Roberto Silva',
      dataNascimento: '1970-08-22',
    },
    medico: {
      id: 'MED-001',
      nome: 'Dr. Pedro Lima',
      crm: '123456-SP',
    },
    status: 'aguardando',
    dataEmissao: '2026-06-05',
    dataValidade: '2026-09-05',
    prescricao: {
      produto: 'Óleo Full Spectrum 5%',
      concentracao: '5% CBD + 0.2% THC',
      dosagem: '30ml',
      posologia: '5 gotas, 2x ao dia',
      duracao: '60 dias',
      observacoes: 'Tratamento para dor crônica',
    },
    interacoes: [],
    alertas: [
      {
        id: 'ALT-001',
        tipo: 'interacao_medicamentosa',
        severidade: 'media',
        mensagem: 'Paciente faz uso de anticoagulante (Varfarina). Monitorar possível interação.',
        data: '2026-06-05',
      },
    ],
  },
  {
    id: 'REC-2026-003',
    paciente: {
      id: 'PAC-003',
      nome: 'Juliana Oliveira',
      dataNascimento: '1992-12-10',
    },
    medico: {
      id: 'MED-001',
      nome: 'Dr. Pedro Lima',
      crm: '123456-SP',
    },
    status: 'ajuste_solicitado',
    dataEmissao: '2026-06-03',
    dataValidade: '2026-09-03',
    prescricao: {
      produto: 'Óleo CBD 10%',
      concentracao: '10% CBD',
      dosagem: '30ml',
      posologia: '20 gotas, 3x ao dia',
      duracao: '90 dias',
    },
    interacoes: [
      {
        id: 'INT-002',
        autor: {
          id: 'USR-003',
          nome: 'Dr. Carlos Farmacêutico',
          perfil: 'Farmacêutico',
        },
        mensagem: 'Dosagem muito alta para início de tratamento. Sugiro começar com 10 gotas 2x ao dia.',
        data: '2026-06-04',
        tipo: 'ajuste',
      },
    ],
    alertas: [
      {
        id: 'ALT-002',
        tipo: 'dosagem',
        severidade: 'alta',
        mensagem: 'Dosagem prescrita excede a recomendação inicial para novo paciente.',
        data: '2026-06-04',
      },
    ],
  },
];

export const getReceitas = async (): Promise<Receita[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockReceitas;
};

export const getReceitaById = async (id: string): Promise<Receita | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockReceitas.find((receita) => receita.id === id);
};
