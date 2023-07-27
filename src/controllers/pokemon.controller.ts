import { Request, Response, NextFunction } from 'express';

import { PokemonService } from '@services/pokemon/pokemon.service';

const service = PokemonService.getInstance();

const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skip, take } = req.body;

        const pokemons = await service.findAll(skip, take);

        res.status(200).json(pokemons);
    } catch (error) {
        next(error);
    }
};

const getPokemonByPokemonId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pokemonId } = req.params;

        const pokemon = await service.findOneByPokemonId(pokemonId);

        res.status(201).json(pokemon);
    } catch (error) {
        next(error);
    }
};

const getPokemonByPokemonName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pokemonName } = req.params;

        const pokemon = await service.findOneByPokemonName(pokemonName);

        res.status(201).json(pokemon);
    } catch (error) {
        next(error);
    }
};

const addPokemonToCache = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        res.status(201).json({ newPokemon: body });
    } catch (error) {
        next(error);
    }
}

export { getPokemons, getPokemonByPokemonId, getPokemonByPokemonName, addPokemonToCache };
