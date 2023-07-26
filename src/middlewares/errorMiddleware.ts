import { Request, Response, NextFunction } from 'express';

const logger = console;

const logErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    next(err);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err.isBoom) {
        res.status(500).json({
            message: err.message,
            stack: err.stack,
        });
    }
};

const boomErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.isBoom) {
        const { output } = err;

        res.status(output.statusCode).json(output.payload);
    }

    next(err);
};

export { logErrors, errorHandler, boomErrorHandler }
