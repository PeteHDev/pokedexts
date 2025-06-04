import { createInterface } from "node:readline";
import { getCommands } from "./command_registry.js";
import { CLICommand, State} from "./state.js";

export function cleanInput(input: string): string[] {
    const noPadding: string = input.trim();
    const noLongSpaces: string = noPadding.replace(/\s+/g, " ");
    const lowered: string = noLongSpaces.toLowerCase();

    if (lowered.length === 0) return [];
    
    const words: string[] = lowered.split(" ");

    return words;
}

export function startREPL(state: State): void {
    state.readline.prompt();
    const commands = getCommands();

    state.readline.on("line", (input: string) => {
        const inputWords = cleanInput(input);
        if (inputWords.length === 0) {
            state.readline.prompt();
            return;
        }

        const cmd = commands[inputWords[0]];
        if (!cmd) {
            console.log("Unknown command. Type 'help' for a list of commands.");
            state.readline.prompt();
            return;
        } 

        try {
            cmd.callback(state);
        } catch (e) {
            console.log(e);
        }

        state.readline.prompt();
    });
}