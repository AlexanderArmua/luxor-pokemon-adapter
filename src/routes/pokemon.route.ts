import { Router } from 'express';
import { getPokemons, getPokemonByPokemonId, getPokemonByPokemonName, addPokemonToCache } from '@controllers/pokemon.controller';

const router = Router();

router.post('/byRange', getPokemons);

router.get('/byId/:pokemonId', getPokemonByPokemonId);

router.get('/byName/:pokemonName', getPokemonByPokemonName);

router.post('/', addPokemonToCache);

export default router;
