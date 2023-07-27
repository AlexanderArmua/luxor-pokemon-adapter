import prisma from '@db/prisma-client';
import { Pokemon, Prisma } from '@prisma/client';
import { GraphQlApiRepository } from '@repositories/pokemonAPI/pokemonAPIRepository';
import { PokemonRepository } from '@repositories/pokemonBD/pokemonsRepository';
import { PokemonApi } from '@custom-types/pokemons';

export class PokemonService {
  private static instance: PokemonService;
  private static pokemonAPI: GraphQlApiRepository;
  private static pokemonDB: PokemonRepository;

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();

      // TODO: Redifinir mejor
      PokemonService.pokemonAPI = new GraphQlApiRepository();
      PokemonService.pokemonDB = new PokemonRepository();
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
      // TODO: Mover a un evento
      for await (const pokemonAPI of pokemonsAPI) {
        // TODO: Explicar el problema de no tener un mutex, como puede pasar que dos pokemons pueden tratar de insertarse al mismo tiempo
        await PokemonService.pokemonDB.storeOne(pokemonAPI.id, pokemonAPI.name, Number(pokemonAPI.number), pokemonAPI);
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
      // TODO: Mover a un evento
      await PokemonService.pokemonDB.storeOne(pokemonAPI.id, pokemonAPI.name, Number(pokemonAPI.number), pokemonAPI);
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
      // TODO: Mover a un evento
      await PokemonService.pokemonDB.storeOne(pokemonAPI.id, pokemonAPI.name, Number(pokemonAPI.number), pokemonAPI);
    }

    return pokemonAPI;
  }

  async storeOne(data: Pokemon): Promise<Pokemon | null> {
    const { name, pokemonId, number } = data;

    return await prisma.pokemon.create({
      data: {
        name,
        pokemonId,
        number,
        data: data as unknown as Prisma.JsonObject
      }
    })
  }
}
