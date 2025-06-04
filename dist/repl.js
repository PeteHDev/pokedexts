import { createInterface } from "node:readline";
import { getCommands } from "./command_registry.js";
export function cleanInput(input) {
    const noPadding = input.trim();
    const noLongSpaces = noPadding.replace(/\s+/g, " ");
    const lowered = noLongSpaces.toLowerCase();
    if (lowered.length === 0)
        return [];
    const words = lowered.split(" ");
    return words;
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    const commands = getCommands();
    rl.on("line", (input) => {
        const inputWords = cleanInput(input);
        if (inputWords.length === 0) {
            rl.prompt();
            return;
        }
        if (commands[inputWords[0]]) {
            commands[inputWords[0]].callback(commands);
        }
        else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}
