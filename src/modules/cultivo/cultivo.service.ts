import { repo } from './cultivo.repo';
import { CustomError } from '@/utils/custom-error';
import { CultivoLote, EtapaCultivo } from '@/interfaces/cultivo.interfaces';
import { CultivoLoteCreationAttributes } from '@/database/models/cultivo.model';

export const listCultivosService = () => repo.list();

export const getCultivoService = async (id: string) => {
    const lote = await repo.findById(id);
    if (!lote) throw new CustomError('Lote não encontrado', 404);
    return lote;
};

export const createCultivoService = async (
    data: CultivoLoteCreationAttributes,
) => repo.create(data);

export const updateCultivoService = async (
    id: string,
    data: Partial<CultivoLote>,
) => {
    await getCultivoService(id);
    await repo.update(id, data);
    return repo.findById(id);
};

export const transitionEtapaService = async (
    id: string,
    etapa: EtapaCultivo,
) => {
    await getCultivoService(id);
    await repo.update(id, { etapa });
    return repo.findById(id);
};

export const deleteCultivoService = async (id: string) => {
    const removed = await repo.remove(id);
    if (!removed) throw new CustomError('Lote não encontrado', 404);
    return { id };
};
