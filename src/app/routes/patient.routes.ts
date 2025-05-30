import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';

export const patientRouter = Router();

patientRouter.get('/', PatientController.index);
patientRouter.get('/:id', PatientController.show);
patientRouter.post('/', PatientController.store);
patientRouter.put('/:id', PatientController.update);
patientRouter.delete('/:id', PatientController.destroy);