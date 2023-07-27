
export type PokemonApiResponse = {
  pokemon?: PokemonApi | null
  pokemons?: PokemonApi[]
}

export type PokemonApi = {
  id: string
  number: string
  name: string
  weight: PokemonDimension
  height: PokemonDimension
  classification: string
  types: [string]
  resistant: [string]
  attacks: PokemonAttack
  weaknesses: [string]
  fleeRate: number
  maxCP: number
  evolutions: [PokemonApi]
  evolutionRequirements: PokemonEvolutionRequirement
  maxHP: number
  image: string
};

interface PokemonDimension {
  minimum: string;
  maximum: string;
};

interface PokemonAttack {
  fast: Attack[];
  special: Attack[];
};

interface Attack {
  name: string;
  type: string;
  damage: number;
};

interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}
