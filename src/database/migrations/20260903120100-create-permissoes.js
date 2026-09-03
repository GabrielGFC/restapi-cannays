'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('permissoes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            perfil: {
                type: Sequelize.ENUM('colaborador', 'voluntario', 'medico', 'farmaceutico', 'administrador'),
                allowNull: false,
            },
            funcionalidade: { type: Sequelize.STRING(60), allowNull: false },
            permitido: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
        await queryInterface.addConstraint('permissoes', {
            fields: ['perfil', 'funcionalidade'],
            type: 'unique',
            name: 'permissoes_perfil_funcionalidade_unique',
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('permissoes');
    },
};
