import { Pool } from 'pg';
import config from '../config';
import { logger } from '../logger';
import { DB_CONNECTION_SUCCESS } from '../../utils/constants';

let pool: Pool;

/**
 * Create the connection to the PostgreSQL database
 * @async
 *
 * @return Promise<void>
 */
const dbConnection = async (): Promise<void> => {
  const dbHost: string = config.database.host;
  const dbPort: number = config.database.port;
  const dbName: string = config.database.name;
  const dbUser: string = config.database.user;
  const dbPassword: string = config.database.password;

  try {
    pool = new Pool({
      host: dbHost,
      port: dbPort,
      database: dbName,
      user: dbUser,
      password: dbPassword,
    });

    await pool.query('SELECT NOW()');

    logger.info(DB_CONNECTION_SUCCESS);
  } catch (err: any) {
    logger.error('Database connection failed', err.stack);
    process.exit(1);
  }
};

export { dbConnection, pool };
