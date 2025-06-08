const maxBaseExperience = 608;
export async function commandCatch(state, pokemonName) {
    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    let successRate = (maxBaseExperience - pokemon.base_experience) / maxBaseExperience;
    if (Math.random() <= successRate) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemon;
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}
