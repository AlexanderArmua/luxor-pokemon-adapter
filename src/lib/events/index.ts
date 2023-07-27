import { PokemonEventEmitter } from "./event.emitter";
import POKEMON_EVENTS from "./event.constant";
import handleEventNewPokemon from "./handleEvents/event.newPokemon";

class EventProvider {
    private static emitter = PokemonEventEmitter.getInstance();

    public constructor() {
        for (const eventName in POKEMON_EVENTS) {
            EventProvider.emitter.on(eventName, handleEventNewPokemon)
        }
    }
}

const startEventProvider = () => {
    const eventProvider = new EventProvider();

    return eventProvider;
}

export { startEventProvider }
