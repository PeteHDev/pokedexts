import { createInterface } from "node:readline";
import { getCommands } from "./command_registry.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commandRegistry = getCommands();
    return {
        readline: rl,
        commands: commandRegistry,
    };
}
