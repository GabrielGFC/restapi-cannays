import authRouter from '@/modules/auth/auth.routes';
import userRouter from '@/modules/user/user.routes';
import cultivoRouter from '@/modules/cultivo/cultivo.routes';
import express from 'express';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/cultivo', cultivoRouter);

export default router;
