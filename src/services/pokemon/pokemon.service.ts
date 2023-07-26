import prisma from '@db/prisma-client';
import { Pokemon, Prisma } from '@prisma/client';
import { GraphQlApiRepository } from 'repositories/pokemonAPI/pokemonAPIRepository';
import { PokemonRepository } from 'repositories/pokemonBD/pokemonsRepository';
import { PokemonApi } from 'types/pokemons';

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

  async findAll(): Promise<Pokemon[]> {
    return await prisma.pokemon.findMany();
  }

  async findOneByPokemonId(pokemonId: string): Promise<PokemonApi | null> {
    let pokemon = await PokemonService.pokemonDB.findOneByPokemonId(pokemonId);

    if (!pokemon) {
      const pokemonAPI = await PokemonService.pokemonAPI.getPokemonById(pokemonId);

      if (pokemonAPI) {
        // TODO: Mover a un evento
        await PokemonService.pokemonDB.storeOne(pokemonAPI.id, pokemonAPI.name, pokemonAPI);
      }

      return pokemonAPI;
    }

    return pokemon.data as unknown as PokemonApi;
  }

  async findOneByPokemonName(name: string): Promise<Pokemon | null> {
    return await prisma.pokemon.findUnique({
      where: {
        name
      }
    })
  }

  async storeOne(data: Pokemon): Promise<Pokemon | null> {
    return await prisma.pokemon.create({
      data: {
        name: data.name,
        pokemonId: data.pokemonId,
        data: data as unknown as Prisma.JsonObject
      }
    })
  }
}
