import prisma from '@db/prisma-client';
import { Pokemon } from '@prisma/client';

export class PokemonRepository {
  private static instance: PokemonRepository;

  static getInstance(): PokemonRepository {
    if (!PokemonRepository.instance) {
      PokemonRepository.instance = new PokemonRepository();
    }

    return PokemonRepository.instance;
  }

  async findAll(skip: number, take: number): Promise<Pokemon[]> {
    const minNumber = skip + 1;
    const maxNumber = skip + take;

    return await prisma.pokemon.findMany({
      where: {
        number: {
          gte: minNumber,
          lte: maxNumber,
        }
      },
      orderBy: {
        number: 'asc'
      }
    });
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

  // TODO: Validar que no exista?
  // TODO: Explain that we can we can replace upser by a mutex in other languages
  async storeOne(id: string, name: string, number: number, data: any): Promise<Pokemon | null> {
    return await prisma.pokemon.upsert({
      where: {
        pokemonId: id
      },
      create: {
        name: name,
        pokemonId: id,
        data: data,
        number: number
      },
      update: {}
    });
  }
}
