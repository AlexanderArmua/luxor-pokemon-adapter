import { logger } from '@logger';
import { Request, Response } from 'express';

export const healthCheck = (_req: Request, res: Response) => {
    logger.info({ method: "healthCheck" }, "HealthCheck OK");

    // @ts-ignore
    res.sendSuccess(200, {
        statusCode: 200,
        status: 'success',
        message: 'Pokemon adapter is up and running...🚀 🚀 🚀',
    });
}
