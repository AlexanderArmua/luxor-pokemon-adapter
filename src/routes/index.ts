import express, { Express } from 'express';
import pokemonsRoutes from '@routes/pokemon.route';
import healthRoutes from '@routes/health.route';

const routerApi = (app: Express) => {
    const router = express.Router();

    router.use('/', healthRoutes);

    app.use('/api/v1', router);

    router.use('/pokemons', pokemonsRoutes);
}

export default routerApi;
