import { CLICommand } from "./command_registry.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n\n");
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`)
    }
    console.log()
}