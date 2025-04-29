import http from 'http';
import express, { Application } from 'express';
import config from './core/config';

import { Routes } from './routes';
import { Locale } from './core/locale';
import { logger } from './core/logger';
import { dbConnection } from './core/db/connect';

const port: number = config.database.port;

const app: Application = express();

Routes.init(app);

const server: http.Server = http.createServer(app);

server.listen(port, async() => {
	await dbConnection();

	Locale.init();

	logger.info(`Server started - ${port}`);
});

export { server };
