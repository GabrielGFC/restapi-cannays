import type { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';
import { validate } from '../requests/patient.request';

export class PatientController {
  static async store(req: Request, res: Response) {
    try {
      const data = validate(req.body, true);
      const saved = await PatientService.create(data);
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(422).json({ errors: err.errors ?? err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = validate(req.body, false);
      const upd  = await PatientService.update(req.params.id, data);
      res.json(upd);
    } catch (err: any) {
      res.status(422).json({ errors: err.errors ?? err.message });
    }
  }
    static async destroy(req: Request, res: Response) {
        try {
        await PatientService.delete(req.params.id);
        res.status(204).send();
        } catch (err: any) {
        res.status(422).json({ errors: err.errors ?? err.message });
        }
    }
    static async show(req: Request, res: Response) {
        try {
            const patient = await PatientService.findById(req.params.id);
            if (!patient) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            res.json(patient);
        } catch (err: any) {
            res.status(422).json({ errors: err.errors ?? err.message });
        }
    }
    static async index(_req: Request, res: Response) {
        try {
            const patients = await PatientService.findAll();
            res.json(patients);
        } catch (err: any) {
            res.status(422).json({ errors: err.errors ?? err.message });
        }
    }
    static async search(req: Request, res: Response) {
        try {
            const query = req.query.q as string;
            const patients = await PatientService.search(query);
            res.json(patients);
        } catch (err: any) {
            res.status(422).json({ errors: err.errors ?? err.message });
        }
    }

}
