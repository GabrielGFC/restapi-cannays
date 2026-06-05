'use strict';

const bcrypt = require('bcrypt');

const ADMIN_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

module.exports = {
    async up(queryInterface) {
        const hash = await bcrypt.hash('Admin@123', 10);
        await queryInterface.bulkInsert('users', [
            {
                id: ADMIN_ID,
                name: 'Administrador',
                email: 'admin@cannasys.com',
                username: 'admin',
                password: hash,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], { ignoreDuplicates: true });
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', { id: ADMIN_ID });
    },
};
