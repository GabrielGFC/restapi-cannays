'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('receitas', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            paciente_nome: { type: Sequelize.STRING(150), allowNull: false },
            medico_nome: { type: Sequelize.STRING(150), allowNull: false },
            farmaceutico_nome: { type: Sequelize.STRING(150), allowNull: true },
            status: {
                type: Sequelize.ENUM('aguardando', 'em_analise', 'aprovada', 'ajuste_solicitado', 'rejeitada'),
                allowNull: false,
                defaultValue: 'aguardando',
            },
            itens: { type: Sequelize.JSONB, allowNull: false, defaultValue: [] },
            observacoes: { type: Sequelize.TEXT, allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('receitas');
    },
};
