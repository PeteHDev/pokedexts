import { CLICommand } from "./command_registry.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!\nUsage:\n\n");
    for (const [key, command] of Object.entries(commands)) {
        console.log(`${command.name}: ${command.description}`)
    }
}