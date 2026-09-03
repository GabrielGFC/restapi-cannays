import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const auditoriaRouter = express.Router();
auditoriaRouter.use(authMiddleware);

auditoriaRouter.get('/', async (req, res, next) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 100, 500);
        const data = await DB.AuditLogs.findAll({ order: [['created_at', 'DESC']], limit });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

export default auditoriaRouter;
