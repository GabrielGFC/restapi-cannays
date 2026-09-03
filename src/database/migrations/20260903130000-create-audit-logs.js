'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('audit_logs', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            user_id: { type: Sequelize.UUID, allowNull: true },
            method: { type: Sequelize.STRING(10), allowNull: false },
            path: { type: Sequelize.STRING(300), allowNull: false },
            status_code: { type: Sequelize.INTEGER, allowNull: false },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('audit_logs');
    },
};
