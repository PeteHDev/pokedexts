export function commandHelp(state) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n\n");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
    console.log();
}
