import { createInterface, Interface } from "node:readline";
import { getCommands } from "./command_registry.js";
import { PokeApi } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeApi;
    nextLocationsURL: string | undefined;
    prevLocationsURL: string | undefined;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl,
        commands: getCommands(),
        pokeApi: new PokeApi(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area",
        prevLocationsURL: undefined,
    };
}