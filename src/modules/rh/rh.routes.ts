import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';

const rhRouter = express.Router();

rhRouter.use(authMiddleware);

rhRouter.get('/membros', (_req, res) => {
    res.status(200).json({ data: [] });
});

rhRouter.get('/membros/:id', (req, res) => {
    res.status(404).json({ message: `Membro ${req.params.id} não encontrado` });
});

rhRouter.post('/membros', (req, res) => {
    res.status(201).json({ data: { id: 'stub', ...req.body } });
});

rhRouter.put('/membros/:id', (req, res) => {
    res.status(200).json({ data: { id: req.params.id, ...req.body } });
});

export default rhRouter;
