import { PokemonEventEmitter } from './event.emitter';
import POKEMON_EVENTS from './event.constant';

export class EventManager {
    private static emitter = PokemonEventEmitter.getInstance();

    public static emitEvent(eventName: POKEMON_EVENTS, data: any): void {
        EventManager.emitter.emit(eventName, data);
    }
}
