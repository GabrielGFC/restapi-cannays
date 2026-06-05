import type { Membro } from '../types/rh';

export const mockMembros: Membro[] = [
  {
    id: 'USR-001',
    nome: 'João Silva',
    email: 'joao.silva@cannasys.org',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    tipo: 'Colaborador',
    status: 'ativo',
    dataAdmissao: '2025-01-15',
    documentos: [
      {
        id: 'DOC-001',
        tipo: 'CPF',
        numero: '123.456.789-00',
        dataUpload: '2025-01-15',
      },
      {
        id: 'DOC-002',
        tipo: 'RG',
        numero: '12.345.678-9',
        dataUpload: '2025-01-15',
      },
    ],
    escalas: [
      {
        id: 'ESC-001',
        data: '2026-06-10',
        turno: 'Manhã',
        atividade: 'Cultivo',
        status: 'agendado',
      },
    ],
    atividades: [
      {
        id: 'ATV-001',
        tipo: 'Plantio',
        descricao: 'Plantio do lote LOT-2026-001',
        data: '2026-03-15',
        duracao: 240,
      },
    ],
  },
  {
    id: 'USR-002',
    nome: 'Maria Costa',
    email: 'maria.costa@cannasys.org',
    telefone: '(11) 98765-4322',
    cpf: '987.654.321-00',
    tipo: 'Colaborador',
    status: 'ativo',
    dataAdmissao: '2025-02-01',
    documentos: [
      {
        id: 'DOC-003',
        tipo: 'CPF',
        numero: '987.654.321-00',
        dataUpload: '2025-02-01',
      },
    ],
    escalas: [],
    atividades: [],
  },
  {
    id: 'USR-003',
    nome: 'Dr. Carlos Farmacêutico',
    email: 'carlos.farm@cannasys.org',
    telefone: '(11) 98765-4323',
    cpf: '456.789.123-00',
    tipo: 'Farmacêutico',
    status: 'ativo',
    dataAdmissao: '2024-11-01',
    documentos: [
      {
        id: 'DOC-004',
        tipo: 'CRF',
        numero: '12345-SP',
        dataValidade: '2028-01-01',
        dataUpload: '2024-11-01',
      },
    ],
    escalas: [
      {
        id: 'ESC-002',
        data: '2026-06-10',
        turno: 'Tarde',
        atividade: 'Dispensação',
        status: 'agendado',
      },
    ],
    atividades: [],
  },
  {
    id: 'MED-001',
    nome: 'Dr. Pedro Lima',
    email: 'pedro.lima@cannasys.org',
    telefone: '(11) 98765-4324',
    cpf: '321.654.987-00',
    tipo: 'Médico',
    status: 'ativo',
    dataAdmissao: '2024-10-15',
    documentos: [
      {
        id: 'DOC-005',
        tipo: 'CRM',
        numero: '123456-SP',
        dataValidade: '2029-01-01',
        dataUpload: '2024-10-15',
      },
    ],
    escalas: [],
    atividades: [],
  },
];

export const getMembros = async (): Promise<Membro[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMembros;
};

export const getMembroById = async (id: string): Promise<Membro | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockMembros.find((membro) => membro.id === id);
};
