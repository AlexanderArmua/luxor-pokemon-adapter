import { Request, Response, NextFunction } from 'express';
import { PokemonService } from '@services/pokemon/pokemon.service';
import boom from '@hapi/boom';
import { PokemonApi } from '@custom-types/pokemons';
import { logger } from '@logger';

const service = PokemonService.getInstance();

const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child({ method: "getPokemons" });
    try {
        const { skip, take } = req.body;

        const pokemons = await service.findAll(skip, take);

        log.info({ skip, take, pokemons }, "Returned pokemons by range");

        res.sendSuccess(200, pokemons);
    } catch (error) {
        next(error);
    }
};

const getPokemonByPokemonId = async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child({ method: "getPokemonByPokemonId" });
    try {
        const { pokemonId } = req.params;

        const pokemon = await service.findOneByPokemonId(pokemonId);
        if (!pokemon) {            
            throw boom.notFound(`Pokemon not found by id: ${pokemonId}`);
        }

        log.info({ pokemonId, pokemon }, "Returned pokemon by id");

        res.sendSuccess(200, pokemon);
    } catch (error) {
        next(error);
    }
};

const getPokemonByPokemonName = async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child({ method: "getPokemonByPokemonName" });
    try {
        const { pokemonName } = req.params;

        const pokemon = await service.findOneByPokemonName(pokemonName);
        if (!pokemon) {
            throw boom.notFound(`Pokemon not found by name: ${pokemonName}`);
        }
        log.info({ pokemonName, pokemon }, "Returned pokemon by name");

        res.sendSuccess(200, pokemon);
    } catch (error) {
        next(error);
    }
};

const addPokemonToCache = async (req: Request, res: Response, next: NextFunction) => {
    const log = logger.child({ method: "addPokemonToCache" });
    try {
        const body: PokemonApi = req.body;

        const newPokemon = await service.storeOne(body);
        if (!newPokemon) {
            throw boom.badImplementation("Pokemon not found");
        }
        log.info({ newPokemon }, "Created new Pokemon");

        res.sendSuccess(201, newPokemon);
    } catch (error) {
        next(error);
    }
}

export { getPokemons, getPokemonByPokemonId, getPokemonByPokemonName, addPokemonToCache };
