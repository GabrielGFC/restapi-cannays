// Common types used across the application

export type Status = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'inactive' | 'active';

export type Perfil = 'Paciente' | 'Médico' | 'Farmacêutico' | 'Administrador';

export interface Paginacao {
  page: number;
  perPage: number;
  total: number;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  status: Status;
  avatar?: string;
}
