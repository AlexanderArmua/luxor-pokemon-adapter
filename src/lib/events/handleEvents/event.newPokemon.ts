import { PokemonApi } from "@custom-types/pokemons";
import { PokemonService } from "@services/pokemon/pokemon.service";

const pokemonService = PokemonService.getInstance();

const handleEventNewPokemon = async (pokemnonData: PokemonApi) => {
    // TODO: Llamada REST en caso de microservicios
    // TODO: Validar errores
    try {
        await pokemonService.storeOne(pokemnonData);
    } catch (err) {
        console.error("TODO: Ocurrió un error al guardar acá");
    }
}

export default handleEventNewPokemon;
