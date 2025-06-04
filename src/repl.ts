import { createInterface } from "node:readline";
import { CLICommand, getCommands } from "./command_registry.js";

export function cleanInput(input: string): string[] {
    const noPadding: string = input.trim();
    const noLongSpaces: string = noPadding.replace(/\s+/g, " ");
    const lowered: string = noLongSpaces.toLowerCase();

    if (lowered.length === 0) return [];
    
    const words: string[] = lowered.split(" ");

    return words;
}

export function startREPL(): void {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    const commands = getCommands();

    rl.on("line", (input: string) => {
        const inputWords = cleanInput(input);
        if (inputWords.length === 0) {
            rl.prompt();
            return;
        }

        const cmd = commands[inputWords[0]];
        if (!cmd) {
            console.log("Unknown command. Type 'help' for a list of commands.");
        } 

        try {
            cmd.callback(commands);
        } catch (e) {
            console.log(e);
        }

        rl.prompt();
    });
}