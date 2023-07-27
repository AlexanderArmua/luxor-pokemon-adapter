import { EventEmitter } from "eventemitter3";

class PokemonEventEmitter {
    private static eventEmitter: EventEmitter;

    public static getInstance(): EventEmitter {
        if (!this.eventEmitter) {
            this.eventEmitter = new EventEmitter();
        }
        return this.eventEmitter;
    }
}

export { PokemonEventEmitter } 
