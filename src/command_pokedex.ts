import { State } from "./state.js";

export function commandPokedex(state: State) {
    let numPokemons = Object.keys(state.pokedex).length;
    if (numPokemons === 0) {
        console.log("Pokedex is empty!");
        return;
    }

    console.log("Pokemons in your Pokedex:")
    for (const key of Object.keys(state.pokedex)) {
        console.log(" - " + key);
    }
}