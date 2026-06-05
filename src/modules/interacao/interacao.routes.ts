import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';

const interacaoRouter = express.Router();

interacaoRouter.use(authMiddleware);

interacaoRouter.get('/fila', (_req, res) => {
    res.status(200).json({ data: [] });
});

interacaoRouter.get('/historico', (_req, res) => {
    res.status(200).json({ data: [] });
});

interacaoRouter.get('/:id', (req, res) => {
    res.status(404).json({ message: `Receita ${req.params.id} não encontrada` });
});

interacaoRouter.patch('/:id/status', (req, res) => {
    res.status(200).json({ data: { id: req.params.id, ...req.body } });
});

export default interacaoRouter;
