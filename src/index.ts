import express from 'express';
import routerApi from '@routes/index';
import { logErrors, errorHandler, boomErrorHandler } from '@middlewares/errorMiddleware';
import { AppConfig } from '@config';

//import { EventProvider } from '@core/events/event.provider';

const app = express();

// Allow to receive JSON
app.use(express.json());

// Define all routes
routerApi(app);

// Log any error
app.use(logErrors);

// Boom error handlers
app.use(boomErrorHandler);

// Non Boom error handlers
app.use(errorHandler);

// Initialize event provider
//new EventProvider();

app.listen(AppConfig.port, () => {
    console.log(`Example app listening on port ${AppConfig.port}`)
});
