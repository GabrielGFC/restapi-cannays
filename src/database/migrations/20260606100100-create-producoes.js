'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('producoes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            lote_id: { type: Sequelize.UUID, allowNull: true },
            metodo: {
                type: Sequelize.ENUM('co2', 'etanol', 'oleo_carreador', 'rosin'),
                allowNull: false,
                defaultValue: 'co2',
            },
            data: { type: Sequelize.DATEONLY, allowNull: false },
            rendimento_ml: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
            responsavel_id: { type: Sequelize.UUID, allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('producoes');
    },
};
