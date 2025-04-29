import path from 'path';
import fs from 'fs';
import { createLogger, format, transports, Logger } from 'winston';

import config from '../config';

const { combine, timestamp, printf }: any = format;
const t: any = require('winston-daily-rotate-file');

const logFileDir: string = path.join(__dirname, config.upload.avatarPath);

if (!fs.existsSync(logFileDir)) {
	fs.mkdirSync(logFileDir);
}

const transport: any = new (t)({
	dirname: logFileDir,
	filename: 'logs/app-%DATE%.log',
	datePattern: 'YYYY-MM-DD-HH',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
});


const myFormat: any = printf(({ level, message, timestamp }: any) => {
	return `${timestamp} ${level}: ${message}`;
});

const logger: Logger = createLogger({
	format: combine(
		timestamp(),
		myFormat,
	),
	transports: [
		transport,
		new transports.Console(),
	],
});

export { logger };
