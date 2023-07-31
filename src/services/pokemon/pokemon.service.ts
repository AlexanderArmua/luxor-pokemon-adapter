import { GraphQlApiRepository } from '@repositories/pokemonAPI/pokemonAPIRepository';
import { PokemonRepository } from '@repositories/pokemonBD/pokemonsRepository';
import { PokemonApi } from '@custom-types/pokemons';
import { EventManager } from 'lib/events/event.manager';
import { PokemonBD } from '@repositories/pokemonBD/types';
import { logger } from '@logger';

const mapPokemonFromDbToService = (pokemon: PokemonBD): PokemonApi => {
  const evolutions = pokemon.evolutions.map(evolution => evolution.basePokemon as unknown as PokemonApi);

  return {
    ...pokemon.data as unknown as PokemonApi,
    evolutions
  };
}

const mapPokemonsFromDbToService = (pokemons: PokemonBD[]): PokemonApi[] => {
  return pokemons.map(mapPokemonFromDbToService);
}

export class PokemonService {
  private static instance: PokemonService;

  private static pokemonAPI = new GraphQlApiRepository();
  private static pokemonDB = new PokemonRepository();

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }

    return PokemonService.instance;
  }

  async findAll(skip: number, take: number): Promise<PokemonApi[]> {
    const log = logger.child({ method: "findAll", skip, take });

    const pokemonsDB = await PokemonService.pokemonDB.findAll(skip, take);
    if (pokemonsDB.length === take) {
      log.info("Found all pokemons in DB, returning");

      return mapPokemonsFromDbToService(pokemonsDB);
    }

    log.info({ pokemonsDB: pokemonsDB.length }, "Doesn't have all pokemons in DB, calling to API");
    const pokemonsAPI = await PokemonService.pokemonAPI.getPokemonsInRange(skip, take);
    if (pokemonsAPI.length > 0) {      
      for (const newPokemon of pokemonsAPI) {
        EventManager.emitNewPokemon(newPokemon);
      }

      log.info("Returning pokemons from API");

      return pokemonsAPI;
    }

    log.warn("Couldn't find any pokemon return empty");

    return [];
  }

  async findOneByPokemonId(pokemonId: string): Promise<PokemonApi | null> {
    const log = logger.child({ method: "findOneByPokemonId", pokemonId });

    const pokemon = await PokemonService.pokemonDB.findOneByPokemonId(pokemonId);
    if (pokemon) {
      log.info({ pokemon }, "Found pokemon on BD, returning");
      return mapPokemonFromDbToService(pokemon);
    }

    const pokemonAPI = await PokemonService.pokemonAPI.getPokemonById(pokemonId);
    if (pokemonAPI) {
      EventManager.emitNewPokemon(pokemonAPI);

      log.info({ pokemonAPI }, "Found pokemon on API, returning");

      return pokemonAPI;
    }

    log.warn("Couldn't find any pokemon returning null");

    return null;
  }

  async findOneByPokemonName(pokemonName: string): Promise<PokemonApi | null> {
    const log = logger.child({ method: "findOneByPokemonName", pokemonName });

    const pokemon = await PokemonService.pokemonDB.findOneByPokemonName(pokemonName);
    if (pokemon) {
      log.info({ pokemon }, "Found pokemon on BD, returning");
      return mapPokemonFromDbToService(pokemon);
    }

    const pokemonAPI = await PokemonService.pokemonAPI.getPokemonByName(pokemonName);
    if (pokemonAPI) {
      EventManager.emitNewPokemon(pokemonAPI);

      log.info({ pokemonAPI }, "Found pokemon on API, returning");

      return pokemonAPI
    }

    log.warn("Couldn't find any pokemon returning null");

    return null;
  }

  async storeOne(data: PokemonApi): Promise<PokemonApi | null> {
    const pokemonCreated = await PokemonService.pokemonDB.storeOne(data.id, data.name, Number(data.number), data);
    if (!pokemonCreated) {
      return null;
    }

    return mapPokemonFromDbToService(pokemonCreated);
  }
}
