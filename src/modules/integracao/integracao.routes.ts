import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const integracaoRouter = express.Router();
integracaoRouter.use(authMiddleware);

integracaoRouter.get('/', async (_req, res, next) => {
    try {
        const data = await DB.Integracoes.findAll({ order: [['created_at', 'DESC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

integracaoRouter.post('/', async (req, res, next) => {
    try {
        if (!req.body.nome || !String(req.body.nome).trim()) {
            return res.status(400).json({ message: 'Nome é obrigatório' });
        }
        const nova = await DB.Integracoes.create(req.body);
        res.status(201).json({ data: nova });
    } catch (e) { next(e); }
});

integracaoRouter.put('/:id', async (req, res, next) => {
    try {
        const i = await DB.Integracoes.findByPk(req.params.id);
        if (!i) return res.status(404).json({ message: 'Integração não encontrada' });
        await i.update(req.body);
        res.status(200).json({ data: i });
    } catch (e) { next(e); }
});

integracaoRouter.delete('/:id', async (req, res, next) => {
    try {
        const n = await DB.Integracoes.destroy({ where: { id: req.params.id } });
        if (!n) return res.status(404).json({ message: 'Integração não encontrada' });
        res.status(204).send();
    } catch (e) { next(e); }
});

export default integracaoRouter;
