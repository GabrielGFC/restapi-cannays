import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import config from '../core/config';

import { DefaultRoute } from './default.route';
import { AuthRoute } from './auth.route';
import { UserRoute } from './user.route';
import { TaskRoute } from './task.route';

import { localeMiddleware } from '../core/middleware/locale';
import { authMiddleware } from '../core/middleware/auth';

/**
 * Global router configuration of the application
 *
 * @class
 */
class Routes {
	/**
   * @param  {Application} app
   *
   * @returns void
   */
	static init(app: express.Application): void {
		const router: express.Router = express.Router();

		// Express middleware
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(cookieParser());
		app.use(helmet());
		app.use(cors());

		app.engine('handlebars', expressHandlebars());
		app.set('view engine', 'handlebars');

		app.set('views', path.resolve(__dirname, '../views'));

		app.use(localeMiddleware);

		if (config.auth.enabled === 'true') {
			app.use(authMiddleware);
		}

		app.use('/', router);
		// default
		app.use('/', new DefaultRoute().router);
		// auth
		app.use('/', new AuthRoute().router);
		// users
		app.use('/', new UserRoute().router);
		// tasks
		app.use('/', new TaskRoute().router);

		// Static content
		app.use(express.static(path.join(__dirname, '../public')));
	}
}

export { Routes };
