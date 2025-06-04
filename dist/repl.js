import { createInterface } from "node:readline";
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
    rl.on("line", (input) => {
        const inputWords = cleanInput(input);
        if (inputWords.length === 0) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${inputWords[0]}`);
        rl.prompt();
    });
}
