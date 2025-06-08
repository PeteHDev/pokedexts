import { Cache } from "./pokecache.js";
export class PokeApi {
    static baseURL = "https://pokeapi.co/api/v2";
    #cache = new Cache(10000);
    constructor() { }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeApi.baseURL}/location-area`;
        if (this.#cache.get(url)) {
            return this.#cache.get(url);
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const locations = await resp.json();
            this.#cache.add(url, locations);
            return locations;
        }
        catch (e) {
            throw new Error(`Error fetching locations: ${e.message}`);
        }
    }
    async fetchLocation(locationName) {
        const locationURL = PokeApi.baseURL + "/location-area/" + locationName;
        if (this.#cache.get(locationURL)) {
            return this.#cache.get(locationURL);
        }
        try {
            const resp = await fetch(locationURL);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const location = await resp.json();
            this.#cache.add(locationURL, location);
            return location;
        }
        catch (e) {
            throw new Error(`Error fetching location '${locationName}': ${e.message}`);
        }
    }
}
