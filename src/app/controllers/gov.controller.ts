import { Request, Response } from 'express';
import { GovService } from '../integrations/govBR/gov.service';
import { z } from 'zod';

const schema = z.object({ cnpj: z.string().length(14) });

export async function showCompany(req: Request, res: Response) {
  const parsed = schema.safeParse(req.params);
  if (!parsed.success) return res.status(400).json(parsed.error);
  try {
    const data = await GovService.findCompanyByCnpj(parsed.data.cnpj);
    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(502).json({ error: 'Erro na API do governo' });
  }
}