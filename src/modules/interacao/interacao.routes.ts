import express from 'express';
import { Op } from 'sequelize';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const interacaoRouter = express.Router();
interacaoRouter.use(authMiddleware);

interacaoRouter.get('/fila', async (_req, res, next) => {
    try {
        const data = await DB.Receitas.findAll({
            where: { status: { [Op.in]: ['aguardando', 'em_analise', 'ajuste_solicitado'] } },
            order: [['created_at', 'DESC']],
        });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

interacaoRouter.get('/historico', async (_req, res, next) => {
    try {
        const data = await DB.Receitas.findAll({
            where: { status: { [Op.in]: ['aprovada', 'rejeitada'] } },
            order: [['updated_at', 'DESC']],
        });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

interacaoRouter.get('/:id', async (req, res, next) => {
    try {
        const r = await DB.Receitas.findByPk(req.params.id);
        if (!r) return res.status(404).json({ message: 'Receita não encontrada' });
        res.status(200).json({ data: r });
    } catch (e) { next(e); }
});

interacaoRouter.post('/', async (req, res, next) => {
    try {
        const nova = await DB.Receitas.create(req.body);
        res.status(201).json({ data: nova });
    } catch (e) { next(e); }
});

interacaoRouter.patch('/:id/status', async (req, res, next) => {
    try {
        const r = await DB.Receitas.findByPk(req.params.id);
        if (!r) return res.status(404).json({ message: 'Receita não encontrada' });
        await r.update(req.body);
        res.status(200).json({ data: r });
    } catch (e) { next(e); }
});

export default interacaoRouter;
