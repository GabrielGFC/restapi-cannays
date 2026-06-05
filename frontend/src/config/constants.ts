export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'CannaSYS';

export const ETAPAS_CULTIVO = [
    { value: 'plantio', label: 'Plantio' },
    { value: 'vegetativo', label: 'Vegetativo' },
    { value: 'floracao', label: 'Floração' },
    { value: 'colheita', label: 'Colheita' },
    { value: 'concluido', label: 'Concluído' },
] as const;

export const STATUS_RECEITA = [
    { value: 'aguardando', label: 'Aguardando revisão', color: 'warning' },
    { value: 'em_analise', label: 'Em análise', color: 'info' },
    { value: 'aprovada', label: 'Aprovada', color: 'success' },
    { value: 'ajuste_solicitado', label: 'Ajuste solicitado', color: 'warning' },
    { value: 'rejeitada', label: 'Rejeitada', color: 'danger' },
] as const;
