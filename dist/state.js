import { createInterface } from "node:readline";
import { getCommands } from "./command_registry.js";
import { PokeApi } from "./pokeapi.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    return {
        readline: rl,
        commands: getCommands(),
        pokeApi: new PokeApi(),
        pokedex: {},
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL: undefined,
    };
}
