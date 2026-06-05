// Types for RH (Human Resources) module

export type TipoMembro = 'Colaborador' | 'Voluntário' | 'Médico' | 'Farmacêutico' | 'Administrador';

export type StatusMembro = 'ativo' | 'inativo' | 'afastado';

export interface Membro {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  tipo: TipoMembro;
  status: StatusMembro;
  dataAdmissao: string;
  avatar?: string;
  documentos: Documento[];
  escalas: Escala[];
  atividades: Atividade[];
}

export interface Documento {
  id: string;
  tipo: string; // ex: 'CRF', 'CRM', 'CPF', 'RG'
  numero: string;
  dataValidade?: string;
  url?: string;
  dataUpload: string;
}

export interface Escala {
  id: string;
  data: string;
  turno: 'Manhã' | 'Tarde' | 'Noite';
  atividade: string;
  status: 'agendado' | 'realizado' | 'cancelado';
}

export interface Atividade {
  id: string;
  tipo: string;
  descricao: string;
  data: string;
  duracao?: number; // minutos
  observacoes?: string;
}
