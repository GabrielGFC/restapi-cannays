import authRouter from '@/modules/auth/auth.routes';
import userRouter from '@/modules/user/user.routes';
import cultivoRouter from '@/modules/cultivo/cultivo.routes';
import interacaoRouter from '@/modules/interacao/interacao.routes';
import rhRouter from '@/modules/rh/rh.routes';
import producaoRouter from '@/modules/producao/producao.routes';
import express from 'express';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/cultivo', cultivoRouter);
router.use('/interacao', interacaoRouter);
router.use('/rh', rhRouter);
router.use('/producao', producaoRouter);

export default router;
