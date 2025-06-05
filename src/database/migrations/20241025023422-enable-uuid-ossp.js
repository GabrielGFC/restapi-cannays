'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // Habilita a extensão uuid-ossp, necessária para uuid_generate_v4()
        await queryInterface.sequelize.query(
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
        );
    },

    async down(queryInterface) {
        // Remove a extensão caso você queira reverter
        await queryInterface.sequelize.query(
            `DROP EXTENSION IF EXISTS "uuid-ossp";`,
        );
    },
};
