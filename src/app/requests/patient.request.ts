import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const PatientSchema = z
    .object({
      name: z.string().min(3).openapi({ example: 'Alice' }),
      bornAt: z.coerce.date().openapi({ example: '1999-05-05' }),
    })
    .openapi('PatientInput');

type PatientFull    = z.infer<typeof PatientSchema>;
type PatientPartial = Partial<PatientFull>;

export function validate(raw: unknown, requireAll: true):  PatientFull;
export function validate(raw: unknown, requireAll?: false): PatientPartial;
export function validate(raw: unknown, requireAll = true) {
  const schema = requireAll ? PatientSchema : PatientSchema.partial();
  return schema.parse(raw);
}
