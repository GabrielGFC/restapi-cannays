'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rh_membros', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            nome: { type: Sequelize.STRING(150), allowNull: false },
            email: { type: Sequelize.STRING(180), allowNull: false, unique: true },
            tipo: {
                type: Sequelize.ENUM('colaborador', 'voluntario', 'medico', 'farmaceutico', 'administrador'),
                allowNull: false,
                defaultValue: 'colaborador',
            },
            funcao: { type: Sequelize.STRING(150), allowNull: false },
            foto_url: { type: Sequelize.STRING(500), allowNull: true },
            ativo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('rh_membros');
    },
};
