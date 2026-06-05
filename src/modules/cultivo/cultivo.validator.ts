import Joi from 'joi';

const etapas = ['plantio', 'vegetativo', 'floracao', 'colheita', 'concluido'];

export const createCultivoSchema = Joi.object({
    especie: Joi.string().max(100).required(),
    data_plantio: Joi.date().iso().required(),
    responsavel_id: Joi.string().uuid().required(),
    quantidade_plantas: Joi.number().integer().min(1).required(),
    local_cultivo: Joi.string().max(150).required(),
    observacoes: Joi.string().allow(null, '').optional(),
});

export const updateCultivoSchema = Joi.object({
    especie: Joi.string().max(100),
    data_plantio: Joi.date().iso(),
    responsavel_id: Joi.string().uuid(),
    quantidade_plantas: Joi.number().integer().min(1),
    local_cultivo: Joi.string().max(150),
    etapa: Joi.string().valid(...etapas),
    observacoes: Joi.string().allow(null, ''),
}).min(1);

export const etapaTransitionSchema = Joi.object({
    etapa: Joi.string()
        .valid(...etapas)
        .required(),
});
