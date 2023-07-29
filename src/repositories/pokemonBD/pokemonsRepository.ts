import { PokemonApi } from '@custom-types/pokemons';
import prisma from '@db/prisma-client';
import { Pokemon, PrismaClient } from '@prisma/client';
import { PokemonBD } from './types';

export class PokemonRepository {
  private static instance: PokemonRepository;

  static getInstance(): PokemonRepository {
    if (!PokemonRepository.instance) {
      PokemonRepository.instance = new PokemonRepository();
    }

    return PokemonRepository.instance;
  }

  async findAll(skip: number, take: number): Promise<PokemonBD[]> {
    const minNumber = skip + 1;
    const maxNumber = skip + take;

    const pokemons = await prisma.pokemon.findMany({
      where: {
        number: {
          gte: minNumber,
          lte: maxNumber,
        }
      },
      include: {
        evolutions: {
          include: {
            basePokemon: true
          },
        },
      },
      orderBy: {
        number: 'asc'
      }
    });

    return pokemons;
  }

  async findOneByPokemonId(pokemonId: string): Promise<PokemonBD | null> {
    return await prisma.pokemon.findUnique({
      where: {
        pokemonId
      },
      include: {
        evolutions: {
          include: {
            basePokemon: true
          },
        },
      },
    })
  }

  async findOneByPokemonName(name: string): Promise<PokemonBD | null> {
    return await prisma.pokemon.findUnique({
      where: {
        name
      },
      include: {
        evolutions: {
          include: {
            basePokemon: true
          },
        },
      },
    })
  }

  async upsertPokemonWithoutEvolutions(pokemonId: string, name: string, number: number, pokemonData: any): Promise<Pokemon> {
    return await prisma.pokemon.upsert({
      where: { pokemonId },
      create: { name, pokemonId, data: { ...pokemonData, evolutions: [] } as any, number },
      update: {}
    })
  }

  // TODO: Explicar que utilizamos upsert por no tener un mutex
  // TODO: Mejorar y ver si se puede hacer todo en una sola transacción
  async storeOne(pokemonId: string, name: string, number: number, pokemonData: PokemonApi): Promise<PokemonBD | null> {
    const pokemonBase = await this.upsertPokemonWithoutEvolutions(pokemonId, name, number, pokemonData);

    let pokemonEvolutions: (PokemonBD | null)[] = [];
    if (pokemonData.evolutions && pokemonData.evolutions.length > 0) {
      pokemonEvolutions = await Promise.all(
        pokemonData.evolutions.map((evolution) => {
          const newPokemon = this.storeOne(evolution.id, evolution.name, Number(evolution.number), evolution);

          return newPokemon;
        })
      );
    }

    await Promise.all(
      pokemonEvolutions.map((evolution) => {
        if (!evolution) {
          return;
        }

        return prisma.evolution.upsert({
          where: {
            basePokemonId_futurePokemonId: {
              basePokemonId: pokemonBase.id,
              futurePokemonId: evolution.id
            }
          },
          update: {},
          create: {
            basePokemonId: pokemonBase.id,
            futurePokemonId: evolution.id
          }
        })
      })
    );

    return await this.findOneByPokemonId(pokemonId);
  }
}
