import { gql } from "graphql-request";

export type GraphQlTypes = string | number | boolean;

//  TODO: Pensar como modelar las evoluciones
export const pokemonFragment = gql`
  fragment PokemonInfoFragment on Pokemon {
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
