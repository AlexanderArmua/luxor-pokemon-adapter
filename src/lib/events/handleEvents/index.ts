import handleEventNewPokemon from "./event.newPokemon";

enum POKEMON_EVENTS {
    NEW_POKEMON_CREATED = "NEW_POKEMON_CREATED"
}

const EVENTS = [
    {
        name: POKEMON_EVENTS.NEW_POKEMON_CREATED,
        handler: handleEventNewPokemon
    }
];

export { POKEMON_EVENTS, EVENTS }
