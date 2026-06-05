'use strict';

const ADMIN_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('cultivo_lotes', [
            {
                id: 'c0000001-0000-0000-0000-000000000001',
                especie: 'Cannabis sativa - CBD',
                data_plantio: '2026-01-10',
                responsavel_id: ADMIN_ID,
                quantidade_plantas: 20,
                local_cultivo: 'Estufa A',
                etapa: 'concluido',
                observacoes: 'Lote finalizado. Rendimento: 1,2 kg de flor seca.',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 'c0000002-0000-0000-0000-000000000002',
                especie: 'Cannabis indica - THC baixo',
                data_plantio: '2026-03-05',
                responsavel_id: ADMIN_ID,
                quantidade_plantas: 15,
                local_cultivo: 'Estufa B',
                etapa: 'colheita',
                observacoes: 'Iniciando processo de colheita.',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 'c0000003-0000-0000-0000-000000000003',
                especie: 'Cannabis sativa - CBD/THC 1:1',
                data_plantio: '2026-04-20',
                responsavel_id: ADMIN_ID,
                quantidade_plantas: 30,
                local_cultivo: 'Estufa A',
                etapa: 'floracao',
                observacoes: null,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 'c0000004-0000-0000-0000-000000000004',
                especie: 'Cannabis sativa - CBD alto',
                data_plantio: '2026-05-01',
                responsavel_id: ADMIN_ID,
                quantidade_plantas: 25,
                local_cultivo: 'Estufa C',
                etapa: 'vegetativo',
                observacoes: 'Crescimento uniforme.',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 'c0000005-0000-0000-0000-000000000005',
                especie: 'Cannabis indica - Sedativa',
                data_plantio: '2026-05-28',
                responsavel_id: ADMIN_ID,
                quantidade_plantas: 10,
                local_cultivo: 'Estufa B',
                etapa: 'plantio',
                observacoes: 'Recém plantado. Aguardando germinação.',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], { ignoreDuplicates: true });
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('cultivo_lotes', {
            responsavel_id: ADMIN_ID,
        });
    },
};
