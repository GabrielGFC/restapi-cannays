'use strict';

const { randomUUID } = require('crypto');

function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d;
}
function daysAhead(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d;
}
function dateOnly(d) {
    return d.toISOString().slice(0, 10);
}

module.exports = {
    async up(queryInterface) {
        const [users] = await queryInterface.sequelize.query('SELECT id FROM users LIMIT 5;');
        const adminId = users[0]?.id;
        if (!adminId) return;
        const userIds = users.map((u) => u.id);
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // --- RH membros ---
        const membrosNomes = [
            ['Marcos Silva', 'marcos.silva@cannasys.demo', 'colaborador', 'Cultivador chefe'],
            ['Helena Martins', 'helena.martins@cannasys.demo', 'colaborador', 'Assistente administrativa'],
            ['Dr. João Pereira', 'joao.pereira@cannasys.demo', 'medico', 'Médico prescritor'],
            ['Dra. Ana Rocha', 'ana.rocha@cannasys.demo', 'medico', 'Médica prescritora'],
            ['Paula Fernandes', 'paula.fernandes@cannasys.demo', 'farmaceutico', 'Farmacêutica responsável'],
            ['Diego Ramos', 'diego.ramos@cannasys.demo', 'voluntario', 'Apoio ao cultivo'],
            ['Camila Souza', 'camila.souza@cannasys.demo', 'voluntario', 'Apoio administrativo'],
            ['Rafael Costa', 'rafael.costa@cannasys.demo', 'colaborador', 'Técnico de extração'],
        ];
        const membroRows = membrosNomes.map(([nome, email, tipo, funcao]) => ({
            id: randomUUID(),
            nome,
            email,
            tipo,
            funcao,
            foto_url: null,
            ativo: true,
            created_at: daysAgo(Math.floor(Math.random() * 60)),
            updated_at: new Date(),
        }));
        await queryInterface.bulkInsert('rh_membros', membroRows, { ignoreDuplicates: true });

        // --- Cultivo lotes (variados por etapa) ---
        const especies = ['Cannabis Sativa', 'Cannabis Indica', 'Hibrida Charlotte', 'Cannabis Ruderalis', 'OG Kush', 'White Widow'];
        const locais = ['Estufa A', 'Estufa B', 'Estufa C', 'Estufa D'];
        const etapas = ['plantio', 'vegetativo', 'floracao', 'colheita', 'concluido'];
        const loteRows = Array.from({ length: 8 }).map((_, i) => ({
            id: randomUUID(),
            especie: pick(especies),
            data_plantio: dateOnly(daysAgo(20 + i * 15)),
            responsavel_id: pick(userIds),
            quantidade_plantas: 20 + Math.floor(Math.random() * 100),
            local_cultivo: pick(locais),
            etapa: etapas[i % etapas.length],
            observacoes: '',
            created_at: daysAgo(20 + i * 15),
            updated_at: new Date(),
        }));
        await queryInterface.bulkInsert('cultivo_lotes', loteRows, { ignoreDuplicates: true });

        const [lotes] = await queryInterface.sequelize.query('SELECT id FROM cultivo_lotes LIMIT 20;');
        const loteIds = lotes.map((l) => l.id);

        // --- Produções ---
        const metodos = ['co2', 'etanol', 'oleo_carreador', 'rosin'];
        const producaoRows = Array.from({ length: 6 }).map((_, i) => ({
            id: randomUUID(),
            lote_id: pick(loteIds),
            metodo: metodos[i % metodos.length],
            data: dateOnly(daysAgo(i * 7)),
            rendimento_ml: 300 + Math.floor(Math.random() * 900),
            responsavel_id: pick(userIds),
            created_at: daysAgo(i * 7),
            updated_at: new Date(),
        }));
        await queryInterface.bulkInsert('producoes', producaoRows, { ignoreDuplicates: true });

        const [producoes] = await queryInterface.sequelize.query('SELECT id FROM producoes LIMIT 20;');
        const producaoIds = producoes.map((p) => p.id);

        // --- Frascos ---
        const statusFrasco = ['disponivel', 'disponivel', 'reservado', 'dispensado', 'dispensado', 'descartado'];
        const frascoRows = Array.from({ length: 18 }).map((_, i) => ({
            id: randomUUID(),
            producao_id: producaoIds.length ? pick(producaoIds) : null,
            codigo: `FR-${String(i + 1).padStart(3, '0')}`,
            volume_ml: 30 + Math.floor(Math.random() * 90),
            validade: dateOnly(daysAhead(180 + i * 5)),
            status: statusFrasco[i % statusFrasco.length],
            created_at: daysAgo(i * 3),
            updated_at: daysAgo(Math.max(0, i * 3 - 2)),
        }));
        await queryInterface.bulkInsert('frascos', frascoRows, { ignoreDuplicates: true });

        // --- Receitas ---
        const pacientes = ['Ana B. Costa', 'Carlos Mendes', 'Beatriz Lima', 'Eduardo Alves', 'Fernanda Dias', 'Gustavo Nunes', 'Isabela Rocha', 'Lucas Tavares'];
        const medicos = ['Dr. João Pereira', 'Dra. Ana Rocha'];
        const farmaceuticos = ['Paula Fernandes'];
        const produtos = ['Óleo CBD 5%', 'Óleo Full Spectrum 10%', 'Óleo CBD 20%', 'Cápsulas CBD 25mg'];
        const statusReceita = ['aguardando', 'em_analise', 'aprovada', 'aprovada', 'ajuste_solicitado', 'rejeitada'];
        const receitaRows = Array.from({ length: 10 }).map((_, i) => ({
            id: randomUUID(),
            paciente_nome: pacientes[i % pacientes.length],
            medico_nome: pick(medicos),
            farmaceutico_nome: Math.random() > 0.3 ? pick(farmaceuticos) : null,
            status: statusReceita[i % statusReceita.length],
            itens: JSON.stringify([
                { produto: pick(produtos), posologia: '2 gotas 2x ao dia', duracao_dias: 30 },
            ]),
            observacoes: null,
            created_at: daysAgo(i * 4),
            updated_at: daysAgo(Math.max(0, i * 4 - 1)),
        }));
        await queryInterface.bulkInsert('receitas', receitaRows, { ignoreDuplicates: true });

        // --- Integrações extra ---
        const integracaoRows = [
            { id: randomUUID(), nome: 'Correios API', tipo: 'fornecedor', chave_api: 'cor_demo_key', ativo: true },
            { id: randomUUID(), nome: 'Mercado Pago', tipo: 'pagamento', chave_api: 'mp_demo_key', ativo: false },
        ].map((r) => ({ ...r, created_at: new Date(), updated_at: new Date() }));
        await queryInterface.bulkInsert('integracoes', integracaoRows, { ignoreDuplicates: true });

        // --- Associação (se ainda não existir) ---
        const [assoc] = await queryInterface.sequelize.query('SELECT id FROM associacao LIMIT 1;');
        if (!assoc.length) {
            await queryInterface.bulkInsert('associacao', [{
                id: randomUUID(),
                nome: 'Associação CannaSYS',
                cnpj: '12.345.678/0001-99',
                endereco: 'Av. Principal, 1000 - Centro',
                logo_url: null,
                created_at: new Date(),
                updated_at: new Date(),
            }]);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('frascos', null);
        await queryInterface.bulkDelete('producoes', null);
        await queryInterface.bulkDelete('receitas', null);
    },
};
