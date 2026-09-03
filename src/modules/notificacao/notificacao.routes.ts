import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const notificacaoRouter = express.Router();
notificacaoRouter.use(authMiddleware);

notificacaoRouter.get('/', async (_req, res, next) => {
    try {
        const data = await DB.NotificacaoRegras.findAll({ order: [['evento', 'ASC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

notificacaoRouter.put('/:id', async (req, res, next) => {
    try {
        const r = await DB.NotificacaoRegras.findByPk(req.params.id);
        if (!r) return res.status(404).json({ message: 'Regra não encontrada' });
        await r.update(req.body);
        res.status(200).json({ data: r });
    } catch (e) { next(e); }
});

export default notificacaoRouter;
