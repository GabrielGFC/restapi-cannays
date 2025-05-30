import { Router } from 'express';
import { showCompany } from '../controllers/gov.controller';

export const govRouter = Router();

govRouter.get('/companies/:cnpj', showCompany);