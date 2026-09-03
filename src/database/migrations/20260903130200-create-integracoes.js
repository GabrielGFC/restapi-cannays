'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('integracoes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            nome: { type: Sequelize.STRING(100), allowNull: false },
            tipo: { type: Sequelize.ENUM('pagamento', 'fornecedor', 'outro'), allowNull: false, defaultValue: 'outro' },
            chave_api: { type: Sequelize.STRING(300), allowNull: true },
            ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('integracoes');
    },
};
