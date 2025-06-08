export async function commandMapForward(state) {
    const locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    for (const locationArea of Object.values(locations.results)) {
        console.log(locationArea.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
export async function commandMapBack(state) {
    if (!state.prevLocationsURL) {
        throw new Error("You are on the first page");
    }
    const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const locationArea of Object.values(locations.results)) {
        console.log(locationArea.name);
    }
}
