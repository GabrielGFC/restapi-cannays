import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from '@asteasolutions/zod-to-openapi';
import { PatientSchema } from '../app/requests/patient.request';

export function buildSwagger() {
  const registry = new OpenAPIRegistry();

  // ─── Schemas ─────────────────────────────────────────────────────
  registry.register('PatientInput', PatientSchema);

  // ─── Paths ───────────────────────────────────────────────────────
  registry.registerPath({
    method: 'get',
    path: '/patients',
    tags: ['Patients'],
    responses: {
      200: { description: 'OK' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/patients',
    tags: ['Patients'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: registry.getRef('PatientInput'),
          },
        },
      },
    },
    responses: {
      201: { description: 'Created' },
    },
  });

  const generator = new OpenApiGeneratorV31(registry.definitions);
  return generator.generateDocument({
    info: { title: 'Medical API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
  });
}
