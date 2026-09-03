import authRouter from '@/modules/auth/auth.routes';
import userRouter from '@/modules/user/user.routes';
import cultivoRouter from '@/modules/cultivo/cultivo.routes';
import interacaoRouter from '@/modules/interacao/interacao.routes';
import rhRouter from '@/modules/rh/rh.routes';
import producaoRouter from '@/modules/producao/producao.routes';
import associacaoRouter from '@/modules/associacao/associacao.routes';
import permissaoRouter from '@/modules/permissao/permissao.routes';
import auditoriaRouter from '@/modules/auditoria/auditoria.routes';
import notificacaoRouter from '@/modules/notificacao/notificacao.routes';
import integracaoRouter from '@/modules/integracao/integracao.routes';
import dashboardRouter from '@/modules/dashboard/dashboard.routes';
import express from 'express';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/cultivo', cultivoRouter);
router.use('/interacao', interacaoRouter);
router.use('/rh', rhRouter);
router.use('/producao', producaoRouter);
router.use('/associacao', associacaoRouter);
router.use('/permissoes', permissaoRouter);
router.use('/auditoria', auditoriaRouter);
router.use('/notificacoes', notificacaoRouter);
router.use('/integracoes', integracaoRouter);
router.use('/dashboard', dashboardRouter);

export default router;
