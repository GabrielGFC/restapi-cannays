'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cultivo_lotes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            especie: { type: Sequelize.STRING(100), allowNull: false },
            data_plantio: { type: Sequelize.DATEONLY, allowNull: false },
            responsavel_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            quantidade_plantas: { type: Sequelize.INTEGER, allowNull: false },
            local_cultivo: { type: Sequelize.STRING(150), allowNull: false },
            etapa: {
                type: Sequelize.ENUM(
                    'plantio',
                    'vegetativo',
                    'floracao',
                    'colheita',
                    'concluido',
                ),
                allowNull: false,
                defaultValue: 'plantio',
            },
            observacoes: { type: Sequelize.TEXT, allowNull: true },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cultivo_lotes');
    },
};
