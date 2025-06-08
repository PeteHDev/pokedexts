import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    const location = await state.pokeApi.fetchLocation(locationName);
    console.log(`Exploring ${locationName}...`)
    console.log("Found pokemon:")
    for (const pokemonEncounter of location.pokemon_encounters) {
        console.log(" - " + pokemonEncounter.pokemon.name);
    }
}