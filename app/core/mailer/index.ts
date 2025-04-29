import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';

import config from '../config';
import { logger } from '../logger';
import { Locale } from '../locale';

/**
 * This class is responsible to send email with HTML template
 *
 * @class
 */
class Mailer {
	/**
   * Set a value in Redis
   * @static
   *
   * @param {Object} data
   *
   * @return void
   */
	static sendMail(data: any): void {
		try {
			const user: string = config.mail.port;

			const smtpTransport: Mail = nodemailer.createTransport({
				// @ts-ignore
				host: config.mail.host,
				port: config.mail.port,
				auth: {
					user,
					pass: config.mail.password,
				},
			});

			const filePath: string = `${path.join(__dirname, `./templates/${Locale.getLocale()}`)}/${data.template}.html`;
			const source: Buffer = fs.readFileSync(filePath);
			const template: HandlebarsTemplateDelegate<string> = handlebars.compile(source.toString());
			const html: string = template(data.context);

			const updatedData: any = {
				...data,
				html,
				from: `Node Starter <${user}>`,
				subject: Locale.trans(data.subject),
			};

			smtpTransport.sendMail(updatedData).then((result: nodemailer.SentMessageInfo): void => {
				logger.info(result.toString());
			});
		} catch (e) {
			logger.error(e);
		}
	}
}

export default Mailer;
