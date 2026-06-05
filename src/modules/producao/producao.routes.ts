import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';

const producaoRouter = express.Router();

producaoRouter.use(authMiddleware);

producaoRouter.get('/', (_req, res) => {
    res.status(200).json({ data: [] });
});

producaoRouter.get('/frascos', (_req, res) => {
    res.status(200).json({ data: [] });
});

producaoRouter.get('/rastreabilidade', (_req, res) => {
    res.status(200).json({ data: [] });
});

producaoRouter.post('/', (req, res) => {
    res.status(201).json({ data: { id: 'stub', ...req.body } });
});

export default producaoRouter;
