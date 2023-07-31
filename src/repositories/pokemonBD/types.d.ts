import { Pokemon, Evolution } from '@prisma/client';

export type PokemonBD = Pokemon & { evolutions: (Evolution & { basePokemon: Pokemon })[] }

    // return pokemons.map(pokemon => ({
    //   ...pokemon,
    //   evolutions: pokemon.evolutions.map(evolution => evolution.basePokemon)
    // }));