import express from 'express';
import { randomUUID } from 'crypto';
import { authMiddleware } from '@/middlewares/auth.middleware';

const producaoRouter = express.Router();
producaoRouter.use(authMiddleware);

const producoes = new Map<string, any>();
const frascos = new Map<string, any>();
const rastreabilidade = new Map<string, any>();

producaoRouter.get('/', (_req, res) => {
    res.status(200).json({ data: Array.from(producoes.values()) });
});

producaoRouter.get('/frascos', (_req, res) => {
    res.status(200).json({ data: Array.from(frascos.values()) });
});

producaoRouter.get('/rastreabilidade', (_req, res) => {
    res.status(200).json({ data: Array.from(rastreabilidade.values()) });
});

producaoRouter.post('/', (req, res) => {
    const id = randomUUID();
    const nova = { id, ...req.body };
    producoes.set(id, nova);
    res.status(201).json({ data: nova });
});

producaoRouter.post('/frascos', (req, res) => {
    const id = randomUUID();
    const novo = { id, status: 'disponivel', ...req.body };
    frascos.set(id, novo);
    res.status(201).json({ data: novo });
});

producaoRouter.patch('/frascos/:id', (req, res) => {
    const f = frascos.get(req.params.id);
    if (!f) return res.status(404).json({ message: 'Frasco não encontrado' });
    Object.assign(f, req.body);
    frascos.set(f.id, f);
    res.status(200).json({ data: f });
});

export default producaoRouter;
