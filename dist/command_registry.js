import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
export function getCommands() {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Displays next 20 location areas",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Displays previous 20 location areas",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Displays all the pokemons in the provided location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch provided pokemon",
            callback: commandCatch,
        },
        pokedex: {
            name: "pokedex",
            description: "Displays all pokemons caught so far",
            callback: commandPokedex,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a pokemon from your pokedex",
            callback: commandInspect,
        },
    };
}
