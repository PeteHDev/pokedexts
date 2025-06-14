import { Cache, CacheEntry } from "./pokecache.js";

export class PokeApi {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache = new Cache(10000);

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeApi.baseURL}/location-area`;
        
        if (this.#cache.get(url)) {
          return this.#cache.get(url);
        }

        try {
            const resp = await fetch(url);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const locations: ShallowLocations = await resp.json();
            this.#cache.add(url, locations);
            return locations;
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const locationURL = PokeApi.baseURL + "/location-area/" + locationName;

        if (this.#cache.get(locationURL)) {
          return this.#cache.get(locationURL);
        }

        try {
            const resp = await fetch(locationURL);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const location: Location = await resp.json();
            this.#cache.add(locationURL, location);
            return location;
        } catch (e) {
            throw new Error(
                `Error fetching location '${locationName}': ${(e as Error).message}`,
            );
        }
    }

    async fetchPokemon(pokemonName: string): Promise<PokemonDetailed> {
        const pokemonURL = PokeApi.baseURL + "/pokemon/" + pokemonName;

        if (this.#cache.get(pokemonURL)) {
          return this.#cache.get(pokemonURL);
        }

        try {
            const resp = await fetch(pokemonURL);

            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const pokemon: PokemonDetailed = await resp.json();
            this.#cache.add(pokemonURL, pokemon);
            return pokemon;
        } catch (e) {
            throw new Error(
                `Error fetching location '${pokemonName}': ${(e as Error).message}`,
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

export interface PokemonDetailed {
  abilities: Ability[]
  base_experience: number
  height: number
  id: number
  location_area_encounters: string
  name: string
  order: number
  weight: number
  stats: Stat[]
  types: Type[]
}

export interface Ability {
  ability: Ability2
  is_hidden: boolean
  slot: number
}

export interface Ability2 {
  name: string
  url: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}

export interface Location {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: Location
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export interface Method {
  name: string
  url: string
}

export interface Version2 {
  name: string
  url: string
}
