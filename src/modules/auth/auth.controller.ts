import { NextFunction, Request, Response } from 'express';
import { signInService, signUpService } from './auth.service';

export const signUpController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signUpService(userData);
        const u: any = (response.user as any).toJSON ? (response.user as any).toJSON() : response.user;
        const { password: _pw, ...safeUser } = u;

        res.status(201).json({
            message: 'Successfully signed up',
            data: safeUser,
        });
    } catch (error) {
        next(error);
    }
};

export const signInController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signInService(userData);
        const u: any = (response.user as any).toJSON ? (response.user as any).toJSON() : response.user;
        const { password: _pw, ...safeUser } = u;

        res.status(200).json({
            message: 'Successfully signed in',
            data: { user: safeUser, accessToken: response.accessToken },
        });
    } catch (error) {
        next(error);
    }
};
