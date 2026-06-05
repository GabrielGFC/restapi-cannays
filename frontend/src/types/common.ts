export type Perfil =
    | 'paciente'
    | 'medico'
    | 'farmaceutico'
    | 'administrador';

export type StatusGenerico = 'ativo' | 'inativo' | 'pendente';

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}
