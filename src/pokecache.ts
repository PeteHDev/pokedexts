export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap() {
        for (const [key, value] of this.#cache) {
            if (value.createdAt <= Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    add<T>(key: string, val: T) {
        const newEntry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, newEntry);
    }

    get(key: string) {
        return this.#cache.get(key)?.val;
    }
}