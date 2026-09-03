'use strict';

const { randomUUID } = require('crypto');

const PERFIS = ['colaborador', 'voluntario', 'medico', 'farmaceutico', 'administrador'];
const FUNCIONALIDADES = ['cultivo', 'producao', 'medico_farma', 'rh', 'configuracoes'];

module.exports = {
    async up(queryInterface) {
        const rows = [];
        for (const perfil of PERFIS) {
            for (const funcionalidade of FUNCIONALIDADES) {
                rows.push({
                    id: randomUUID(),
                    perfil,
                    funcionalidade,
                    permitido: perfil === 'administrador',
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }
        }
        await queryInterface.bulkInsert('permissoes', rows, { ignoreDuplicates: true });
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('permissoes', null);
    },
};
