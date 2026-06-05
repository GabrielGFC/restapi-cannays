export type TipoMembro =
    | 'colaborador'
    | 'voluntario'
    | 'medico'
    | 'farmaceutico'
    | 'administrador';

export interface Membro {
    id: string;
    nome: string;
    email: string;
    tipo: TipoMembro;
    funcao: string;
    foto_url?: string;
    ativo: boolean;
}
