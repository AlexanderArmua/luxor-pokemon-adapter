import { Router } from 'express';
import { getPokemons, getPokemonByPokemonId, getPokemonByPokemonNumber, addPokemonToCache } from '@controllers/pokemon.controller';

const router = Router();

router.get('/', getPokemons);

router.get('/byId/:pokemonId', getPokemonByPokemonId);

router.get('/byNumber/:pokemonNumber', getPokemonByPokemonNumber);

router.post('/', addPokemonToCache);

export default router;
