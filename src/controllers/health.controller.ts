import { Request, Response } from 'express';

// TODO: Mejorar y agregar controles por comunicación con la API y Base de datos
export const healthCheck = (_req: Request, res: Response) => {
    res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Pokemon adapter is up and running...🚀 🚀 🚀',
    });
}
