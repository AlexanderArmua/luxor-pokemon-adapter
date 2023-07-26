import prisma from '@db/prisma-client';
import { Pokemon, Prisma } from '@prisma/client';

export class PokemonRepository {
  private static instance: PokemonRepository;

  static getInstance(): PokemonRepository {
    if (!PokemonRepository.instance) {
      PokemonRepository.instance = new PokemonRepository();
    }

    return PokemonRepository.instance;
  }

  async findAll(): Promise<Pokemon[]> {
    return await prisma.pokemon.findMany();
  }

  async findOneByPokemonId(pokemonId: string): Promise<Pokemon | null> {
    return await prisma.pokemon.findUnique({
      where: {
        pokemonId
      }
    })
  }

  async findOneByPokemonName(name: string): Promise<Pokemon | null> {
    return await prisma.pokemon.findUnique({
      where: {
        name
      }
    })
  }

  async storeOne(id: string, name: string, data: any): Promise<Pokemon | null> {
    return await prisma.pokemon.create({
      data: {
        name: name,
        pokemonId: id,
        data: data
      }
    })
  }
}
