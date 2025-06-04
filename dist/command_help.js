export function commandHelp(commands) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n\n");
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
