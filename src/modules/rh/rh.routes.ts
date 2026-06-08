import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const rhRouter = express.Router();
rhRouter.use(authMiddleware);

rhRouter.get('/membros', async (_req, res, next) => {
    try {
        const data = await DB.Membros.findAll({ order: [['created_at', 'DESC']] });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

rhRouter.get('/membros/:id', async (req, res, next) => {
    try {
        const m = await DB.Membros.findByPk(req.params.id);
        if (!m) return res.status(404).json({ message: 'Membro não encontrado' });
        res.status(200).json({ data: m });
    } catch (e) { next(e); }
});

rhRouter.post('/membros', async (req, res, next) => {
    try {
        const novo = await DB.Membros.create(req.body);
        res.status(201).json({ data: novo });
    } catch (e) { next(e); }
});

rhRouter.put('/membros/:id', async (req, res, next) => {
    try {
        const m = await DB.Membros.findByPk(req.params.id);
        if (!m) return res.status(404).json({ message: 'Membro não encontrado' });
        await m.update(req.body);
        res.status(200).json({ data: m });
    } catch (e) { next(e); }
});

rhRouter.delete('/membros/:id', async (req, res, next) => {
    try {
        const n = await DB.Membros.destroy({ where: { id: req.params.id } });
        if (!n) return res.status(404).json({ message: 'Membro não encontrado' });
        res.status(204).send();
    } catch (e) { next(e); }
});

export default rhRouter;
