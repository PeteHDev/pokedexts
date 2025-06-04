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
export async function startREPL(state) {
    state.readline.prompt();
    const commands = getCommands();
    state.readline.on("line", async (input) => {
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
            await cmd.callback(state);
        }
        catch (e) {
            console.log(e.message);
        }
        state.readline.prompt();
    });
}
