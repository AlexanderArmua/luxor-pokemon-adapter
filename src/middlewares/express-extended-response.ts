import { RequestHandler } from 'express';

const responseFormatterMiddleware: RequestHandler = (_req, res, next) => {
    (res as any).sendSuccess = (status: number = 200, data: any = {}) => {
        const formattedResponse = {
            data,
        };

        res.status(status).json(formattedResponse);
    };

    next();
};

export { responseFormatterMiddleware };

