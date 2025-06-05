import { Request, Response, NextFunction } from 'express';
import { CustomError } from './custom-error';

export const errorHandler = (
    err: Error | CustomError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
};
