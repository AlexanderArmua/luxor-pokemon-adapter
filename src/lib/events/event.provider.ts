import { PokemonEventEmitter } from "./event.emitter";
import { EVENTS } from "./handleEvents";

class EventProvider {
    private static emitter = PokemonEventEmitter.getInstance();

    public constructor() {
        for (const event of EVENTS) {
            EventProvider.emitter.on(event.name, event.handler)
        }
    }
}

export { EventProvider };
