import { createI18n } from 'vue-i18n';

const ptBR = {
    common: {
        save: 'Salvar',
        cancel: 'Cancelar',
        edit: 'Editar',
        delete: 'Excluir',
        loading: 'Carregando...',
        retry: 'Tentar novamente',
        empty: 'Nenhum registro encontrado',
        required: 'Obrigatório',
    },
    nav: {
        dashboard: 'Dashboard',
        cultivo: 'Cultivo',
        producao: 'Produção',
        interacao: 'Médico-Farma',
        rh: 'RH',
        configuracoes: 'Configurações',
        logout: 'Sair',
    },
    cultivo: {
        title: 'Cultivo',
        newLote: 'Novo lote',
        especie: 'Espécie / Cultivar',
        plantio: 'Data de plantio',
        responsavel: 'Responsável',
        quantidade: 'Quantidade de plantas',
        local: 'Local de cultivo',
    },
};

export const i18n = createI18n({
    legacy: false,
    locale: 'pt-BR',
    fallbackLocale: 'pt-BR',
    messages: { 'pt-BR': ptBR },
});
