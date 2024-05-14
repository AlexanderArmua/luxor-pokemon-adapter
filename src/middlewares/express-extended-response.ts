import { RequestHandler, Request, Response, NextFunction } from 'express';

const responseFormatterMiddleware: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
    res.sendSuccess = (status: number = 200, data: any = {}) => {
        const formattedResponse = {
            data,
        };

        res.status(status).json(formattedResponse);
    };

    next();
};

export { responseFormatterMiddleware };

