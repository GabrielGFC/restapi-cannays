import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const associacaoRouter = express.Router();
associacaoRouter.use(authMiddleware);

associacaoRouter.get('/', async (_req, res, next) => {
    try {
        const data = await DB.Associacao.findOne({ order: [['created_at', 'ASC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

associacaoRouter.put('/', async (req, res, next) => {
    try {
        const existing = await DB.Associacao.findOne({ order: [['created_at', 'ASC']] });
        const data = existing
            ? await existing.update(req.body)
            : await DB.Associacao.create(req.body);
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

export default associacaoRouter;
