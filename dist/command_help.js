export function commandHelp(commands) {
    console.log("Welcome to the Pokedex!\nUsage:\n\n");
    for (const [key, command] of Object.entries(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
