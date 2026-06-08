import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const producaoRouter = express.Router();
producaoRouter.use(authMiddleware);

producaoRouter.get('/', async (_req, res, next) => {
    try {
        const data = await DB.Producoes.findAll({ order: [['created_at', 'DESC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

producaoRouter.get('/frascos', async (_req, res, next) => {
    try {
        const data = await DB.Frascos.findAll({ order: [['created_at', 'DESC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

producaoRouter.get('/rastreabilidade', async (_req, res, next) => {
    try {
        const data = await DB.Frascos.findAll({
            where: { status: 'dispensado' },
            order: [['updated_at', 'DESC']],
        });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

producaoRouter.post('/', async (req, res, next) => {
    try {
        const nova = await DB.Producoes.create(req.body);
        res.status(201).json({ data: nova });
    } catch (e) { next(e); }
});

producaoRouter.post('/frascos', async (req, res, next) => {
    try {
        const novo = await DB.Frascos.create(req.body);
        res.status(201).json({ data: novo });
    } catch (e) { next(e); }
});

producaoRouter.patch('/frascos/:id', async (req, res, next) => {
    try {
        const f = await DB.Frascos.findByPk(req.params.id);
        if (!f) return res.status(404).json({ message: 'Frasco não encontrado' });
        await f.update(req.body);
        res.status(200).json({ data: f });
    } catch (e) { next(e); }
});

export default producaoRouter;
