'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('associacao', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            nome: { type: Sequelize.STRING(200), allowNull: false },
            cnpj: { type: Sequelize.STRING(20), allowNull: false },
            endereco: { type: Sequelize.STRING(300), allowNull: true },
            logo_url: { type: Sequelize.STRING(500), allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('associacao');
    },
};
