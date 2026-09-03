'use strict';

const { randomUUID } = require('crypto');

const EVENTOS = [
    'lote_criado',
    'receita_aguardando',
    'producao_registrada',
    'membro_cadastrado',
];

module.exports = {
    async up(queryInterface) {
        const rows = EVENTOS.map((evento) => ({
            id: randomUUID(),
            evento,
            canal: 'in_app',
            ativo: true,
            created_at: new Date(),
            updated_at: new Date(),
        }));
        await queryInterface.bulkInsert('notificacoes_regras', rows, { ignoreDuplicates: true });
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('notificacoes_regras', null);
    },
};
