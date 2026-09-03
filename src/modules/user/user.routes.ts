import express from 'express';
import { compareSync, hash } from 'bcrypt';
import { getUserProfileController } from './user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { DB } from '@/database';

const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, getUserProfileController);

userRouter.put('/password', authMiddleware, async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.context?.userId;
        const user = await DB.Users.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        if (!currentPassword || !newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Senha atual e nova senha (mín. 6 caracteres) são obrigatórias' });
        }
        if (!compareSync(currentPassword, user.password)) {
            return res.status(403).json({ message: 'Senha atual incorreta' });
        }

        await user.update({ password: await hash(newPassword, 10) });
        res.status(200).json({ message: 'Senha atualizada com sucesso' });
    } catch (e) { next(e); }
});

userRouter.get('/', authMiddleware, async (_req, res, next) => {
    try {
        const data = await DB.Users.findAll({
            attributes: ['id', 'name', 'email', 'username', 'created_at'],
            order: [['created_at', 'DESC']],
        });
        res.status(200).json({ data });
    } catch (e) { next(e); }
});

export default userRouter;
