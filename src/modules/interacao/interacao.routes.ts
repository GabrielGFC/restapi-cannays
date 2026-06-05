import express from 'express';
import { randomUUID } from 'crypto';
import { authMiddleware } from '@/middlewares/auth.middleware';

const interacaoRouter = express.Router();
interacaoRouter.use(authMiddleware);

const receitas = new Map<string, any>();

interacaoRouter.get('/fila', (_req, res) => {
    const fila = Array.from(receitas.values()).filter(r =>
        ['aguardando', 'em_analise', 'ajuste_solicitado'].includes(r.status),
    );
    res.status(200).json({ data: fila });
});

interacaoRouter.get('/historico', (_req, res) => {
    const hist = Array.from(receitas.values()).filter(r =>
        ['aprovada', 'rejeitada'].includes(r.status),
    );
    res.status(200).json({ data: hist });
});

interacaoRouter.get('/:id', (req, res) => {
    const r = receitas.get(req.params.id);
    if (!r) return res.status(404).json({ message: 'Receita não encontrada' });
    res.status(200).json({ data: r });
});

interacaoRouter.post('/', (req, res) => {
    const id = randomUUID();
    const now = new Date().toISOString();
    const novo = { id, status: 'aguardando', created_at: now, ...req.body };
    receitas.set(id, novo);
    res.status(201).json({ data: novo });
});

interacaoRouter.patch('/:id/status', (req, res) => {
    const r = receitas.get(req.params.id);
    if (!r) return res.status(404).json({ message: 'Receita não encontrada' });
    Object.assign(r, req.body);
    receitas.set(r.id, r);
    res.status(200).json({ data: r });
});

export default interacaoRouter;
