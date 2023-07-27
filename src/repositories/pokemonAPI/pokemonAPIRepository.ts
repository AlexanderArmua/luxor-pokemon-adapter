import { GraphQLClient, gql } from 'graphql-request';
import { AppConfig } from '@config';
import { PokemonApi, PokemonApiResponse } from '@custom-types/pokemons';
import { GET_POKEMONS_GQL_RANGE, GET_POKEMON_GQL_BY_ID, GET_POKEMON_GQL_BY_NAME, GraphQlTypes } from './graphqlTypes';

const API_POKEMON_GRAPHQL = AppConfig.api.pokemons;

export class GraphQlApiRepository {
    private static instance: GraphQlApiRepository;
    private static graphqlClient = new GraphQLClient(API_POKEMON_GRAPHQL);

    static getInstance(): GraphQlApiRepository {
        if (!GraphQlApiRepository.instance) {
            GraphQlApiRepository.instance = new GraphQlApiRepository();
        }
        return GraphQlApiRepository.instance;
    }

    private async makeGraphQLQuery<T>(query: string, variables?: { [x: string]: GraphQlTypes }): Promise<T> {
        return await GraphQlApiRepository.graphqlClient.request<T>(query, variables);
    }

    async getPokemonById(pokemonId: string): Promise<PokemonApi | null> {
        const variables = { id: pokemonId };

        const response = await this.makeGraphQLQuery<PokemonApiResponse>(GET_POKEMON_GQL_BY_ID, variables);

        return response?.pokemon || null;
    }

    async getPokemonByName(pokemonName: string): Promise<PokemonApi | null> {
        const variables = { name: pokemonName };

        const response = await this.makeGraphQLQuery<PokemonApiResponse>(GET_POKEMON_GQL_BY_NAME, variables)

        return response?.pokemon || null;
    }

    async getPokemonsInRange(take: number): Promise<PokemonApi[]> {
        const variables = { first: take };

        const response = await this.makeGraphQLQuery<PokemonApiResponse>(GET_POKEMONS_GQL_RANGE, variables)

        return response?.pokemons || [];
    }
}
