import { Request, Response, NextFunction } from 'express';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { PokemonApi } from '@custom-types/pokemons';
import boom from '@hapi/boom';

const service = PokemonService.getInstance();

const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skip, take } = req.body;

        // TODO: ADD PAGE INFO
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
        if (!pokemon) {
            throw boom.notFound("Pokemon not found");
        }

        res.status(200).json(pokemon);
    } catch (error) {
        next(error);
    }
};

const getPokemonByPokemonName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pokemonName } = req.params;

        const pokemon = await service.findOneByPokemonName(pokemonName);
        if (!pokemon) {
            throw boom.notFound("Pokemon not found");
        }

        res.status(200).json(pokemon);
    } catch (error) {
        next(error);
    }
};

const addPokemonToCache = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: PokemonApi = req.body;

        const newPokemon = await service.storeOne(body);
        if (!newPokemon) {
            throw boom.badImplementation("Pokemon not found");
        }

        res.status(201).json({ newPokemon });
    } catch (error) {
        next(error);
    }
}

export { getPokemons, getPokemonByPokemonId, getPokemonByPokemonName, addPokemonToCache };
