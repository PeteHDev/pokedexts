export async function commandMapForward(state) {
    if (!state.nextLocationsURL) {
        console.log("You are on the last page");
        return;
    }
    const locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    for (const locationArea of Object.values(locations.results)) {
        console.log(locationArea.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
export async function commandMapBack(state) {
    if (!state.prevLocationsURL) {
        console.log("You are on the first page");
        return;
    }
    const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
    for (const locationArea of Object.values(locations.results)) {
        console.log(locationArea.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
