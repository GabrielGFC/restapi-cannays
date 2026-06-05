// Types for Interação Médico-Farmacêutico module

export type StatusReceita =
  | 'aguardando'
  | 'em_analise'
  | 'aprovada'
  | 'ajuste_solicitado'
  | 'rejeitada';

export interface Receita {
  id: string;
  paciente: {
    id: string;
    nome: string;
    dataNascimento: string;
  };
  medico: {
    id: string;
    nome: string;
    crm: string;
  };
  status: StatusReceita;
  dataEmissao: string;
  dataValidade: string;
  prescricao: Prescricao;
  interacoes: Interacao[];
  alertas: Alerta[];
}

export interface Prescricao {
  produto: string;
  concentracao: string;
  dosagem: string;
  posologia: string;
  duracao: string;
  observacoes?: string;
}

export interface Interacao {
  id: string;
  autor: {
    id: string;
    nome: string;
    perfil: 'Médico' | 'Farmacêutico';
  };
  mensagem: string;
  data: string;
  tipo: 'comentario' | 'aprovacao' | 'ajuste' | 'rejeicao';
}

export interface Alerta {
  id: string;
  tipo: 'contraindicacao' | 'interacao_medicamentosa' | 'alergia' | 'dosagem';
  severidade: 'baixa' | 'media' | 'alta';
  mensagem: string;
  data: string;
}
