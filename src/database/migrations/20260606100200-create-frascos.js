'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('frascos', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            producao_id: { type: Sequelize.UUID, allowNull: true },
            codigo: { type: Sequelize.STRING(60), allowNull: false },
            volume_ml: { type: Sequelize.INTEGER, allowNull: false },
            validade: { type: Sequelize.DATEONLY, allowNull: false },
            status: {
                type: Sequelize.ENUM('disponivel', 'reservado', 'dispensado', 'descartado'),
                allowNull: false,
                defaultValue: 'disponivel',
            },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('frascos');
    },
};
