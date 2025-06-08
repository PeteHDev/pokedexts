import { State } from "./state.js";

export function commandInspect(state: State, pokemonName: string) {
    if (pokemonName in state.pokedex) {
        console.log(`Name: ${pokemonName}`);
        console.log(`Height: ${state.pokedex[pokemonName].height}`);
        console.log(`Weight: ${state.pokedex[pokemonName].weight}`);
        console.log("Stats:");
        for (const stat of state.pokedex[pokemonName].stats) {
            console.log(`\t- ${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const type of state.pokedex[pokemonName].types) {
            console.log(`\t- ${type.type.name}`);
        }

        return;
    } else {
        console.log(`${pokemonName} is not in your Pokedex`);
    }
}