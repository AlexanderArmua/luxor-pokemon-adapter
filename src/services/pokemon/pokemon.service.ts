import { GraphQlApiRepository } from '@repositories/pokemonAPI/pokemonAPIRepository';
import { PokemonRepository } from '@repositories/pokemonBD/pokemonsRepository';
import { PokemonApi } from '@custom-types/pokemons';
import { EventManager } from 'lib/events/event.manager';
import POKEMON_EVENTS from 'lib/events/event.constant';

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
    // TODO: Podría llamarse a un COUNT primero y evitar traerse todos los datos, dado que no se hace ningun join no lo considero prioritario
    const pokemonsDB = await PokemonService.pokemonDB.findAll(skip, take);

    // TODO: Si de maximo hay 150 resultados y alguien pide 10 a partir del 149, nunca va a dar la cuenta
      // resultando en que siempre se vaya a la API aun cuando no hay información nueva
    if (pokemonsDB.length === take) {
      return pokemonsDB.map(p => p.data as unknown as PokemonApi);
    }

    const pokemonsAPI = await PokemonService.pokemonAPI.getPokemonsInRange(skip + take);
    if (pokemonsAPI.length > 0) {
      for (const newPokemon of pokemonsAPI) {
        // TODO: Explicar el problema de no tener un mutex, como puede pasar que dos pokemons pueden tratar de insertarse al mismo tiempo
        EventManager.emitEvent(POKEMON_EVENTS.NEW_POKEMON_CREATED, newPokemon);
      }
    }

    return pokemonsAPI.slice(-take);
  }

  async findOneByPokemonId(pokemonId: string): Promise<PokemonApi | null> {
    const pokemon = await PokemonService.pokemonDB.findOneByPokemonId(pokemonId);
    if (pokemon) {
      return pokemon.data as unknown as PokemonApi;
    }

    const pokemonAPI = await PokemonService.pokemonAPI.getPokemonById(pokemonId);
    if (pokemonAPI) {
      EventManager.emitEvent(POKEMON_EVENTS.NEW_POKEMON_CREATED, pokemonAPI);
    }

    return pokemonAPI;
  }

  async findOneByPokemonName(pokemonName: string): Promise<PokemonApi | null> {
    const pokemon = await PokemonService.pokemonDB.findOneByPokemonName(pokemonName);
    if (pokemon) {
      return pokemon.data as unknown as PokemonApi;
    }

    const pokemonAPI = await PokemonService.pokemonAPI.getPokemonByName(pokemonName);
    if (pokemonAPI) {
      EventManager.emitEvent(POKEMON_EVENTS.NEW_POKEMON_CREATED, pokemonAPI);
    }

    return pokemonAPI;
  }

  async storeOne(data: PokemonApi): Promise<PokemonApi | null> {
    const pokemonCreated = await PokemonService.pokemonDB.storeOne(data.id, data.name, Number(data.number), data);

    // TODO: Buscar la forma en la que se pueda evitar esta transformación
    return pokemonCreated?.data as unknown as PokemonApi;
  }
}
