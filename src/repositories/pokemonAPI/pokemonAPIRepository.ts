import { GraphQLClient, gql } from 'graphql-request';
import { AppConfig } from 'config';
import { PokemonApi, PokemonApiResponse } from '../../types/pokemons';
import { GraphQlTypes, pokemonFragment } from './graphqlTypes';

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
        const query = gql`
            query Pokemon($id: String) {
                pokemon(id: $id) {
                    ...PokemonInfoFragment
                }
            }
            ${pokemonFragment}
        `;

        const variables = { id: pokemonId };

        const response = await this.makeGraphQLQuery<PokemonApiResponse>(query, variables);

        return response?.pokemon || null;
    }

    async getPokemonByName(pokemonName: string): Promise<PokemonApi | null> {
        const query = gql`
            query Pokemon($name: String) {
                pokemon(name: $name) {
                    ...PokemonInfoFragment
                }
            }
            ${pokemonFragment}
        `;

        const variables = { name: pokemonName };

        const response = await this.makeGraphQLQuery<PokemonApiResponse>(query, variables)

        return response?.pokemon || null;
    }

    async getPokemonsInRange(_start: number, end: number): Promise<PokemonApi[]> {
        const query = gql`
            query Pokemons($first: Int!) {
                pokemons(first: $first) {
                    ...PokemonInfoFragment
                }
            }
            ${pokemonFragment}
        `;

        const variables = { first: end };

        const response = await this.makeGraphQLQuery<PokemonApiResponse>(query, variables)

        return response?.pokemons || [];
    }
}
