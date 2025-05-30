import { PatientRepository } from '../repositories/patient.repository';
import type { Patient } from '@prisma/client';

export class PatientService {
  /* CRUD “básico” */
  static list(): Promise<Patient[]> {
    return PatientRepository.list();
  }
  static findAll(): Promise<Patient[]> {
    return this.list();
  }

  static get(id: string): Promise<Patient | null> {
    return PatientRepository.get(id);
  }
  static findById(id: string): Promise<Patient | null> {
    return this.get(id);
  }

  static create(data: Partial<Patient>): Promise<Patient> {
    return PatientRepository.create(data);
  }

  static update(id: string, data: Partial<Patient>): Promise<Patient> {
    return PatientRepository.update(id, data);
  }

  static remove(id: string): Promise<void> {
    return PatientRepository.remove(id);
  }
  static delete(id: string): Promise<void> {
    return this.remove(id);
  }

  /* Busca por nome (case-insensitive) */
  static search(query: string): Promise<Patient[]> {
    return PatientRepository.search(query);
  }
}
