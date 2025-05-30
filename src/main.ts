import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { buildSwagger } from './core/swagger';
import { govRouter } from './app/routes/gov.routes';
import { patientRouter } from './app/routes/patient.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/patients', patientRouter);
app.use('/gov', govRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(buildSwagger()));

app.get('/health', (_req: Request, res: Response): void => {
    res.json({ status: 'ok' });
});

app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err);
      res.status(500).json({ error: 'Internal' });
    },
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API running on', PORT));
