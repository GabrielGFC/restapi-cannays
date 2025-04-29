import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const paths: Record<string, string> = {
    test: '../../../.env.test',
    dev: '../../../.env',
    production: '../../.env.prod',
};

const configPath: string = path.resolve(__dirname, paths[process.env.NODE_ENV || 'dev']);
const envConfig = dotenv.parse(fs.readFileSync(configPath));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const config = {
    env: process.env.NODE_ENV || '',
    baseUrl: process.env.BASE_URL || '',
    server: {
        port: parseInt(process.env.SERVER_PORT || '7010', 10),
        appName: process.env.APP_NAME || '',
        appVersion: process.env.APP_VERSION || '',
        apiBase: process.env.API_BASE || '',
        timezone: process.env.DEFAULT_TIMEZONE || '',
    },
    auth: {
        enabled: process.env.AUTH_ENABLED || 'true',
        jwt: {
            secret: process.env.JWT_SECRET || '',
            expire: parseInt(process.env.JWT_EXPIRE || '86400', 10),
            emailSecret: process.env.JWT_EMAIL_SECRET || '',
            emailExpire: parseInt(process.env.JWT_EMAIL_EXPIRE || '300', 10),
            refreshSecret: process.env.JWT_REFRESH_SECRET || '',
            refreshExpire: parseInt(process.env.JWT_REFRESH_EXPIRE || '608400', 10),
        },
    },
    database: {
        host: process.env.DB_HOST || '',
        port: parseInt(process.env.DB_PORT || '27017', 10),
        name: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        authSource: process.env.DB_AUTH || '',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
    mail: {
        username: process.env.MAIL_USERNAME || '',
        password: process.env.MAIL_PASSWORD || '',
        host: process.env.MAIL_HOST || '',
        port: process.env.MAIL_PORT || '',
    },
    urls: {
        webAppUrl: process.env.WEB_APP_URL || '',
        resetPasswordPath: process.env.RESET_PASSWORD_PATH || '',
        confirmAccountPath: process.env.CONFIRM_ACCOUNT_PATH || '',
    },
    upload: {
        avatarPath: process.env.UPLOAD_AVATAR_PATH || '',
    },
    log: {
        fileDir: process.env.LOG_FILE_DIR || '',
    },
};

export default config;
