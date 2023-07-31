import express from 'express';
import routerApi from '@routes/index';
import { logErrors, errorHandler, boomErrorHandler } from '@middlewares/errorMiddleware';
import { AppConfig } from '@config';
import { startEventProvider } from '@events';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'
import { responseFormatterMiddleware } from '@middlewares/express-extended-response';
import { logger } from '@logger';

const app = express();

// Allow to receive JSON
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle events
startEventProvider();

// Generic response middleware
app.use(responseFormatterMiddleware);

// Define all routes
routerApi(app);

// Log any error
app.use(logErrors);

// Boom error handlers
app.use(boomErrorHandler);

// Non Boom error handlers
app.use(errorHandler);

app.listen(AppConfig.port, () => {
    logger.info(`Luxor Pokemon Adapter listening on port: ${AppConfig.port}`)
});
