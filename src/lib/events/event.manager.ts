import { logger } from '@logger';
import { PokemonEventEmitter } from './event.emitter';
import { POKEMON_EVENTS } from './handleEvents';

export class EventManager {
    private static emitter = PokemonEventEmitter.getInstance();

    private static emitEvent(eventName: POKEMON_EVENTS, data: any): void {
        EventManager.emitter.emit(eventName, data);
    }

    public static emitNewPokemon(data: any): void {
        logger.info("Emitting event new pokemon to create");
        this.emitEvent(POKEMON_EVENTS.NEW_POKEMON_CREATED, data);
    }
}
