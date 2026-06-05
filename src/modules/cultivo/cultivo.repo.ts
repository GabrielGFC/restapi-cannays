import { DB } from '@/database';
import { CultivoLote } from '@/interfaces/cultivo.interfaces';
import { CultivoLoteCreationAttributes } from '@/database/models/cultivo.model';

export const repo = {
    list: async (): Promise<CultivoLote[]> => {
        return await DB.CultivoLotes.findAll({ order: [['created_at', 'DESC']] });
    },
    findById: async (id: string): Promise<CultivoLote | null> => {
        return await DB.CultivoLotes.findOne({ where: { id } });
    },
    create: async (
        data: CultivoLoteCreationAttributes,
    ): Promise<CultivoLote> => {
        return await DB.CultivoLotes.create(data);
    },
    update: async (
        id: string,
        data: Partial<CultivoLote>,
    ): Promise<[number]> => {
        return await DB.CultivoLotes.update(data, { where: { id } });
    },
    remove: async (id: string): Promise<number> => {
        return await DB.CultivoLotes.destroy({ where: { id } });
    },
};
