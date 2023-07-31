import { AppConfig } from '@config';
import { logger } from '@logger';

const customHeaders = {
    "Content-Type": "application/json",
}

const handleEventNewPokemon = async (pokemnonData: any) => {
    const log = logger.child({ method: "handleEventNewPokemon", data: pokemnonData });
    
    try {
        await fetch(AppConfig.pokemonAdapterUrl, { 
            headers: customHeaders,
            body: JSON.stringify(pokemnonData), 
            method: "POST" 
        });

        log.info("Pokemon created");
    } catch (err) {
        log.error({ err }, "Error creating pokemon");
    }
}

export default handleEventNewPokemon;
