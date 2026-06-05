import { NextFunction, Request, Response } from 'express';
import {
    createCultivoSchema,
    etapaTransitionSchema,
    updateCultivoSchema,
} from './cultivo.validator';
import {
    createCultivoService,
    deleteCultivoService,
    getCultivoService,
    listCultivosService,
    transitionEtapaService,
    updateCultivoService,
} from './cultivo.service';
import { CustomError } from '@/utils/custom-error';

export const listCultivosController = async (
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = await listCultivosService();
        res.status(200).json({ message: 'Lotes listados', data });
    } catch (e) {
        next(e);
    }
};

export const getCultivoController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = await getCultivoService(req.params.id);
        res.status(200).json({ message: 'Lote encontrado', data });
    } catch (e) {
        next(e);
    }
};

export const createCultivoController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { error, value } = createCultivoSchema.validate(req.body);
        if (error) throw new CustomError(error.message, 400);
        const data = await createCultivoService(value);
        res.status(201).json({ message: 'Lote criado', data });
    } catch (e) {
        next(e);
    }
};

export const updateCultivoController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { error, value } = updateCultivoSchema.validate(req.body);
        if (error) throw new CustomError(error.message, 400);
        const data = await updateCultivoService(req.params.id, value);
        res.status(200).json({ message: 'Lote atualizado', data });
    } catch (e) {
        next(e);
    }
};

export const transitionEtapaController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { error, value } = etapaTransitionSchema.validate(req.body);
        if (error) throw new CustomError(error.message, 400);
        const data = await transitionEtapaService(req.params.id, value.etapa);
        res.status(200).json({ message: 'Etapa atualizada', data });
    } catch (e) {
        next(e);
    }
};

export const deleteCultivoController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = await deleteCultivoService(req.params.id);
        res.status(200).json({ message: 'Lote removido', data });
    } catch (e) {
        next(e);
    }
};
