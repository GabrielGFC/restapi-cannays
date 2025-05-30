import { PrismaClient, Patient } from '@prisma/client';
const prisma = new PrismaClient();

export class PatientRepository {
    static list(): Promise<Patient[]> {
        return prisma.patient.findMany();
    }
    static get(id: string): Promise<Patient | null> {
        return prisma.patient.findUnique({ where: { id } });
    }
    static create(data: Partial<Patient>): Promise<Patient> {
        return prisma.patient.create({ data });
    }
    static update(id: string, data: Partial<Patient>): Promise<Patient> {
        return prisma.patient.update({ where: { id }, data });
    }
    static async remove(id: string): Promise<void> {
        await prisma.patient.delete({ where: { id } });
    }

    /* novo — pesquisa por nome */
    static search(q: string): Promise<Patient[]> {
        return prisma.patient.findMany({
            where: {
                name: { contains: q, mode: 'insensitive' },
            },
        });
    }
}
