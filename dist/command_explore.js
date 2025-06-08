export async function commandExplore(state, locationName) {
    const location = await state.pokeApi.fetchLocation(locationName);
    console.log(`Exploring ${locationName}...`);
    console.log("Found pokemon:");
    for (const pokemonEncounter of location.pokemon_encounters) {
        console.log(" - " + pokemonEncounter.pokemon.name);
    }
}
