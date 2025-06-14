import { State } from "./state.js";

const maxBaseExperience = 610;

export async function commandCatch(state: State, pokemonName: string) {
    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    let successRate = (maxBaseExperience - pokemon.base_experience) / maxBaseExperience;
    if (Math.random() <= successRate) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemon;
    } else {
        console.log(`${pokemonName} escaped!`);
    }
}