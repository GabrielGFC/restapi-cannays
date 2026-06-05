import express from 'express';
import { randomUUID } from 'crypto';
import { authMiddleware } from '@/middlewares/auth.middleware';

const rhRouter = express.Router();
rhRouter.use(authMiddleware);

const membros = new Map<string, any>();

rhRouter.get('/membros', (_req, res) => {
    res.status(200).json({ data: Array.from(membros.values()) });
});

rhRouter.get('/membros/:id', (req, res) => {
    const m = membros.get(req.params.id);
    if (!m) return res.status(404).json({ message: 'Membro não encontrado' });
    res.status(200).json({ data: m });
});

rhRouter.post('/membros', (req, res) => {
    const id = randomUUID();
    const novo = { id, ativo: true, ...req.body };
    membros.set(id, novo);
    res.status(201).json({ data: novo });
});

rhRouter.put('/membros/:id', (req, res) => {
    const m = membros.get(req.params.id);
    if (!m) return res.status(404).json({ message: 'Membro não encontrado' });
    const atualizado = { ...m, ...req.body, id: m.id };
    membros.set(m.id, atualizado);
    res.status(200).json({ data: atualizado });
});

rhRouter.delete('/membros/:id', (req, res) => {
    if (!membros.has(req.params.id)) {
        return res.status(404).json({ message: 'Membro não encontrado' });
    }
    membros.delete(req.params.id);
    res.status(204).send();
});

export default rhRouter;
