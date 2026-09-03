import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const permissaoRouter = express.Router();
permissaoRouter.use(authMiddleware);

permissaoRouter.get('/', async (_req, res, next) => {
    try {
        const data = await DB.Permissoes.findAll({ order: [['perfil', 'ASC'], ['funcionalidade', 'ASC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

permissaoRouter.put('/:id', async (req, res, next) => {
    try {
        const p = await DB.Permissoes.findByPk(req.params.id);
        if (!p) return res.status(404).json({ message: 'Permissão não encontrada' });
        await p.update({ permitido: !!req.body.permitido });
        res.status(200).json({ data: p });
    } catch (e) { next(e); }
});

export default permissaoRouter;
