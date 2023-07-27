import { AppConfig } from '@config';

const customHeaders = {
    "Content-Type": "application/json",
}

const handleEventNewPokemon = async (pokemnonData: any) => {
    try {
        await fetch(AppConfig.pokemonAdapterUrl, { 
            headers: customHeaders,
            body: JSON.stringify(pokemnonData), 
            method: "POST" 
        });
        console.log("CREADO")
    } catch (err) {
        // TODO: Validar errores
        console.error("TODO: Ocurrió un error al guardar acá");
    }
}

export default handleEventNewPokemon;
