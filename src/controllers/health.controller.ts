import { logger } from '@logger';
import { Request, Response } from 'express';

export const healthCheck = (_req: Request, res: Response) => {
    logger.info({ method: "healthCheck" }, "HealthCheck OK");

    // @ts-ignore
    res.sendSuccess(200, {
        status: 'Server is up and running 🚀 🚀 🚀'
    });
}
