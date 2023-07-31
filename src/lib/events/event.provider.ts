import { logger } from "@logger";
import { PokemonEventEmitter } from "./event.emitter";
import { EVENTS } from "./handleEvents";

class EventProvider {
    private static emitter = PokemonEventEmitter.getInstance();

    public constructor() {
        const eventNames = EVENTS.map(e => e.name);

        logger.info({ method: "EventProvider", events: eventNames }, "Initialized event provider. Now we are listening to events");
        for (const event of EVENTS) {
            EventProvider.emitter.on(event.name, event.handler)
        }
    }
}

export { EventProvider };
