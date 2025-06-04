export class PokeApi {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeApi.baseURL}/location-area`;
        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const locations: ShallowLocations = await resp.json();
            return locations;
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const locationURL = PokeApi.baseURL + "/location/" + locationName;
        try {
            const resp = await fetch(locationURL);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const location: Location = await resp.json();
            return location;
        } catch (e) {
            throw new Error(
                `Error fetching location '${locationName}': ${(e as Error).message}`,
            );
        }
    }
}

export type ShallowLocations = {
    next: string | undefined;
    previous: string | undefined;
    results: {
        name: string;
        url: string;
    }[];
};

export interface Location {
  areas: Area[]
  game_indices: Index[]
  id: number
  name: string
  names: Name[]
  region: Region
}

interface Area {
  name: string
  url: string
}

interface Index {
  game_index: number
  generation: Generation
}

interface Generation {
  name: string
  url: string
}

interface Name {
  language: Language
  name: string
}

interface Language {
  name: string
  url: string
}

interface Region {
  name: string
  url: string
}