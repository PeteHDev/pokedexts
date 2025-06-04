export async function commandMapb(state) {
    if (state.prevLocationsURL === null) {
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
