import { gql } from "graphql-request";

export type GraphQlTypes = string | number | boolean;

//  TODO: Mejorar mecanismo de evoluciones para no tener que guardar duplicado
const pokemonBaseFragment = gql`
  fragment PokemonBaseFragment on Pokemon {
    id
    number
    name
    weight {
        minimum
		maximum
    }
    height {
        minimum
		maximum
    }
    classification
    types
    resistant
    attacks {
        fast {
            name
            type
            damage
        }
        special {
            name
            type
            damage
        }
    }
    weaknesses
    fleeRate
    maxCP
    evolutionRequirements {
        amount
        name
    }
    maxHP
    image
  }
`;

const pokemonFragment = gql`
  fragment PokemonFragment on Pokemon {
    ...PokemonBaseFragment
    evolutions {
      id
      name
      number
    }
  }
  ${pokemonBaseFragment}
`;


const GET_POKEMON_GQL_BY_NAME = gql`
  query Pokemon($name: String) {
      pokemon(name: $name) {
          ...PokemonFragment
      }
  }
  ${pokemonFragment}
`;

const GET_POKEMON_GQL_BY_ID = gql`
  query Pokemon($id: String) {
    pokemon(id: $id) {
      ...PokemonFragment
    }
  }
  ${pokemonFragment}
`;

const GET_POKEMONS_GQL_RANGE = gql`
  query Pokemons($first: Int!) {
      pokemons(first: $first) {
        ...PokemonFragment
      }
  }
  ${pokemonFragment}
`;

export { GET_POKEMON_GQL_BY_NAME, GET_POKEMON_GQL_BY_ID, GET_POKEMONS_GQL_RANGE }
