import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import {
    createCultivoController,
    deleteCultivoController,
    getCultivoController,
    listCultivosController,
    transitionEtapaController,
    updateCultivoController,
} from './cultivo.controller';

const cultivoRouter = express.Router();

cultivoRouter.use(authMiddleware);
cultivoRouter.get('/', listCultivosController);
cultivoRouter.get('/:id', getCultivoController);
cultivoRouter.post('/', createCultivoController);
cultivoRouter.put('/:id', updateCultivoController);
cultivoRouter.patch('/:id/etapa', transitionEtapaController);
cultivoRouter.delete('/:id', deleteCultivoController);

export default cultivoRouter;
