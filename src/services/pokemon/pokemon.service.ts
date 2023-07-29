import { GraphQlApiRepository } from '@repositories/pokemonAPI/pokemonAPIRepository';
import { PokemonRepository } from '@repositories/pokemonBD/pokemonsRepository';
import { PokemonApi } from '@custom-types/pokemons';
import { EventManager } from 'lib/events/event.manager';
import { PokemonBD } from '@repositories/pokemonBD/types';

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
    const pokemonsDB = await PokemonService.pokemonDB.findAll(skip, take);
    
    // TODO: No podemos saber cuando termina porque la API no nos da esa información
    if (pokemonsDB.length === take) {
      return mapPokemonsFromDbToService(pokemonsDB);
    }

    const pokemonsAPI = await PokemonService.pokemonAPI.getPokemonsInRange(skip + take);
    if (pokemonsAPI.length > 0) {      
      for (const newPokemon of pokemonsAPI) {
        EventManager.emitNewPokemon(newPokemon);
      }

      // TODO: Asumimos que la API devuelve ordenado
      // TODO: Take que supere el límite de la BD retorna cosas innecesarias
      return pokemonsAPI.slice(-take);
    }

    return [];
  }

  async findOneByPokemonId(pokemonId: string): Promise<PokemonApi | null> {
    const pokemon = await PokemonService.pokemonDB.findOneByPokemonId(pokemonId);
    if (pokemon) {
      return mapPokemonFromDbToService(pokemon);
    }

    const pokemonAPI = await PokemonService.pokemonAPI.getPokemonById(pokemonId);
    if (pokemonAPI) {
      EventManager.emitNewPokemon(pokemonAPI);

      return pokemonAPI;
    }

    return null;
  }

  async findOneByPokemonName(pokemonName: string): Promise<PokemonApi | null> {
    const pokemon = await PokemonService.pokemonDB.findOneByPokemonName(pokemonName);
    if (pokemon) {
      return mapPokemonFromDbToService(pokemon);
    }

    const pokemonAPI = await PokemonService.pokemonAPI.getPokemonByName(pokemonName);
    if (pokemonAPI) {
      // TODO: Si el pokemon tiene evoluciones, hay que generar llamadas recursiva por cada una hasta que no tenga
      EventManager.emitNewPokemon(pokemonAPI);

      return pokemonAPI
    }

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
